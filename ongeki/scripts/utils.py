import const
import requests
import urllib.request
import json
import re
import ipdb
from terminal import bcolors
from datetime import datetime
from functools import reduce
from wikiwiki import _update_song_wiki_data


CHARACTER_TABLE = {
    "星咲あかり": "FIRE",
    "藤沢柚子": "LEAF",
    "三角葵": "AQUA",
    "高瀬梨緒": "AQUA",
    "結城莉玖": "FIRE",
    "藍原椿": "LEAF",
    "桜井春菜": "FIRE",
    "早乙女彩華": "AQUA",
    "井之原小星": "LEAF",
    "柏木咲姫": "AQUA",
    "九條楓": "LEAF",
    "逢坂茜": "FIRE",
    "珠洲島有栖": "AQUA",
    "日向千夏": "LEAF",
    "柏木美亜": "FIRE",
    "東雲つむぎ": "AQUA",
    "皇城セツナ": "FIRE"
}

def load_new_song_data():
    with open(const.LOCAL_MUSIC_JSON_PATH, 'r', encoding='utf-8') as f:
        local_music_data = json.load(f)
        local_music_map = _json_to_id_value_map(local_music_data)

    server_music_data = requests.get(const.SERVER_MUSIC_DATA_URL).json()
    server_music_map = _json_to_id_value_map(server_music_data)

    if len(server_music_map) > len(local_music_map):
        with open(const.LOCAL_MUSIC_JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(server_music_data, f, ensure_ascii=False, indent=2)

    return [server_music_map[id] for id in server_music_map if id not in local_music_map]


def _json_to_id_value_map(json):
    return {int(song['id']):song for song in json}


def renew_music_ex_data(new_song_list, nocolors, escape, skipwiki):
    if len(new_song_list) == 0:
        _print_message("Nothing updated", '', nocolors, '', escape)
        return

    f = open("diffs.txt", 'w')

    with open(const.LOCAL_MUSIC_EX_JSON_PATH, 'r', encoding='utf-8') as f:
        local_music_ex_data = json.load(f)

    for song in new_song_list:
        _download_song_jacket(song)
        _add_song_data_to_ex_data(song, local_music_ex_data)
        _print_message("New song added", song, nocolors, bcolors.OKGREEN, escape)
        
        if not skipwiki:
            _update_song_wiki_data(song, nocolors, escape)
            
        _record_new_song_jacket_id(song)

    with open(const.LOCAL_MUSIC_EX_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(local_music_ex_data, f, ensure_ascii=False, indent=2)


def _download_song_jacket(song):
    urllib.request.urlretrieve(const.SERVER_MUSIC_JACKET_BASE_URL + song['image_url'], 'jacket/' + song['image_url'])

def _record_new_song_jacket_id(song):
    with open(const.LOCAL_DIFFS_LOG_PATH, 'a', encoding='utf-8') as f:
        f.write('jacket/' + song['image_url'] + '\n')


def _add_song_data_to_ex_data(song, ex_data):
    ex_data.append(_add_ex_data_template(song))

def _add_ex_data_template(song):
    song['enemy_lv'] = ""
    song['enemy_type'] = CHARACTER_TABLE.get(song['character'].replace(' ', ''), '')
    song['bpm'] = ""
    song['lev_bas_i'] = ""
    song['lev_bas_notes'] = ""
    song['lev_bas_bells'] = ""
    song['lev_bas_designer'] = ""
    song['lev_adv_i'] = ""
    song['lev_adv_notes'] = ""
    song['lev_adv_bells'] = ""
    song['lev_adv_designer'] = ""
    song['lev_adv_chart_link'] = ""
    song['lev_exc_i'] = ""
    song['lev_exc_notes'] = ""
    song['lev_exc_bells'] = ""
    song['lev_exc_designer'] = ""
    song['lev_exc_chart_link'] = ""
    song['lev_mas_i'] = ""
    song['lev_mas_notes'] = ""
    song['lev_mas_bells'] = ""
    song['lev_mas_designer'] = ""
    song['lev_mas_chart_link'] = ""
    song['lev_lnt_i'] = ""
    song['lev_lnt_notes'] = ""
    song['lev_lnt_bells'] = ""
    song['lev_lnt_designer'] = ""
    song['lev_lnt_chart_link'] = ""
    song['version'] = "bright MEMORY"
    song['wikiwiki_url'] = ""

    return song


def renew_lastupdated(dest_html_path):
    with open(const.LOCAL_MUSIC_JSON_PATH, 'r', encoding='utf-8') as f:
        local_music_data = json.load(f)

    all_dates = [datetime.strptime(x['date'], '%Y%m%d').date() for x in local_music_data]
    lastupdated = f"DATA: {reduce(lambda x, y: x if x > y else y, all_dates).strftime('%Y%m%d')}"
    print(f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} {lastupdated} {dest_html_path}")

    with open(dest_html_path, 'r', encoding='utf-8') as f:
        local_html_data = f.read()

    local_html_data = re.sub(r'(<[^>]+ class="lastupdated"[^>]*>).*(</[^>]+>)',
                             rf'\1<span>{lastupdated}</span>\2',
                             local_html_data,
                             flags=re.IGNORECASE)

    with open(dest_html_path, 'w', encoding='utf-8') as f:
        f.write(local_html_data)



def _print_message(message, song, nocolors, color_name, escape):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    reset_color = bcolors.ENDC

    if song:
        song_id = song['id']

        # if --escape is set
        if escape:
            song_title = ' : ' + song['title'].replace("'", r"\'")
        else:
            song_title = ' : ' + song['title']
    else:
        song_id = ''
        song_title = ''

    # if --nocolors is set
    if nocolors:
        color_name = ''
        reset_color = ''

    print(timestamp + color_name + ' ' + song_id + ' ' + message + song_title + reset_color)