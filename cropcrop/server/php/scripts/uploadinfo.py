#!/usr/bin/python3.2
import json
import os
import subprocess
import sys
from pprint import pprint
import random

program_name = sys.argv[0]
arguments = sys.argv[1]

filename = "'"+sys.argv[1]+"'"
filename2 = filename.split("/")[-1]
filex=filename.split("/")[-1]
fileW=filex.split(".")[0]
fileW.replace(" ", "")
fileW.replace(")", "")
fileW.replace("(", "")
alphabet = 'abcdefghijklmnopqrstuvwxyz'

min = 5
max = 15

name = random.sample(alphabet,random.randint(min,max))
random_string = ''.join(name)
#print(" File name : "+fileExt)


if sys.argv.__len__()>0:
	
	# Command lines to invocate
	
	videoWidthCmd     = "mediainfo --Inform='Video;"+"%"+"Width%' "+filename
	videoHeightCmd    = "mediainfo --Inform='Video;"+"%"+"Height%' "+filename
	fileExtensionCmd  = "mediainfo --Inform='General;" + "%" + "FileExtension%' " + filename
	fileSizeCmd       = "mediainfo --Inform='General;" + "%" + "FileSize/String%' " + filename
	frameRateCmd      = "mediainfo --Inform='Video;" + "%" + "FrameRate%' " + filename
	
	# Stock informations
	videoInformations = {
		"filename"      : sys.argv[1],
		"width"         : int(subprocess.check_output(videoWidthCmd, shell=True)),
		"height"        : int(subprocess.check_output(videoHeightCmd, shell=True)),
		"fileExt"       : str(subprocess.check_output(fileExtensionCmd, shell=True).rstrip())[1:],
		"fileSize"      : str(subprocess.check_output(fileSizeCmd, shell=True).rstrip())[1:],
		"frameRate"     : str(subprocess.check_output(frameRateCmd, shell=True).rstrip())[1:]
	}
	
        #ffmpeg = 'encoder\ffmpeg'
	width = ("%(width)s" % videoInformations)
	height = ("%(height)s" % videoInformations)
	fileExt = ("%(fileExt)s" % videoInformations)
	fileSize = ("%(fileSize)s" % videoInformations)
	frameRate = ("%(frameRate)s" % videoInformations)
	thumbname = "./thumbnails/"+random_string
	
	os.system("ffmpeg -itsoffset -15 -i "+filename+" -vcodec mjpeg -vframes 1 -an -f rawvideo -s "+width+"*"+height+" "+thumbname+".jpg")
	
	data =  { 'width': width, 'height':height,'filename':filename2, 'fileSize': fileSize, 'frameRate': frameRate,'fileExt' : fileExt, 'thumbnails': thumbname+".jpg"}
	data_string = json.dumps(data)
	#os.system("rm "+filename)
	#f = open('infos.txt', 'wt')
	#f.write(data_string)
	#f.close()
	print(data_string)


