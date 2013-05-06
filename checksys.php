<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

		<meta name="msapplication-TileColor" content="#494D4E" />
		<meta name="msapplication-TileImage" content="css/images-interface/logo.png" />
		<meta content="application/xhtml+xml; charset=UTF-8" http-equiv="Content-Type" />
		
		<link rel="stylesheet" media="screen" type="text/css" href="css/normalize.css" />
		<link rel="stylesheet" media="screen" type="text/css" href="css/topcoat-desktop-min.css" />
		<link rel="stylesheet" media="screen" type="text/css" href="css/jquery-ui.css" />
		<link rel="stylesheet" media="screen" type="text/css" href="css/styles.css" />
		
		<link rel="icon" type="image/png" href="img/favicon_static.png" />

		<title>CROP CROP</title>
	</head>
	<body>


		<div id="container" class="bg-slategray">


			<div id="header">
			<header>
				<div id="headerContent">
					<ul>
						<li><a href="https://github.com/soixantecircuits/cropcrop/" title="Project on GitHub"><img src="img/logoGitHub.png" /></a></li>
						<li><a href="https://www.facebook.com/pages/Soixante-circuits/148341911906454" title="Find us on Facebook"><img src="img/logoFacebook.png" /></a></li>
						<li><a href="#"  title="Help"><img src="img/logoHelp.png" /></a></li>
					</ul>
					<h1 class="title">Crop crop <span id="betaText">(BETA)</span></h1>
					<h2 class="customh2">Video cropping made easy</h2>
				</div>
			</header>
			</div>
			<!-- HEADER END -->


			<div id="checksysPhpContent">

<?php

echo '<h2>CROPCROP Server Check</h2>';
echo 'CropCrop need " Server " folders to be <span id="checksysImportant">writable</span> and <span id="checksysImportant">readable</span>.<br><br>';
echo 'Server permissions : ';

if (is_writable('server') && is_readable('server')) {
    echo ' .................................................................................................................  <span id="checksysOk">OK : Writable and Readable</span>';
} else {
    echo '....................................................................................................................................... <span id="checksysError">Folder non-writable or readable</span>';
}

echo "<br><br><br>";


echo "<span id='checksysImportant'>Python 2.7.3</span> is get_required_files():   <br>";
$output = shell_exec('python --version 2>&1');
echo "Your actual version is : <pre id='checksysInfo'>$output</pre>";

echo "<span id='checksysImportant'>MediaInfo v0.7.52</span> is required: <br>";
$output2 = shell_exec('mediainfo --version');
echo "Your actual version is : ";

echo "<pre id='checksysInfo'>";
echo shell_exec('mediainfo --version 2>&1');
echo "</pre>";

echo "<span id='checksysImportant'>FFMpeg 1.0</span> is required even if deprecated.<br>";
echo "Your actual version of FFMpeg is : <br> <pre id='checksysInfo'>";



echo shell_exec('ffmpeg -version');

echo "</pre>";

echo "<span id='checksysImportant'>Zip</span> version on server for CropCrop is : Zip 3.0<br>";
echo "Your actual version is :<pre id='checksysInfo'>";


echo shell_exec('zip --version 2>&1');
echo "";


?>


	</body>
</html>