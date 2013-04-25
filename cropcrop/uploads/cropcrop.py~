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
		"height" : int(subprocess.check_output(videoHeightCmd, shell=True))
	}
	pprint(videoInformations)

	os.system("mkdir CropCrop") 

	for value in range(len(data["screens"])):
		videoInformations["screenId"] = data["screens"][value]["name"]
		videoInformations["cropWidth"] = data["screens"][value]["crop_width"]
		videoInformations["cropHeight"] = data["screens"][value]["crop_height"]
		videoInformations["marginLeft"] = data["screens"][value]["margin_left"]
		videoInformations["marginTop"] = data["screens"][value]["margin_top"]
		cropCommand = "ffmpeg -i "+sys.argv[1]+" -strict experimental -r 25 -vf crop=%(cropWidth)s:%(cropHeight)s:%(marginLeft)s:%(marginTop)s -keyint_min 1 CropCrop/%(screenId)s.mp4" % videoInformations
		os.system(cropCommand)
	os.system("zip -r CropCrop.zip .CropCrop") 
	os.system("rm -r CropCrop") 
	json_data.close()  
	
