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

Server Configuration
--------------------

### Sofwares

To properly work, CROPCROP require softwares.

* Python 3.0
* FFmpeg 1.0
* (yasm as dependency of FFmpeg)
* MediaInfo
* zip 3.0

To facilitate the installation, the install.sh script ( CropCrop root folder ) will install thoses softwares (Debian based).

	sh install.sh

If you wish to install yourself the softwares, you can refers to the checksys.php wich will give you informations about installed versions.

### Configuration

* allow python3 script
* give writing permissions

### Note about FFmpeg

It actually exists two "versions" of FFmpeg : FFmpeg by the dev of FFmpeg, and a fork called Libav included by default in Debian packages. Because Libav still use the call command ffmpeg for historical and compatibility reasons, it may lost users on the version they have and the one we want. We want FFmpeg by the developpers of FFmpeg, and it must be installed by the source code from ffmpeg.org/releases/ .