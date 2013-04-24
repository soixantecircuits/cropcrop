#!/usr/bin/python3.2

## Module Import
import json                                # To treat JSON
import os                                  # System command calls
import subprocess                          # System command calls
import sys                                 # System command calls
from pprint import pprint                  # To do pprint, rather than pprint.pprint



## Preparing
os.system("clear")                         # Call Clear to clean the Terminal



if sys.argv.__len__() == 3:

    # System call (middle % isolated this way => "..." + "%" + "...", otherwise it f*** everything up)
    # List of commands called
    # mediainfo --Inform='Video;%Width%'  filename.ext
    # mediainfo --Inform='Video;%Height%'  filename.ext
    # mediainfo --Inform='General;%FileName%' 
    # mediainfo --Inform='General;%FileExtension%' filename.ext

    completeNameCmd                        = "mediainfo --Inform='General;" + "%" + "CompleteName%' " + sys.argv[1]
    folderNameCmd                          = "mediainfo --Inform='General;" + "%" + "FolderName%' " + sys.argv[1]
    fileNameCmd                            = "mediainfo --Inform='General;" + "%" + "FileName%' " + sys.argv[1]
    fileExtensionCmd                       = "mediainfo --Inform='General;" + "%" + "FileExtension%' " + sys.argv[1]
    videoWidthCmd                          = "mediainfo --Inform='Video;" + "%" + "Width%' " + sys.argv[1]
    videoHeightCmd                         = "mediainfo --Inform='Video;" + "%" + "Height%' " + sys.argv[1]
    

    json_data                              = open(sys.argv[2])                      # Open the desired file
    data                                   = json.load(json_data)                   # Converting desired file to something understandable by Python
	# Stock informations
    videoInformations = {
        "completeName"                     : str(subprocess.check_output(completeNameCmd, shell=True).rstrip())[1:],
        "folderName"                       : str(subprocess.check_output(folderNameCmd, shell=True).rstrip())[1:],
        "filename"                         : str(subprocess.check_output(fileNameCmd, shell=True).rstrip())[1:],
        "fileExt"                          : str(subprocess.check_output(fileExtensionCmd, shell=True).rstrip())[1:],
        "width"                            : int(subprocess.check_output(videoWidthCmd, shell=True)),
        "height"                           : int(subprocess.check_output(videoHeightCmd, shell=True))
    }
    pprint(videoInformations)
    os.system("mkdir %(filename)s" % videoInformations)                              # Make the directory containing video

    ## Cropping
    for value in range(len(data["screens"])):                                        # Listing every screens
        videoInformations["screenId"]      = data["screens"][value]["name"]
        videoInformations["cropWidth"]     = data["screens"][value]["crop_width"]
        videoInformations["cropHeight"]    = data["screens"][value]["crop_height"]
        videoInformations["marginLeft"]    = data["screens"][value]["margin_left"]
        videoInformations["marginTop"]     = data["screens"][value]["margin_top"]
        cropCommand                        = "ffmpeg -i %(completeName)s -strict experimental -r 25 -vf crop=%(cropWidth)s:%(cropHeight)s:%(marginLeft)s:%(marginTop)s -keyint_min 1 %(folderName)s/%(screenId)s_%(filename)s.%(fileExt)s" % videoInformations
        os.system(cropCommand)

    os.system("zip -r %(filename)s.zip ./%(folderName)s/" % videoInformations)         # Compressing the directory with video files in filename.zip
    os.system("rm -R ./%(folderName)s/" % videoInformations)                           # Removing the directory, now files are stored
    json_data.close()                                                                # If I understood, it is not absolutely necessary in little scripts because of Python's Garbage Collector. But it's better to conserve control.


# Giving the opportunity to user to check errors
# input("         Press ENTER to quit.")