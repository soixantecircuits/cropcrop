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

				<h2 class="custom title h2">CROPCROP Server Check</h2>


				<!-- Start Server Permission Control -->
				<p>
					<span class="checksysImportant">CropCrop need server folders to be writable and readable</span>.
				</p>
				<p>
					<?php
						if (is_writable('server') && is_readable('server')) {
							echo '<span class="checksysPadding">Server permissions : </span> Writable and Readable';
						}
						else if ((is_writable('server') == false) || (is_readable('server') == false)){
							echo '<span class="checksysPadding">Server permissions : <span class="checksysImportant"><span class="checksysError">Folder non-writable or readable</span>';
						}						
					?>
				</p>
				<!-- End Server Permission Control -->



				<!-- Start Python Version Control -->
				<p>
					<span class='checksysImportant'>Python 2.7.3</span><strong class="checksysInfo"> is required. Your actual version is : </strong>
				</p>
				<p>
					<?php
						$output = shell_exec('python --version 2>&1');
						if ( strpos(  $output , "command not found" ) == true ) {
							echo "<pre class='checksysPadding checksysError'>$output</pre>";
						} else {
							list($un, $deux, $trois) = split('[.]', $output);
							list($useless, $un) = split('[ ]', $un);

							if(((int)$un >= 2) && ((int)$deux>=7) && ((int)$trois>=3)) {
								echo "<pre class='checksysPadding'>". $output . "</pre>";
							}
							else {
								echo"<pre class='checksysPadding checksysError'>$output</pre>";
							}							
						}
					?>
				</p>
				<!-- End Python Version Control -->




				<p>
					<span class='checksysImportant'>Python 3.0.0</span><strong class="checksysInfo"> is required. Your actual version is : </strong>
				</p>
				<p>
					<?php
						$output = shell_exec('python3 --version 2>&1');
						if ( strpos(  $output , "command not found" ) == true ) {
							echo "<pre class='checksysPadding checksysError'>$output</pre>";
						} else {
							
							list($un, $deux, $trois) = split('[.]', $output);
							list($useless, $un) = split('[ ]', $un);

							if(((int)$un >= 3) && ((int)$deux>=0) && ((int)$trois>=0)) {
								echo "<pre class='checksysPadding'>". $output."</pre>";
							}
							else {
							 	echo"<pre class='checksysPadding checksysError'>$output</pre>";
							}
						}
					?>
				</p>




				<!-- Start MediaInfo Version Control -->
				<p>
					<span class='checksysImportant'>MediaInfo v0.7.52</span><strong class="checksysInfo"> is required. Your actual version is :</strong>
				</p>
				<p>
					<?php
						$output = shell_exec('mediainfo --version 2>&1');
						if ( strpos(  $output , "command not found" ) == true ) {
							echo "<pre class='checksysPadding checksysError'>$output</pre>";
						} else {
							echo "<pre class='checksysPadding'>$output</pre>";
						}
					?>
				</p>
				<!-- End MediaInfo Version Control -->


				
				<!-- Start FFmpeg Version Control -->
				<p>
					<span class='checksysImportant'>FFMpeg 1.0</span><strong class="checksysInfo"> is required even if deprecated. Your actual version is :</strong>
				</p>
				<p>
					<?php
						$output = shell_exec('ffmpeg 2>&1');
						$str = strtok($output, "\n");
						list($un) = split('[.]', $str);
						$last = substr($un, -1);


						if ( strpos(  $output , "command not found" ) == true ) {
							echo "<pre class='checksysPadding checksysError'>$output</pre>";
						} else if (($last != 1)  || strpos(  $str , "FFmpeg version SVN" ) == true ) {
							echo "<pre class='checksysPadding checksysError'>$str</pre>";
						}
						else { echo "<pre class='checksysPadding'>$str</pre>";  }
					?>
				</p>
				<!-- End FFmpeg Version Control -->



				<!-- Start Zip Version Control -->
				<p>
					<span class='checksysImportant'>Zip 3.0</span><strong class="checksysInfo"> is required. Your actual version is :<br /></strong>
				</p>
				<p>
					<?php
						$output = shell_exec('zip --version 2>&1');
						
						if ( strpos(  $output , "command not found" ) == true ) {
							echo "<pre class='checksysPadding checksysError'>$output</pre>";
						} else {

							$arr = explode("\n", $output);
							
							list($un) = split('[.]', $arr[1]);
							$last = substr($un, -1);

							if ($last != 3){  echo "<pre class='checksysPadding checksysError'>$arr[1]</pre>";  }
							else echo "<pre class='checksysPadding'>$arr[1]</pre>";
						}
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