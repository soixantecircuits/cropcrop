#!/usr/bin/python3.2

## Module Import
import json                                # To treat JSON
import os                                  # System command calls
import subprocess                          # System command calls
import sys                                 # System command calls
from pprint import pprint                  # To do pprint, rather than pprint.pprint

## Preparing
os.system("clear")                         # Call Clear to clean the Terminal

# System call (middle % isolated this way => "..." + "%" + "...", otherwise it f*** everything up)
videoWidthCmd                              = "mediainfo --Inform='Video;" + "%" + "Width%' " + sys.argv[1]    # System call to get video width with MediaInfo, called for fileWidth var
videoHeightCmd                             = "mediainfo --Inform='Video;" + "%" + "Height%' " + sys.argv[1]   # System call to get video height with MediaInfo, called for fileHeight var

if sys.argv.__len__() == 3:
    json_data                              = open(sys.argv[2])        # Open the desired file
    data                                   = json.load(json_data)     # Converting desired file to something understandable by Python
	# Stock informations
    videoInformations = {
        "filename"                         : sys.argv[1].split(".")[0],
        "fileExt"                          : sys.argv[1].split(".")[1],
        "width"                            : int(subprocess.check_output(videoWidthCmd, shell=True)),
        "height"                           : int(subprocess.check_output(videoHeightCmd, shell=True))
    }

## Cropping
    for attribute, value in data["screens"].items():                  # Listing every screens
        videoInformations["screenId"]      = attribute
        videoInformations["cropWidth"]     = data["screens"][attribute]["crop_width"]
        videoInformations["cropHeight"]    = data["screens"][attribute]["crop_height"]
        videoInformations["marginLeft"]    = data["screens"][attribute]["margin_left"]
        videoInformations["marginTop"]     = data["screens"][attribute]["margin_top"]
        cropCommand                        = "ffmpeg -i %(filename)s.%(fileExt)s -strict experimental -r 25 -vf crop=%(cropWidth)s:%(cropHeight)s:%(marginLeft)s:%(marginTop)s -keyint_min 1 %(screenId)s_%(filename)s.%(fileExt)s" % videoInformations
        print(cropCommand)
        os.system(cropCommand)

    json_data.close()                      # If I understood, it is not absolutely necessary in little scripts because of Python's Garbage Collector. But it's better to conserve control.



# Giving the opportunity to user to check errors
# input("         Press ENTER to quit.")

