<?php

echo "Minimum Python version on server for CropCrop  is: Python 2.7.3  <br>";
$output = shell_exec('python --version 2>&1');
echo "Your actual version is : $output  <br> <br>";

echo "MediaInfo version on server for CropCrop  is : v0.7.52 <br>";
$output2 = shell_exec('mediainfo --version');
echo "Your actual version is : ";
echo shell_exec('mediainfo --version');

echo shell_exec('<br> <br> <br>');






 ?>