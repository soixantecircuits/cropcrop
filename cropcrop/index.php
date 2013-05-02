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
		
		<link rel="icon" type="image/png" href="img/favicon.ico" />

		<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
		<script type="text/javascript" src="js/jquery-ui.js"></script>
		<script type="text/javascript" src="js/vendor/jquery.ui.widget.js"></script>
		<script type="text/javascript" src="js/jquery.iframe-transport.js"></script>
		<script type="text/javascript" src="js/jquery.fileupload.js"></script>
		<script type="text/javascript" src="js/jcarousellite_1.0.1.js"></script>
		<script type="text/javascript" src="js/upload.js"></script>
		<script type="text/javascript" src="js/scripts.js"></script>

		<script>
		$(function () {

			// SCRIPT UPLOAD DONE
			$('#fileupload').fileupload({
				dataType: 'json',
				done: function (e, data) {
					$.each ( data.result.files, function (index, file) {
						// $('<p/>').text(file.name).appendTo(document.body);
					});
				}
			});

			// SCRIPT WHEN UPLOAD DONE
			$('#fileupload').bind('fileuploaddone', function (e, data) { 
				console.log("----------------");
				console.log(data);
				$.each(data.result.files, function (index, file) {
					var _self=this;

					$.ajax({
						type: "POST",
						data : _self,
						url: './server/php/test.php', success: function(response) {
							console.log(response);
							dataAStocker = _self;
							console.log("");
							console.log("fileuploaddone");
							
							console.log("");

							$().updateVideoInformations( response );
						}
					});
				})
			});


			$('#fileupload').bind('fileuploadprogress', function (e, data) { 
				
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#progress .bar').css(
					'width', progress + '%'
				);
				$("#progressBarText").text("Downloading your video file : "+progress+" %");
   			});

			// $("#autoCropCheckbox").is(':checked');

			  /***********************/
			 /*  User can upload his photo  */
			/***********************/
			$("#buttonUploadYourPhoto").click(function(event){
				event.preventDefault();
				$("#images").trigger("click");
			});
			$("#yourPhotoUpload").change(function(event){
				event.preventDefault();
				$("#btn").submit();
			});

		});





		
		</script>

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
							<a id="buttonUploadYourPhoto" class="button large dark" role="button">Upload your photo</a>
						</span>
						<span class="button-group large">
							<a class="button start dark large" role="button" href="#button-bar">1 : 1</a>
							<a class="button inside dark large" role="button" href="#button-bar">4 : 3</a>
							<a class="button inside dark large" role="button" href="#button-bar">16 : 9</a>
							<a class="button end dark large" role="button" href="#button-bar">16 : 10</a>
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
					<p><a class="link dark" href="http://vimeo.com/soixantecircuits/videos/">&#169; 2013 Soixante circuits | All Rights Reserved</a></p>
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
		</div>

		<div id="warningJavascriptNotEnabled">
		</div>



		<div id="rouge">
		</div>


	</body>
</html>