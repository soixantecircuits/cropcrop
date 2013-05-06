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
					<h2>Video cropping made easy</h2>
				</div>
			</header>
			</div>
			<!-- HEADER END -->


			<div id="body">

				<div id="nav">
				<nav>
					<!-- Bouton upload -->
					<input type="button"class="custom button large dark" value ="Upload" id="buttonUpload" />

					<!-- Zone screen input -->
					<form class="navElement" id="addScreenForm">

						<div class="navElement"  id="addScreenInputText">
							<input class="text-field navInputText disabled" type="text" placeholder="W:" name="text_field" id="navInputTextWidth">
							<input class="text-field navInputText disabled" type="text" placeholder="H:" name="text_field" id="navInputTextHeight">
						</div>
						<input type="submit" class="navElement custom button large dark disabled" value ="Add Screen" id="buttonAddScreen" />

					</form>

					<!-- Zone autocrop -->
					<div class="navElement" id="autoCropCheckboxDiv">
						<!--<p>
							<input id="autoCropCheckbox" type="checkbox" class="disabled" />
							Autocrop
						</p>-->

						<p>
							<label id="autoCropCheckboxLabel" for="autoCropCheckbox">Autocrop</label>
							<input type="checkbox" class="slide-switch dark disabled" id="autoCropCheckbox">
							<label for="autoCropCheckbox">
								<span class="wrapper">
									<span class="on">ON</span>
									<span class="switch"></span>
									<span class="off">OFF</span>
								</span>
							</label>
				   		</p>
					</div>

					<!-- Bouton Crop It -->
					<div class="navElement" id="buttonCropItContainer">
						<input type="button" class="custom button large dark disabled" value ="Crop It" id="buttonCropIt" />
						<div class="spinner large" role="progressbar" id="cropItProgressBar"></div>
					</div>

					<!-- TOOL MENU -->
					<div id="yourVideoContent">
						<a class="custom button large dark disabled" role="button" id="buttonYourVideo" href="#button"><span id="buttonYourVideo">Your Video</span><span id="triangle"></span></a>
						
						
						<!-- TOOL BAR -->
						<div id="YourVideoToolbar">

							<ul id="videoInformationsDiv">
								<li>
									<strong><span id="videoInformationsTitle">...</span></strong>
								</li>
								<li>
									Dimensions : <span id="videoInformationsWidth">...</span> x <span id="videoInformationsHeight">...</span>
								</li>
								<li>
									Size : <span id="videoInformationsSize">...</span>
								</li>
								<li>
									FPS : <span id="videoInformationsFPS">...</span>
								</li>
							</ul>

							<div id="videoDownloadButtonDiv">
								<a title="Download It" target="_blank" id="buttonDownloadIt"><input type="button" class="button cta large dark disabled" value="Download It" id="buttonDownloadItInput" /></a>
							</div>

							<div id="videoCropListDiv">
							</div>

						</div>

						<div id="fix">
							<p>Div fixing #buttonYourVideo position.</p>
						</div>

					<!-- END TOOL MENU -->
					</div>
				</nav>
				</div>


				<div id="secondMenu">
					<p id="secondMenuContent">
						<span class="button-group large">
							<a id="buttonUploadYourPhoto" class="button large dark disabled" role="button">Upload your photo</a>
						</span>
						<span class="button-group large">
							<a role="button" class="button start dark large disabled" id="buttonFormat1_1" >1 : 1</a>
							<a role="button" class="button inside dark large disabled" id="buttonFormat3_2" >3 : 2</a>
							<a role="button" class="button inside dark large disabled" id="buttonFormat4_3" >4 : 3</a>
							<a role="button" class="button inside dark large disabled" id="buttonFormat16_9" >16 : 9</a>
							<a role="button" class="button inside dark large disabled" id="buttonFormat5_3" >5 : 3</a>
							<a role="button" class="button end dark large disabled" id="buttonFormat16_10" >16 : 10</a>
						</span>
					</p>
				</div>

				<div id="progressContainer">
					<div id="progress">
						<div class="bar" style="width: 0%;">
							<p>
								<span id="progressBarText"></span>
							</p>
						</div>
					</div>	
				</div>		








				<!-- VIDEO AREA -->
				<div id="videoContent">
					<div id="videoContentCache">
						<div id="videoContentBackground">
							<img src="img/camera.png">
							<p>
								Or just drag and drop your video here
							</p>
						</div>
					</div>
				</div>
				
				<div id="thumbnailsContainer">
					<div id="thumbnailsList">

						<button id="carouselPrev" class="button dark prev disabled"> << </button>
						<button id="carouselNext" class="button dark next disabled"> >> </button>
						<div class="thumbnailsCarousel">
							<ul id="carouselContainer">
							</ul>
						</div>

					</div>
				</div>

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


		</div>

		<div id="cache">
		</div>
		<div id="uploadingModal">
			<input id="fileupload" type="file" name="files[]" data-url="server/php/" />

			<div id="main">
				<h1>Upload Your Images</h1>
				<form method="post" enctype="multipart/form-data"  action="upload.php">
					<input type="file" name="images" id="images" multiple />
					<button type="submit" id="btn">Upload Files!</button>
				</form>

		  		<div id="response">
		  		</div>
				<ul id="image-list">

				</ul>
			</div>


    <!-- this will ask for confirmation: -->
    <a href="http://google.com">external link</a>

    <!-- this will go without asking: -->
    <a href="anotherPage.html" onClick="unhook()">internal link, un-hooked</a>

			
		</div>

		<div id="warningJavascriptNotEnabled">
		</div>


		<!-- Import libraries -->
		<script type="text/javascript" src="js/vendor/jquery-1.9.1.js"></script>
		<script type="text/javascript" src="js/vendor/jquery-ui.js"></script>
		<script type="text/javascript" src="js/vendor/jquery.fileupload.js"></script>
		<script type="text/javascript" src="js/vendor/jcarousellite_1.0.1.js"></script>
		<!-- Import Mixpanel -->
		<script type="text/javascript">(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===e.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==
typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);
b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);
mixpanel.init("6a11b8598a929f09bff74f7c0a52addf");</script><!-- end Mixpanel -->

		<!-- Our scripts :D -->
		<script type="text/javascript" src="js/app.js"></script>

		<script type="text/javascript">
			// mixpanel.track("Video play");
		</script>

	    <script type="text/javascript">
	      var hook = true;
	      window.onbeforeunload = function() {
	        if (hook) {
	          return "Did you save your stuff?"
	        }
	      }
	      function unhook() {
	        hook=false;
	      }
	    </script>

	</body>
</html>