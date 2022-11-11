from resources.chat import *
import sys

command = sys.argv[1]

if command == 'users':
  getListUsers()
if command == 'messages':
  getMessages()
