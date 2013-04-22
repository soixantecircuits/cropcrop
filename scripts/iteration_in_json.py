#!/usr/bin/python3.2
import json                     # For JSON
import os                       # To call functions in the system
from pprint import pprint       # To do pprint, rather than pprint.pprint


os.system("clear")              # Call Clear to clean the Terminal
json_data=open('type.json')     # Open the desired file
data = json.load(json_data)     # Converting desired file to something understandable by Python
# pprint(data)                    # Pretty printing our file, to be sure all works well.


for attribute, value in data["screens"].items(): # Listing every screens
	print (attribute)
	print (data["screens"][attribute]["crop_width"])
	print (data["screens"][attribute]["crop_height"])
	print (data["screens"][attribute]["margin_left"])
	print (data["screens"][attribute]["margin_top"])
	print ("\n")

json_data.close() # Not absolutely necessary in little scripts, but it's better
