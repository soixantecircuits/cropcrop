<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

		<meta name="msapplication-TileColor" content="#494D4E" />
		<meta name="msapplication-TileImage" content="./css/images-interface/logo.png" />
		<meta content="application/xhtml+xml; charset=UTF-8" http-equiv="Content-Type" />
		
		<link rel="stylesheet" media="screen" type="text/css" href="./css/fileUploader.css" />
		<link rel="stylesheet" media="screen" type="text/css" href="./css/normalize.css" />
		<link rel="stylesheet" media="screen" type="text/css" href="./css/topcoat-desktop-min.css" />
		<link rel="stylesheet" media="screen" type="text/css" href="./css/styles.css" />
		
		<link rel="icon" type="image/png" href="./img/favicon.ico" />

		<link href="css/ui-lightness/jquery-ui-1.8.14.custom.css" rel="stylesheet" type="text/css" />
		
		<script type="text/javascript" src="./js/jquery-1.6.2.min.js"></script>
		<script type="text/javascript" src="./js/jquery-ui-1.8.14.custom.min.js"></script>
		<script type="text/javascript" src="./js/jquery.fileUploader.js"></script>
		<script type="text/javascript" src="./js/scripts.js"></script>
		
		<title>CROP CROP</title>
	</head>
	<body>


		<div id="container" class="bg-slategray">


			<div id="header">
			<header>
				<div id="headerContent">
					<ul>
						<li><a href="https://github.com/soixantecircuits/cropcrop/" title="Project on GitHub"><img src="./img/logoGitHub.png" /></a></li>
						<li><a href="https://www.facebook.com/pages/Soixante-circuits/148341911906454" title="Find us on Facebook"><img src="./img/logoFacebook.png" /></a></li>
						<li><a href="#"  title="Help"><img src="./img/logoHelp.png" /></a></li>
					</ul>
					<h1 class="title">Crop crop</h1>
					<h2>Video cropping made easy</h2>
				</div>
			</header>
			</div>
			<!-- HEADER END -->







			<div id="body">
				<div id="nav">
				<nav>
					<!-- Bouton upload -->
					<input type="button"class="button large dark" value ="Upload" id="buttonUpload" />

					<!-- Zone screen input -->
					<div class="navElement" id="addScreenInputText">
						<input class="text-field navInputText" type="text" placeholder="W:" name="text_field">
						<input class="text-field navInputText" type="text" placeholder="H:" name="text_field">
					</div>
					<input type="button" class="button large dark" value ="Add Screen" id="buttonAddScreen" />

					<!-- Zone autocrop -->
					<div class="navElement" id="autoCropCheckboxDiv">
						<p>
							<input type="checkbox" />
							Autocrop
						</p>
					</div>

					<!-- Bouton Crop It -->
					<input type="button" class="button large dark" value ="Crop It" id="buttonCropIt" />

					<!-- Menu déroulant -->
					<div id="yourVideoContent">
						<a class="button large dark" role="button" id="buttonYourVideo" href="#button"><span id="buttonYourVideo">Your Video</span><span id="triangle"></span></a>
						<div id="YourVideoToolbar">
								<ul id="videoInformationsDiv">
									<li><strong>Battle de créateurs.mp4</strong></li>
									<li>Format : AVC Coding	</li>
									<li>Dimensions : 1920 x 1080</li>
									<li>Size : 2,3 MB</li>
									<li>FPS : 25</li>
								</ul>
							<div id="videoDownloadButtonDiv">
								<input type="button" class="button large dark" value ="Download It" id="buttonDownloadIt" />
							</div>
							<div id="videoCropListDiv">
								<ol>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
								</ol>
							</div>
						</div>
					</div>
				</nav>
				</div>



				<div id="videoContent">
					<div id="videoContentBackground">
						<img src="./img/camera.png">
						<p>
							Or just drag and drop your video here
						</p>
					</div>
				</div>











			</div>
			<!-- BODY END -->


			<div id="footer">
			<footer>
				<div id="footerContent">
					<p><a class="link dark" href="http://vimeo.com/soixantecircuits/videos/">&#169; 2013 Soixante circuits | All Rights Reserved</a></p>
				</div>
			</footer>
			</div>


		</div>

		<div id="cache">
		</div>
		<div id="rouge">
		</div>
		<div id="uploadingModal">
			<h2>jQuery Fileuploder Plugin</h2>
			<form action="upload.php" method="post" enctype="multipart/form-data">
				<input type="file" id="inputFileUpload" name="userfile" class="fileUpload" >
				
				<!-- <button id="px-submit" type="submit">Upload</button>
				<button id="px-clear" type="reset">Clear</button> -->
			</form>
			
				<script type="text/javascript">
					jQuery(function($){
						$('.fileUpload').fileUploader();
					});
				</script>
		</div>



		<div id="warningJavascriptNotEnabled">
		</div>



	</body>
</html>