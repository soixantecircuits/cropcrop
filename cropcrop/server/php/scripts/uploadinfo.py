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
	durationCmd       = "mediainfo --Inform='General;" + "%" + "Duration%' " + filename
	
	# Stock informations
	videoInformations = {
		"filename"      : sys.argv[1],
		"width"         : int(subprocess.check_output(videoWidthCmd, shell=True)),
		"height"        : int(subprocess.check_output(videoHeightCmd, shell=True)),
		"fileExt"       : str(subprocess.check_output(fileExtensionCmd, shell=True).rstrip())[1:],
		"fileSize"      : str(subprocess.check_output(fileSizeCmd, shell=True).rstrip())[1:],
		"frameRate"     : str(subprocess.check_output(frameRateCmd, shell=True).rstrip())[1:],
		"duration"      : int(subprocess.check_output(durationCmd, shell=True))
	}

	


	
        #ffmpeg = 'encoder\ffmpeg'
	width = ("%(width)s" % videoInformations)
	height = ("%(height)s" % videoInformations)
	fileExt = ("%(fileExt)s" % videoInformations)
	fileSize = ("%(fileSize)s" % videoInformations)
	frameRate = ("%(frameRate)s" % videoInformations)	
	duration = ("%(duration)s" % videoInformations)


	widthmini = str(int(width)/10).split(".")[0]
	heightmini = str(int(height)/10).split(".")[0]

	thumb = []
	thumbname =[]
	thumbmini =[]
	#test = []

	for i in range (1,4,1):
		ID=str(i)
		thumb.append(str((int(duration)/3600)/i).split(".")[0])
		thumbname.append(str('./thumbnails/'+random_string+ID))
		thumbmini.append(str('./thumbnails/Mini'+random_string+ID))
    	

	

		

	os.system("ffmpeg -itsoffset -"+thumb[0]+" -i "+filename+" -vcodec mjpeg -vframes 1 -an -f rawvideo -s "+width+"*"+height+" "+thumbname[0]+".jpg")
	os.system("ffmpeg -itsoffset -"+thumb[1]+" -i "+filename+" -vcodec mjpeg -vframes 1 -an -f rawvideo -s "+width+"*"+height+" "+thumbname[1]+".jpg")
	os.system("ffmpeg -itsoffset -"+thumb[2]+" -i "+filename+" -vcodec mjpeg -vframes 1 -an -f rawvideo -s "+width+"*"+height+" "+thumbname[2]+".jpg")

	os.system("ffmpeg -itsoffset -"+thumb[0]+" -i "+filename+" -vcodec mjpeg -vframes 1 -an -f rawvideo -s "+widthmini+"*"+heightmini+" "+thumbmini[0]+".jpg")
	os.system("ffmpeg -itsoffset -"+thumb[1]+" -i "+filename+" -vcodec mjpeg -vframes 1 -an -f rawvideo -s "+widthmini+"*"+heightmini+" "+thumbmini[1]+".jpg")
	os.system("ffmpeg -itsoffset -"+thumb[2]+" -i "+filename+" -vcodec mjpeg -vframes 1 -an -f rawvideo -s "+widthmini+"*"+heightmini+" "+thumbmini[2]+".jpg")

	
	data =  { 'miniwidth' :widthmini, 'miniheight' : heightmini, 'width': width, 'height':height,'filename':filename2, 'duration' : duration, 'fileSize': fileSize, 'frameRate': frameRate,'fileExt' : fileExt, 'thumbnails': thumbname[0]+".jpg", 'thumbnails2': thumbname[1]+".jpg", 'thumbnails3': thumbname[2]+".jpg" ,'mini' : thumbmini[0]+".jpg", 'mini2' : thumbmini[1]+".jpg", 'mini3' : thumbmini[2]+".jpg"}
	data_string = json.dumps(data)
	#os.system("rm "+filename)
	#f = open('infos.txt', 'wt')
	#f.write(data_string)
	#f.close()
	print(data_string)


