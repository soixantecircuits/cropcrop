#!/usr/bin/python3.2
import json
import os
import subprocess
import sys


program_name = sys.argv[0]
arguments = sys.argv[1]

filename = sys.argv[1]
fileExt=filename.split(".")[-1]
print(" File extension : "+fileExt)


if sys.argv.__len__()==2:
	
	# Command lines to invocate

	videoWidthCmd     = "mediainfo --Inform='Video;"+"%"+"Width%' "+sys.argv[1]
	videoHeightCmd    = "mediainfo --Inform='Video;"+"%"+"Height%' "+sys.argv[1]
	
	# Stock informations
	videoInformations = {
		"filename"      : sys.argv[1],
		"width"         : int(subprocess.check_output(videoWidthCmd, shell=True)),
		"height"        : int(subprocess.check_output(videoHeightCmd, shell=True))
	}
	
	print(" Path : %(filename)s \n Width : %(width)s \n Height : %(height)s" % videoInformations)