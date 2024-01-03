import argparse
import shared

parser = argparse.ArgumentParser(description='Description of your script')
parser.add_argument('--ongeki', action="store_true", help='Perform scripts for ongeki')
parser.add_argument('--chunithm', action="store_true", help='Perform scripts for chunithm')
parser.add_argument('--nocolors', action="store_true", help='Print messages in color')
parser.add_argument('--escape', action="store_true", help='Escape unsafe characters for git message output')
parser.add_argument('--skipwiki', action="store_true", help='Skip wiki fetch')

args = parser.parse_args()

if args.ongeki:
	import ongeki as game_module
elif args.chunithm:
	import chunithm as game_module
elif not args.ongeki and not args.chunithm:
	print('Please specify which game: --ongeki, --chunithm')
	exit()

new_song_data = game_module.utils.load_new_song_data()
game_module.utils.renew_music_ex_data(new_song_data, args)
game_module.utils.renew_lastupdated(game_module.paths.LOCAL_MUSIC_EX_JSON_PATH, game_module.paths.LOCAL_INDEX_HTML_PATH, args)
game_module.utils.renew_lastupdated(game_module.paths.LOCAL_MUSIC_EX_JSON_PATH, game_module.paths.LOCAL_LEVELS_HTML_PATH, args)
game_module.utils.renew_lastupdated(game_module.paths.LOCAL_MUSIC_EX_JSON_PATH, game_module.paths.LOCAL_NAMUWIKI_EXPORT_PATH, args)