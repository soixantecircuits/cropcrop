<?php

 echo 'CropCrop need "Server" folder to be writable and readable.<br><br>';
 echo 'Status of "Server" folder : ';

if (is_writable('server') && is_readable('server')) {
    echo ' Writable and Readable.';
} else {
    echo 'Folder not accessible';
}

echo "<br><br><br>";


echo "Minimum Python version on server for CropCrop  is: Python 2.7.3  <br>";
$output = shell_exec('python --version 2>&1');
echo "Your actual version is : $output  <br> <br>";

echo "MediaInfo version on server for CropCrop is : v0.7.52 <br>";
$output2 = shell_exec('mediainfo --version');
echo "Your actual version is : ";

echo shell_exec('mediainfo --version');

echo " <br> <br> FFMpeg is required on server for CropCrop, even if it is deprecated.<br>";
echo "  Your actual version of FFMpeg is : <br> <pre>";



echo shell_exec('ffmpeg -version');

echo "</pre>";

echo " <br> <br> Zip version on server for CropCrop is : Zip 3.0 <br>";
echo "Your actual version is :<pre>";


echo shell_exec('zip --version 2>&1');
echo ""







 ?>