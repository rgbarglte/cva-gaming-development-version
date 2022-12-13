from resources.chat import *
from resources.chart import *
from resources.platform import *
import sys

command = sys.argv[1]
 

# Chat scripts
if command == 'users':
  getListUsers()
if command == 'messages':
  getMessages()

# Chart scripts
if command == 'chart-best-games-credit':
  chartBestGamesCredit()

if command == 'chart-best-brands-credit':
  chartBestBrandsCredit()


if command == 'platform-details':
  platformDetails()
