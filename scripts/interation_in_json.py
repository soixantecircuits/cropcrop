#!/usr/bin/python3.2
import argparse
import json
import os
import subprocess


from pprint import pprint
os.system("clear")
json_data=open('type.json')
data = json.load(json_data)
pprint(data)

print("\n\n")


for attribute, value in data["screens"].items():
	print (attribute)
	print (attribute, value)

json_data.close()
