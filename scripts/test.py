#!/usr/bin/python3.2
import json
import os
import subprocess
import sys


program_name = sys.argv[0]
arguments = sys.argv[1]







if sys.argv.__len__()>1:
	print("videofile : "+sys.argv[1]+"  jsonfile : "+sys.argv[2]+" filepath :"+sys.argv[3])
	# Command lines to invocate
	videoWidthCmd     = "mediainfo --Inform='Video;"+"%"+"Width%' "+sys.argv[3]+sys.argv[2]
	videoHeightCmd    = "mediainfo --Inform='Video;"+"%"+"Height%'"+sys.argv[3]+sys.argv[2]

	# Stock informations
	videoInformations = {
		"filename"      : sys.argv[1],
		"width"         : int(subprocess.check_output(videoWidthCmd, shell=True)),
		"height"        : int(subprocess.check_output(videoHeightCmd, shell=True))
	}

	print(" Name : %(filename)s \n Width : %(width)s \n Height : %(height)s" % videoInformations)








#if args.verbose:
#	print("verbosity turned on")
