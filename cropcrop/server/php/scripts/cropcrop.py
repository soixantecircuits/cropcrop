#!/usr/bin/python3.2
## Module Import
import json # To treat JSON
import os # System command calls
import subprocess # System command calls
import sys # System command calls
from pprint import pprint # To do pprint, rather than pprint.pprint
## Preparing
filename = sys.argv[3]
fileW=filename.split(".")[0]

if sys.argv.__len__() > 0:

	fileNameCmd = "mediainfo --Inform='General;" + "%" + "FileName%' " + sys.argv[1]
	fileExtensionCmd = "mediainfo --Inform='General;" + "%" + "FileExtension%' " + sys.argv[1]
	videoWidthCmd = "mediainfo --Inform='Video;" + "%" + "Width%' " + sys.argv[1]
	videoHeightCmd = "mediainfo --Inform='Video;" + "%" + "Height%' " + sys.argv[1]
	json_data = open(sys.argv[2]) 
	data = json.load(json_data) 
	

	videoInformations = {
		"filename" : str(subprocess.check_output(fileNameCmd, shell=True).rstrip())[1:],
		"fileExt" : str(subprocess.check_output(fileExtensionCmd, shell=True).rstrip())[1:],
		"width" : int(subprocess.check_output(videoWidthCmd, shell=True)),
		"height" : int(subprocess.check_output(videoHeightCmd, shell=True)),
		"fileW"  : fileW
	}
	

	os.system("mkdir "+fileW) 

	for value in range(len(data["list"])):
		videoInformations["screenId"] = data["list"][value]["screenId"]
		videoInformations["width"] = data["list"][value]["width"]
		videoInformations["height"] = data["list"][value]["height"]
		videoInformations["marginLeft"] = data["list"][value]["marginLeft"]
		videoInformations["marginTop"] = data["list"][value]["marginTop"]
		cropCommand = "ffmpeg -i "+sys.argv[1]+" -strict experimental -r 25 -vf crop=%(width)s:%(height)s:%(marginLeft)s:%(marginTop)s -keyint_min 1 %(fileW)s/%(screenId)s.%(fileExt)s" % videoInformations
		print(cropCommand)
		os.system(cropCommand)
		
	os.system("zip -r "+fileW+".zip "+fileW) 
	os.system("rm -r "+fileW) 
	os.system("rm "+sys.argv[1])
	json_data.close() 
	#print("CropCrop.zip")
	#ffmpeg -i ./files/duke.mp4 -strict experimental -r 25 -vf crop=%(width)s:%(height)s:%(marginLeft)s:%(marginTop)s -keyint_min 1 duke/0.'mp4' 
	#ffmpeg -i ./files/duke.mp4 -strict experimental -r 25 -vf crop=100:100:0:0 -keyint_min 1 duke/0.'mp4' 