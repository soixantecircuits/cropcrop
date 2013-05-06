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
					<h1 class="custom title"><a href="./index.php" title="Go Home">Crop crop <span id="betaText">(BETA)</span></a></h1>
					<h2 class="customh2">Video cropping made easy</h2>
				</div>
			</header>
			</div>
			<!-- HEADER END -->


			<div id="body" class="checksysPhpContent">

				<h2 class="title">CROPCROP Server Check</h2>


				<!-- Start Server Permission Control -->
				<p>
					<span id="checksysImportant">CropCrop need server folders to be writable and readable</span>.
				</p>
				<p>
					<?php
						if (is_writable('server') && is_readable('server')) {
							echo '<pre><span id="checksysInfo">Server permissions : <span id="checksysImportant"><span id="checksysOk">Writable and Readable</span></pre>';
						}
						else {
							echo '<pre><span id="checksysInfo">Server permissions : <span id="checksysImportant"><span id="checksysError">Folder non-writable or readable</span></pre>';
						}
					?>
				</p>
				<!-- End Server Permission Control -->



				<!-- Start Python Version Control -->
				<p>
					<span id='checksysImportant'>Python 2.7.3</span> is required. Your actual version is : 
				</p>
				<p>
					<?php
						$output = shell_exec('python --version 2>&1');
						echo "<pre id='checksysInfo'>$output</pre>";
					?>
				</p>
				<!-- End Python Version Control -->



				<!-- Start MediaInfo Version Control -->
				<p>
					<span id='checksysImportant'>MediaInfo v0.7.52</span> is required. Your actual version is :
				</p>
				<p>
					<?php
						$output = shell_exec('mediainfo --version 2>&1');
						echo "<pre id='checksysInfo'>$output</pre>"
					?>
				</p>
				<!-- End MediaInfo Version Control -->


				
				<!-- Start FFmpeg Version Control -->
				<p>
					<span id='checksysImportant'>FFMpeg 1.0</span> is required even if deprecated. Your actual version is :
				</p>
				<p>
					<?php
						$output = shell_exec('ffmpeg -version');
						echo "<pre id='checksysInfo'>$output</pre>"
					?>
				</p>
				<!-- End FFmpeg Version Control -->



				<!-- Start Zip Version Control -->
				<p>
					<span id='checksysImportant'>Zip 3.0</span> is required. Your actual version is :<br />
				</p>
				<p>
					<?php
						$output = shell_exec('zip --version 2>&1');
						echo "<pre id='checksysInfo'>$output</pre>"
					?>
				</p>
				<!-- End Zip Version Control -->

			</div>


			<!-- BODY END -->
				

			<div id="footer">
			<footer>
				<div id="footerContent">
					<p>
						<a class="link dark" href="http://vimeo.com/soixantecircuits/videos/">&#169; 2013 Soixante circuits | All Rights Reserved</a>
					</p>
					<p>
						<a href="https://mixpanel.com/f/partner"><img src="//cdn.mxpnl.com/site_media/images/partner/badge_blue.png" alt="Mobile Analytics" /></a>
					</p>
				</div>
			</footer>
			</div>

	</body>
</html>