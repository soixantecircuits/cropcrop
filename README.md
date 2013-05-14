CROPCROP
========

Description
-----------
A tool for cropping video easily online.

1. Upload your Video file
2. wait for thumbnails to be created, then pick it to work with
3. draw your screens on the displayed thumbnail
4. push ' Crop It '
5. wait for the zip folder with your cropped videos !

Server Depedencies
------------------
Execute install.sh script ( CropCrop root folder ) to install all dependencies required.

 =>    sh install.sh

Softwares :
* Python 3.2
* FFmpeg 1.0
* MediaInfo
* zip 3.0

Server Installation
-------------------

* Refers to the checksys.php

Server configuration
--------------------

* allow python3 script
* give writing permissions

FFmpeg
------
It actually exists two "versions" of FFmpeg : FFmpeg by the dev of FFmpeg, and a fork called Libav included by default in Debian packages. Because Libav still use the call command ffmpeg for historical and compatibility reasons, it may lost users on the version they have and the one we want. We want FFmpeg by the developpers of FFmpeg, and it must be installed by the source code from ffmpeg.org/releases/ .