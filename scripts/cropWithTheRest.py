#!/usr/bin/python3.2

## Module Import
import json                                # To treat JSON
import os                                  # System command calls
import subprocess                          # System command calls
import sys                                 # System command calls
from pprint import pprint                  # To do pprint, rather than pprint.pprint

## Preparing
os.system("clear")                         # Call Clear to clean the Terminal

print ("CROPPING VIDEO")
print ("Softwares required :")
print ("Python 3.2")
print ("FFmpeg 1.0")
print ("MediaInfo")
print ("")
print ("This script is used to crop a video,")
print ("And to get the parts around the cropped part.")
print ("")
print ("How to call : python3 cropWithTheRest.py myfile.ext")

# System call (middle % isolated this way => "..." + "%" + "...", otherwise it f*** everything up)

# Stock informations
# videoInformations = {
#    "filename"                         : sys.argv[1].split(".")[0],
#    "fileExt"                          : sys.argv[1].split(".")[1],
#    "width"                            : int(subprocess.check_output(videoWidthCmd, shell=True)),
#    "height"                           : int(subprocess.check_output(videoHeightCmd, shell=True))
#}

#Get simple var
inputFile                                  = sys.argv[1]
videoWidthCmd                              = "mediainfo --Inform='Video;" + "%" + "Width%' " + sys.argv[1]    # System call to get video width with MediaInfo, called for fileWidth var
videoHeightCmd                             = "mediainfo --Inform='Video;" + "%" + "Height%' " + sys.argv[1]   # System call to get video height with MediaInfo, called for fileHeight var
x                                          = int(subprocess.check_output(videoWidthCmd, shell=True))
y                                          = int(subprocess.check_output(videoHeightCmd, shell=True))

print ("--------")
print ("Name   : "+inputFile)
print ("Width  : "+str(x))
print ("Height : "+str(y))
print ("--------")
print("")

outputFile                                 = input("Output file (file.ext ) : ")

ix                                         = input("Desired width           : ")
iy                                         = input("Desired height          : ")
cx                                         = input("Margin from left        : ")
cy                                         = input("Margin from top         : ")
# Make complex var
rightWidth                                 = int(x) - ( int(cx) + int(ix) )
rightMargin                                = int(cx) + int(ix)
bottomHeight                               = int(y) - ( int(cy) + int(iy) )
bottomMargin                               = int(cy) + int(iy)


print ("--------")
print ("Name          : "+inputFile)
print ("Right Width   : "+str(rightWidth))
print ("RightMargin   : "+str(rightMargin))
print ("BottomHeight  : "+str(rightMargin))
print ("BottomMargin  : "+str(bottomMargin))
print ("Height        : "+str(y))
print ("--------")
print("")


#Stock all var
variables = {
	"inputFile"    : inputFile,
	"x"            : int(x),
	"y"            : int(y),
	"outputFile"   : outputFile,
	"ix"           : int(ix),
	"iy"           : int(iy),
	"cx"           : int(cx),
	"cy"           : int(cy),
	"rightWidth"   : int(rightWidth),
	"rightMargin"  : int(rightMargin),
	"bottomHeight" : int(bottomHeight),
	"bottomMargin" : int(bottomMargin)
}


# Top left
output00 = "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(cx)s:%(cy)s:0:0 -keyint_min 1 00%(outputFile)s" % variables,
# Top middle
output01 = "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(ix)s:%(cy)s:%(cx)s:0 -keyint_min 1 01%(outputFile)s" % variables,
# Top right
output02 = "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(rightWidth)s:%(cy)s:%(rightMargin)s:0 -keyint_min 1 02%(outputFile)s" % variables,

# Middle left
output10 = "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(cx)s:%(iy)s:0:%(cy)s -keyint_min 1 10%(outputFile)s" % variables,
# Middle middle
output11 = "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(ix)s:%(iy)s:%(cx)s:%(cy)s -keyint_min 1 11%(outputFile)s" % variables,
# Middle right
output12 = "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(rightWidth)s:%(iy)s:%(rightMargin)s:%(cy)s -keyint_min 1 12%(outputFile)s" % variables,

# Bottom left
output20 = "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(cx)s:%(bottomHeight)s:0:%(bottomMargin)s -keyint_min 1 20%(outputFile)s" % variables,
# Bottom middle
output21 = "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(ix)s:%(bottomHeight)s:%(cx)s:%(bottomMargin)s -keyint_min 1 21%(outputFile)s" % variables,
# Bottom right
output22 = "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(rightWidth)s:%(bottomHeight)s:%(rightMargin)s:%(bottomMargin)s -keyint_min 1 22%(outputFile)s" % variables

print(output00)

## Top
if cy!=0:
	if cx!=0:
		os.system(str(output00))

if cy!=0:
	os.system(str(output01))

if cy!=0:
	if rightWidth!=0:
		os.system(str(output02))
# Middle
if cx!=0:
	os.system(str(output10))

os.system(str(output11)) # Our main element

if rightWidth!=0:
	os.system(str(output12))

# Bottom
if bottomHeight!=0:
	if cx!=0:
		os.system(str(output20))

if bottomHeight!=0:
	os.system(str(output21))

if bottomHeight!=0:
	if rightWidth!=0:
		os.system(str(output22))