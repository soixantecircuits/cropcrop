#!/usr/bin/python3.2
import json
import os
import subprocess
import sys
from pprint import pprint


program_name = sys.argv[0]
arguments = sys.argv[1]

filename = sys.argv[1]
fileW=filename.split(".")[0]
#print(" File extension : "+fileExt)


if sys.argv.__len__()>0:
	
	# Command lines to invocate
	
	videoWidthCmd     = "mediainfo --Inform='Video;"+"%"+"Width%' files/"+sys.argv[1]
	videoHeightCmd    = "mediainfo --Inform='Video;"+"%"+"Height%' files/"+sys.argv[1]
	
	# Stock informations
	videoInformations = {
		"filename"      : sys.argv[1],
		"width"         : int(subprocess.check_output(videoWidthCmd, shell=True)),
		"height"        : int(subprocess.check_output(videoHeightCmd, shell=True))
	}
        #ffmpeg = 'encoder\ffmpeg'
	width = ("%(width)s" % videoInformations)
	height = ("%(height)s" % videoInformations)
	
	os.system("ffmpeg -itsoffset -15 -i files/"+sys.argv[1]+" -vcodec mjpeg -vframes 1 -an -f rawvideo -s "+width+"*"+height+" ./thumbnails/"+fileW+".jpg")
	
	data =  { 'width': width, 'height':height, 'thumbnails': fileW+".jpg"}
	data_string = json.dumps(data)
	#f = open('infos.txt', 'wt')
	#f.write(data_string)
	#f.close()
	print("LAAAAAAa")


