#!/usr/bin/python3.2
import argparse
import json
import os
import subprocess


parser    = argparse.ArgumentParser()
# Arguments list
parser.add_argument("videoFile", type=str, help="Name of the original video")
parser.add_argument("jsonFile", type=str, help="Name of the json file")
#parser.add_argument("-v", "--verbose", help="Increase output verbosity.")

args      = parser.parse_args()


if args.videoFile:
	# Command lines to invocate
	videoWidthCmd     = "mediainfo --Inform='Video;"+"%"+"Width%' /home/sylvain/Vidéos/"+args.videoFile
	videoHeightCmd    = "mediainfo --Inform='Video;"+"%"+"Height%' /home/sylvain/Vidéos/"+args.videoFile

	# Stock informations
	videoInformations = {
		"filename"      : args.videoFile,
		"width"         : int(subprocess.check_output(videoWidthCmd, shell=True)),
		"height"        : int(subprocess.check_output(videoHeightCmd, shell=True))
	}

	print(" Name : %(filename)s \n Width : %(width)s \n Height : %(height)s" % videoInformations)








#if args.verbose:
#	print("verbosity turned on")
