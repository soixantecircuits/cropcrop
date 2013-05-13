sudo apt-get install yasm
wget ffmpeg.org/releases/ffmpeg-1.0.tar.bz2
tar jxf ffmpeg-1.0.tar.bz2
cd ffmpeg-1.0/
./configure
make
sudo make install
cd ..
rm -R ffmpeg-1.0/
rm ffmpeg-1.0.tar.bz2
ffmpeg