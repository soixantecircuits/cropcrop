## CROPCROP installation
## yasm as dependency
## 
sudo apt-get install python3
sudo apt-get install mediainfo
sudo apt-get install zip

## Installation by source code of FFmpeg, by the devs of FFmpeg (we do not want the libav version included in Debian)
sudo apt-get install yasm # Dependency
wget ffmpeg.org/releases/ffmpeg-1.0.tar.bz2
tar jxf ffmpeg-1.0.tar.bz2
cd ffmpeg-1.0/
./configure
make
sudo make install
cd ..

## Cleaning
rm -R ffmpeg-1.0/
rm ffmpeg-1.0.tar.bz2
ffmpeg