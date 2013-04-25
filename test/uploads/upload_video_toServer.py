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


if sys.argv.__len__()>1:
	
	# Command lines to invocate
	
	videoWidthCmd     = "mediainfo --Inform='Video;"+"%"+"Width%' ./uploads/"+sys.argv[1]
	videoHeightCmd    = "mediainfo --Inform='Video;"+"%"+"Height%' ./uploads/"+sys.argv[1]
	
	# Stock informations
	videoInformations = {
		"filename"      : sys.argv[1],
		"width"         : int(subprocess.check_output(videoWidthCmd, shell=True)),
		"height"        : int(subprocess.check_output(videoHeightCmd, shell=True))
	}
        #ffmpeg = 'encoder\ffmpeg'
	width = ("%(width)s" % videoInformations)
	height = ("%(height)s" % videoInformations)
	
	#command = "ffmpeg -itsoffset -15 -i "+sys.argv[1]+" -vcodec mjpeg -vframes 1 -an -f rawvideo -s 300*300 uploads/sample.jpg"
	os.system("ffmpeg -itsoffset -15 -i ./uploads/"+sys.argv[1]+" -vcodec mjpeg -vframes 1 -an -f rawvideo -s "+width+"*"+height+" thumbnails/"+fileW+".jpg")
	#ls="pwd"
	#print(subprocess.check_output(ls, shell=True))
	data = [ { 'width':'A', 'b':(2, 4), 'c':3.0 } ]
        pprint(mavar)

	data = [ { 'width': width, 'height':height } ]
	repr(data)
	data_string = json.dumps(data)
	print ('JSON:'+data_string)
	#print("Width : %(width)s  Height : %(height)s" % videoInformations)

