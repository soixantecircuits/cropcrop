#!/usr/bin/python3.2

### Import
import os

### Script Begin
## Clear the terminal
os.system('clear')

## User interface
print ("CROPPING VIDEO")
print ("Softwares required :")
print ("Python 3.2")
print ("FFmpeg 1.0")
print ("This script is used to crop a video, and to get the parts around the cropped part, resulting in having 9 videos.")
print ("")

#Get simple var
inputFile    = input("Input file (file.ext )  : ")
x            = input("Input width             : ")
y            = input("Input height            : ")
print("")
outputFile   = input("Output file (file.ext ) : ")
ix           = input("Middle element width    : ")
iy           = input("Middle element height   : ")
cx           = input("Crop margin from left   : ")
cy           = input("Crop margin from top    : ")
# Make complex var
rightWidth   = int(x) - ( int(cx) + int(ix) )
rightMargin  = int(cx) + int(ix)
bottomHeight = int(y) - ( int(cy) + int(iy) )
bottomMargin = int(cy) + int(iy)

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

### Container of screens with 
outputs = {
# Top left
"output00" : "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(cx)s:%(cy)s:0:0 -keyint_min 1 00%(outputFile)s" % variables,
# Top middle
"output01" : "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(ix)s:%(cy)s:%(cx)s:0 -keyint_min 1 01%(outputFile)s" % variables,
# Top right
"output02" : "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(rightWidth)s:%(cy)s:%(rightMargin)s:0 -keyint_min 1 02%(outputFile)s" % variables,

# Middle left
"output10" : "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(cx)s:%(iy)s:0:%(cy)s -keyint_min 1 10%(outputFile)s" % variables,
# Middle middle
"output11" : "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(ix)s:%(iy)s:%(cx)s:%(cy)s -keyint_min 1 11%(outputFile)s" % variables,
# Middle right
"output12" : "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(rightWidth)s:%(iy)s:%(rightMargin)s:%(cy)s -keyint_min 1 12%(outputFile)s" % variables,

# Bottom left
"output20" : "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(cx)s:%(bottomHeight)s:0:%(bottomMargin)s -keyint_min 1 20%(outputFile)s" % variables,
# Bottom middle
"output21" : "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(ix)s:%(bottomHeight)s:%(cx)s:%(bottomMargin)s -keyint_min 1 21%(outputFile)s" % variables,
# Bottom right
"output22" : "ffmpeg -i %(inputFile)s -strict experimental -r 25 -vf crop=%(rightWidth)s:%(bottomHeight)s:%(rightMargin)s:%(bottomMargin)s -keyint_min 1 22%(outputFile)s" % variables
}

# Loop in outputs dictionnary, output is the key, while i is the content.
for output, i in outputs.items():
    print (output, 'corresponds to', i)
    #Execute command
    os.system(i)

# Giving the opportunity to user to check errors
print("")
print("")
print("")
input("Press ENTER to quit.")
