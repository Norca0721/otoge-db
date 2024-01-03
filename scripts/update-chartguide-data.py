import argparse
import shared

parser = argparse.ArgumentParser(description='Description of your script')
parser.add_argument('--ongeki', action="store_true", help='Perform scripts for ongeki')
parser.add_argument('--chunithm', action="store_true", help='Perform scripts for chunithm')
parser.add_argument('--date_from', type=int, default=0, help='Date range from')
parser.add_argument('--date_until', type=int, default=0, help='Date range until')
parser.add_argument('--id', type=int, default=0, help='Song ID')
parser.add_argument('--nocolors', action="store_true", help='Print messages in color')
parser.add_argument('--escape', action="store_true", help='Escape unsafe characters for git message output')
parser.add_argument('--clear_cache', action="store_true", help='Clears local cache on run')

args = parser.parse_args()

if args.ongeki:
	import ongeki as game_module
elif args.chunithm:
	import chunithm as game_module
elif not args.ongeki and not args.chunithm:
	print('Please specify which game: --ongeki, --chunithm')
	exit()

game_module.chartguide.update_chartguide_data(args)