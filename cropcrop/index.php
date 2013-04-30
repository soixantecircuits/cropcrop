<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

		<meta name="msapplication-TileColor" content="#494D4E" />
		<meta name="msapplication-TileImage" content="css/images-interface/logo.png" />
		<meta content="application/xhtml+xml; charset=UTF-8" http-equiv="Content-Type" />
		
		<link rel="stylesheet" media="screen" type="text/css" href="css/normalize.css" />
		<link rel="stylesheet" media="screen" type="text/css" href="css/jquery.gridster.css" />
		<link rel="stylesheet" media="screen" type="text/css" href="css/topcoat-desktop-min.css" />
		<link rel="stylesheet" media="screen" type="text/css" href="css/jquery-ui.css" />
		<link rel="stylesheet" media="screen" type="text/css" href="css/annotation.css" />
		<link rel="stylesheet" media="screen" type="text/css" href="css/styles.css" />
		
		<link rel="icon" type="image/png" href="img/favicon.ico" />

		<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
		<script type="text/javascript" src="js/jquery-ui.js"></script>
		<script type="text/javascript" src="js/vendor/jquery.ui.widget.js"></script>
		<script type="text/javascript" src="js/jquery.iframe-transport.js"></script>
		<script type="text/javascript" src="js/jquery.fileupload.js"></script>
		<script type="text/javascript" src="js/jquery.gridster.js"></script>
		<script type="text/javascript" src="js/jquery.annotate.js"></script>
		<script type="text/javascript" src="js/scripts.js"></script>
		<script>

		$(window).load(function() {
			annotations = $("#toAnnotate").annotateImage({
				editable: true,
				useAjax: false,
				notes: [ { "top": 0,
						   "left": 0,
						   "width": 52,
						   "height": 37,
						   "text": "Small people on the steps",
						   "id": "e69213d0-2eef-40fa-a04b-0ed998f9f1f5",
						   "editable": true },
						 { "top": 134,
						   "left": 179,
						   "width": 68,
						   "height": 74,
						   "text": "National Gallery Dome",
						   "id": "e7f44ac5-bcf2-412d-b440-6dbb8b19ffbe",
						   "editable": true } ]
			});
		});

		$(function () {
			$('#fileupload').fileupload({
				dataType: 'json',
				done: function (e, data) {
					$.each ( data.result.files, function (index, file) {
						// $('<p/>').text(file.name).appendTo(document.body);
					});
				}
			});

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
							$().updateVideoInformations( response );
						}
					});
				})
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
					<input type="button"class="button large dark" value ="Upload" id="buttonUpload" />

					<!-- Zone screen input -->
					<form class="navElement" id="addScreenForm">

						<div class="navElement"  id="addScreenInputText">
							<input class="text-field navInputText" type="text" placeholder="W:" name="text_field" id="navInputTextWidth">
							<input class="text-field navInputText" type="text" placeholder="H:" name="text_field" id="navInputTextHeight">
						</div>
						<input type="submit" class="navElement button large dark" value ="Add Screen" id="buttonAddScreen" />

					</form>

					<!-- Zone autocrop -->
					<div class="navElement" id="autoCropCheckboxDiv">
						<p>
							<input type="checkbox" />
							Autocrop
						</p>
					</div>

					<!-- Bouton Crop It -->
					<div class="navElement" id="buttonCropItContainer">
						<input type="button" class="button large dark" value ="Crop It" id="buttonCropIt" />
						<div class="spinner large" role="progressbar" id="cropItProgressBar"></div>
					</div>

					<!-- TOOL MENU -->
					<div id="yourVideoContent">
						<a class="button large dark" role="button" id="buttonYourVideo" href="#button"><span id="buttonYourVideo">Your Video</span><span id="triangle"></span></a>
						
						
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

<input id="fileupload" type="file" name="files[]" data-url="server/php/" multiple>
		</div>
		
<!--
<div id="etablis">
	<h2>Tmp work bar</h2>
	<ul>
		<li><input type="button" id="tmpUpd" value="Update videos informations" /></li>
		<li><input type="button" id="tmpAff" value="Affiche crops" /></li>
	</ul>
</div>
-->

		<div id="warningJavascriptNotEnabled">
		</div>



		<div id="rouge">
		</div>
	</body>
</html>