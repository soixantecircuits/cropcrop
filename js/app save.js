jQuery(function($) {
	var formdata = false;
	var serverPath = "server/php/";
	var videoInformations = {};
	var crops = {};
	var dataAStocker = "";
	var autoCropEnabled = false;
	var isCropMenuShown = 0;
	closeTabWithoutWarning = false;
	crops.title = "None";
	crops.list = [];
	videoExtensionsAllowed = [
		'mpg',
		'avi',
		'mp4'];
	faviconAnimated = [
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAxSURBVHjaYvT09fvPAAXbNm1kZCARMP7//5+BEsDEQCEYNWDUgFEDqGQAAAAA//8DAK8NBxl86wmxAAAAAElFTkSuQmCC",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA/SURBVHjaYvT09fvPAAXbNm1kZCARMP7//5+BEsDk5edPkQlMDBQCig2gPAwG3AujBowawMDAwAAAAAD//wMAuY0L+2i8gB4AAAAASUVORK5CYII=",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA+SURBVHjaYvT09fvPAAXbNm1kZCARMP7//5+BEsDk5edPkQlMDBQCig0YDQNqhMGAe2HUAAYGAAAAAP//AwDOOhDd/RF4aQAAAABJRU5ErkJggg==",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA8SURBVHjaYvT09fvPAAXbNm1kZCARMP7//5+BEsDk5edPkQlMDBQCig0YDYPRMKBOGAy4FwAAAAD//wMA7RQVv0mR8O0AAAAASUVORK5CYII=",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA8SURBVHjaYvT09fvPAAXbNm1kZCARMP7//5+BEsDk5edPkQlMDBQCig0YDYPRMBhEYUCJIQAAAAD//wMATC4Zi/we3uAAAAAASUVORK5CYII=",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABGSURBVHjaYvT09fvPAAXbNm1kZCARMP7//5+BEsDk5edPkQlMDBQCig0YDYPRMBgcYcAIy87bNm1kRDaM2KwNAAAA//8DAHc4H6HtbyxcAAAAAElFTkSuQmCC",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABISURBVHjaYvT09fvPAAXbNm1kZCARMP7//5+BEsDk5edPkQlMDBQCig0YDYPRMBgcYcAIy87bNm1kRDYMGx+bAQAAAAD//wMA6AAjoZhrTj0AAAAASUVORK5CYII=",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABJSURBVHjaYvT09fvPAAXbNm1kZCARMP7//5+BEsDk5edPkQlMDBQCig0YDYPRMBgcYcAIy87bNm1kRDaMGD4DAwMDAAAA//8DABjXJ6G/y+xCAAAAAElFTkSuQmCC",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABNSURBVHja7JAxDgAQEAT3xOdInLdS+N5qSJRkW9NNM8VYKk4sRm+GR4wkFEL2KhUCROTAf/AfyA+yV8oP4i6N3uyM3TgATAAAAP//AwANSSmNk0j+4QAAAABJRU5ErkJggg==",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABVSURBVHjaYvT09fvPAAXbNm1kZCARMP7//5+BEsDk5edPkQlMDBQCig0YDQMKw8DLz///EA+DbZs2Mg58GLDATNq2aSMjsmHE8BkYGBgAAAAA//8DAJW3LY19NxMbAAAAAElFTkSuQmCC",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABUSURBVHja7JAxDoAwDMTuqn6OSqRvTYZ8LywgMYJuKRLevHgwt90KJxlOvIRVBYU2bEqFBhE5ID0YNuvjDzKc/4MVHvSrlOG8x544ABwAAAD//wMALnAxjdQJznIAAAAASUVORK5CYII=",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABSSURBVHja7JCxDcAgDMAcxHNFarg1GfJeurRSxxYWBrx58WA5Tk1uwk34iWQmozTtWZr28QJQmGQqEG6yH+wHazyoTync5B374gAXAAAA//8DANdWNY1ttZr+AAAAAElFTkSuQmCC",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABRSURBVHjaYvT09fvPAAXbNm1kZCAAvPz8UdQz/v//n4Fc4OXn/58J2URyABMDhYAiA0bDYDQMBk8YsMBM2rZpIyN6ViXEZ2BgYAAAAAD//wMANQ45jR1vLVQAAAAASUVORK5CYII=",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABOSURBVHjaYvT09fvPAAXbNm1kZEADXn7+KPLofMb///8zkAu8/Pz/MyGbSA5gYqAQUGTAaBiMhsHgCQMWmEnYsiohPgMDAwMAAAD//wMA0rc9japLUvgAAAAASUVORK5CYII=",
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABISURBVHjaYvT09fvPAAXbNm1k9PLzJ4nP+P8/nE8y8PLz/8+EbCI5gImBQkCRAaNhMBoGgycMWGAmkZOVGRgYGAAAAAD//wMAsG9BjaDPCMcAAAAASUVORK5CYII="];


	$("#images").change(function(evt) {
		if (window.FormData) {
			formdata = new FormData();
		}
		var i = 0,
			len = this.files.length,
			img, reader, file;
		for (; i < len; i++) {
			file = this.files[i];

			if ( !! file.type.match(/image.*/)) {
				if (window.FileReader) {
					reader = new FileReader();

					reader.readAsDataURL(file);
				}
				if (formdata) {
					formdata.append("images[]", file);
				}
			}
		}
		if (formdata) {
			$.ajax({
				url: "server/php/upload.php",
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false
			}).done(function(data) {});
		}
	});

	$('#fileupload').fileupload({
		dataType: 'json',

		add: function(e, data) {
			if (data.autoUpload || (data.autoUpload !== false && ($(this).data('blueimp-fileupload') || $(this).data('fileupload')).options.autoUpload)) {
				var ext = $().checkExtension(data.files[0].name, videoExtensionsAllowed);
				if (ext) {
					$().animateFavicon();
					data.submit();
					$().addVideoContentLoadingSpinner();
					closeTabWithoutWarning = true;
				} else {
					$().displayModal("Uploading error", "Please select a video file.");
				}
			}
		}
	});

	$('#fileupload').bind('fileuploaddone', function(e, data) {
		$.each(data.result.files, function(index, file) {
			var _self = this;
			$.ajax({
				url: 'server/php/test.php',
				type: "POST",
				data: _self
			}).done(function(response) {
				dataAStocker = _self;
				$().updateVideoInformations(response);
			});
		});
	});

	$('#fileupload').bind('fileuploadprogress', function(e, data) {
		var progress = parseInt(data.loaded / data.total * 100, 10);
		$('#progress .bar').css(
			'width', progress + '%'
		);
		$("#progressBarText").text("Downloading your video file : " + progress + " %");
		if (progress == 100) {
			$("#progressBarText").text("Creating thumbnails...");
		}
	});


	window.onbeforeunload = function() {
		if (closeTabWithoutWarning) {
			return "Video uploaded, are you sure?";
		}
	};


	$('#cropItProgressBar,#YourVideoToolbar,#hiddenElements,#cache,#informationModal,#warningJavascriptNotEnabled').hide();


	$('#buttonYourVideo').click(function(event) {
		event.preventDefault();

		if (isCropMenuShown === 0) {
			event.preventDefault();
			$('#YourVideoToolbar').slideDown();
			$('#triangle').toggleClass('up');
			isCropMenuShown = 1;
		} else {
			$('#YourVideoToolbar').slideUp();
			$('#triangle').toggleClass('up');
			isCropMenuShown = 0;
		}
	});

	$('#buttonUpload').click(function(event) {
		event.preventDefault();
		$("#fileupload").trigger("click");
	});

	$('#buttonCropIt').click(function(event) {
		event.preventDefault();
		$("#progressBarText").text("Croping your video, please wait....");
		$('html').timer('start');
		$().sendCrop(crops);
	});

	$('#cache').click(function(event) {
		event.preventDefault();
		$().hideModal();
	});

	$("#addScreenForm").submit(function(event) {
		event.preventDefault();
		$().addScreen();
	});

	$("#autoCropCheckbox").click(function(event) {
		autoCropEnabled = $('#autoCropCheckbox').is(':checked');
		$().rebuildInterface(autoCropEnabled);
	});

	$("#fileupload").change(function(event) {
		event.preventDefault();
		var title = $("#fileupload").val();
		title = title.split(/(\\|\/)/g).pop();
		crops.title = title;
	});

	$("#carouselContainer").on("click", function(event) {
		event.preventDefault();
		$("#videoContent").css({
			"background-image": "url(" + $(event.target).data('big') + ")"
		});
	});

	$("#videoCropListDiv").on("click", ".videoCropListDivElement", function(event) {
		event.preventDefault();
		var id = $(this).attr("id");
		if ($("#cropNumber" + id).hasClass("topLayer") === false) {
			$(".topLayer").removeClass("topLayer");
			$("#cropNumber" + id).addClass("topLayer").effect("highlight", {}, 1000);
		}
	});

	$("#secondMenu").on("click", function(event) {
		event.preventDefault();
		$().createFormatScreen($(event.target).data('width'), $(event.target).data('height'));
	});

	$("#buttonUploadYourPhoto").click(function(event) {
		event.preventDefault();
		$("#images").trigger("click");
	});
	$("#yourPhotoUpload").change(function(event) {
		event.preventDefault();
		$("#btn").submit();
	});


	jQuery.fn.extend({
		updateVideoInformations: function(infos) {

			videoInformations = infos;
			videoInformations.message.filename = videoInformations.message.filename.replaceAll('\'', '');
			videoInformations.message.frameRate = videoInformations.message.frameRate.replaceAll('\'', '');
			videoInformations.message.fileSize = videoInformations.message.fileSize.replaceAll('\'', '');

			// Display HTML content in the interface (thumbnails, informations,...)
			$().displayContent();

			// Enable to user the use of interface
			$().enableUserInterface();
			$().thumbnails();
		},



		//THUMBNAILS CREATION

		thumbnails: function(infos) {


			$.ajax({
				url: 'server/php/test2.php',
				type: "POST",
				data: dataAStocker

			}).done(function(datas) {
				$('html').timer('stop');

				thumnbnailsinfos = datas;
				$().createCarousel();
				$("#progressBarText").text("You can now add screens to crop with video");
				$().defaultFavicon();

			});

		},

		displayContent: function() {
			var img = new Image();
			var bgImgUrl = serverPath + videoInformations.message.thumbnails1;
			var infWidth = videoInformations.message.width;
			var infHeight = videoInformations.message.height;

			// We wait for the image to load, and only after we act
			$(img).attr('src', bgImgUrl).load(function() {
				$("#videoContent").animate({
					width: infWidth
				}, 1000, "easeInCirc", function() {
					$("#videoContentCache").empty();
					$("#videoContent").css({
						"background-image": "url(" + bgImgUrl + ")"
					});
					$("#videoContentCache").fadeOut();
				});
				$("#videoContent").animate({
					height: infHeight
				}, 1000, "easeOutCirc");
			});

			$().updateInterface();
		},


		updateInterface: function() {
			$("#videoInformationsTitle").text(videoInformations.message.filename);
			$("#videoInformationsWidth").text(videoInformations.message.width);
			$("#videoInformationsHeight").text(videoInformations.message.height);
			$("#videoInformationsSize").text(videoInformations.message.fileSize);
			$("#videoInformationsFPS").text(videoInformations.message.frameRate);
		},

		//
		// Enable user interface
		//
		// $().enableUserInterface()

		enableUserInterface: function() {

			$(".disabled").removeClass("disabled");
		},



		//
		// Disable user interface
		//
		// $().disableUserInterface()

		disableUserInterface: function() {
			$(".button inside dark large disabled", ".button end dark large disabled").addClass("disabled");

			if (isCropMenuShown === 1) {
				$('#YourVideoToolbar').slideUp();
				$('#triangle').toggleClass('up');
				isCropMenuShown = 0;
			}

		},

		createCarousel: function() {

			$("#mini1,#mini2,#mini3").attr('width', thumnbnailsinfos.message.miniwidth);
			$("#mini1,#mini2,#mini3").attr('height', thumnbnailsinfos.message.miniheight);

			$("#mini1").attr('src', "server/php/" + thumnbnailsinfos.message.mini1);

			$("#mini1").attr('data-big', serverPath + thumnbnailsinfos.message.thumbnails1);

			$("#mini2").attr('src', "server/php/" + thumnbnailsinfos.message.mini2);

			$("#mini2").attr('data-big', serverPath + thumnbnailsinfos.message.thumbnails2);

			$("#mini3").attr('src', "server/php/" + thumnbnailsinfos.message.mini3);

			$("#mini3").attr('data-big', serverPath + thumnbnailsinfos.message.thumbnails3);

			$(function() {
				$(".thumbnailsCarousel").jCarouselLite({
					btnNext: ".next",
					btnPrev: ".prev"
				});
			});
		},



		//
		// SEND CROP
		//
		// $().sendCrop( infos )


		sendCrop: function(jsondata) {
			// console.log(jsondata);
			$("#buttonCropIt").hide();
			$("#cropItProgressBar").fadeIn();

			var jsoninfo = jsondata;
			$.ajax({
				url: 'server/php/crop.php',
				type: "POST",
				data: {
					json: jsoninfo
				}

			}).done(function(datas) {

				$("#progressBarText").text("Your videos are ready to download");
				$('#buttonDownloadIt').attr("href", "server/php/download.php?filename=" + datas);
				$('#buttonDownloadItInput').removeClass("disabled");
				$("#buttonYourVideo,#buttonDownloadItInput").effect("highlight", {}, 1000);
				$("#cropItProgressBar").hide();
				$("#buttonCropIt").fadeIn();
				$('html').timer('stop');
				$().defaultFavicon();
			});
		},

		addToolbarInfos: function(id) {
			// console.log(id);
			if (!crops.list[id]) {
				return false;
			}

			var content = "";
			var width = crops.list[id].width;
			var height = crops.list[id].height;
			var marginTop = crops.list[id].marginTop;
			var marginLeft = crops.list[id].marginLeft;
			content = $("#videoCropListDivElementModel").clone();
			content.attr("id", "videoCropListDivElement"+id);
			content.find("#cropSelection2 p").text(id +" .");
			content.find("#inputWidthid").attr("id", "inputWidth" + id);
			content.find("#inputWidth" + id).attr("placeholder", "W : " + width);
			content.find("#inputHeightid").attr("id", "inputHeight" + id);
			content.find("#inputHeight" + id).attr("placeholder", "H : " + height);
			content.find("#inputTopid").attr("id", "inputTop" + id);
			content.find("#inputTop" + id).attr("placeholder", "T : " + marginTop);
			content.find("#inputLeftid").attr("id", "inputLeft" + id);
			content.find("#inputLeft" + id).attr("placeholder", "L : " + marginLeft);
			content.find("#cropSelectionid__rectangle").attr("id", "rectangle" + id);


			// Add to UI
			$("#videoCropListDiv").append(content);
			// Add rectangle color
			$("#rectangle" + id).css({
				"background-color": 'rgba(' + crops.list[id].color[0] + ',' + crops.list[id].color[1] + ',' + crops.list[id].color[2] + ',' + crops.list[id].color[3] + ')'
			});
		},

		updateSize: function(id, width, height) {
			crops.list[id].width = width;
			crops.list[id].height = height;
			$('#inputWidth' + id).attr("placeholder", "W : " + crops.list[id].width);
			$('#inputHeight' + id).attr("placeholder", "H : " + crops.list[id].height);
		},

		updatePos: function(id, top, left) {
			crops.list[id].marginTop = calculPosTop;
			crops.list[id].marginLeft = calculPosLeft;
			$('#inputTop' + id).attr("placeholder", "T : " + crops.list[id].marginTop);
			$('#inputLeft' + id).attr("placeholder", "L : " + crops.list[id].marginLeft);
		},
		//
		// UPDATE SLAVES SIZE
		//
		// $().updateSlavesInformations()

		updateSlavesInformations: function() {
			var videoContentWidth = parseInt($('#videoContent').width(), 10);
			var videoContentHeight = parseInt($('#videoContent').height(), 10);
			var width = parseInt($("#cropNumber4").width(), 10);
			var height = parseInt($("#cropNumber4").height(), 10);
			var marginFromLeft = parseInt($("#cropNumber4").position().left, 10);
			var marginFromTop = parseInt($("#cropNumber4").position().top, 10);
			var longLeft = marginFromLeft + width;
			var longTop = marginFromTop + height;
			var rightSquareWidth = (videoContentWidth - longLeft);
			var underHeight = (videoContentHeight - longTop);

			$().updateSlaveInformations(0, marginFromLeft, marginFromTop, 0, 0);
			$().updateSlaveInformations(1, width, marginFromTop, 0, marginFromLeft);
			$().updateSlaveInformations(2, rightSquareWidth, marginFromTop, 0, longLeft);
			$().updateSlaveInformations(3, marginFromLeft, height, marginFromTop, 0);
			$().updateSlaveInformations(4, width, height, marginFromTop, marginFromLeft); // 4 is MASTER
			$().updateSlaveInformations(5, rightSquareWidth, height, marginFromTop, longLeft);
			$().updateSlaveInformations(6, marginFromLeft, underHeight, longTop, 0);
			$().updateSlaveInformations(7, width, underHeight, longTop, marginFromLeft);
			$().updateSlaveInformations(8, rightSquareWidth, underHeight, longTop, longLeft);
		},

		updateSlaveInformations: function(id, width, height, top, left) {
			crops.list[id].width = width;
			crops.list[id].height = height;
			crops.list[id].marginTop = top;
			crops.list[id].marginLeft = left;
			$('#inputWidth' + id).attr("placeholder", "W : " + crops.list[id].width);
			$('#inputHeight' + id).attr("placeholder", "H : " + crops.list[id].height);
			$('#inputTop' + id).attr("placeholder", "T : " + crops.list[id].marginTop);
			$('#inputLeft' + id).attr("placeholder", "L : " + crops.list[id].marginLeft);
			$("#cropNumber" + id).css({
				width: crops.list[id].width,
				height: crops.list[id].height,
				top: crops.list[id].marginTop,
				left: crops.list[id].marginLeft
			});
		},

		addScreen: function() {
			videoContentWidth = parseInt($('#videoContent').width(), 10);
			videoContentHeight = parseInt($('#videoContent').height(), 10);
			var width = parseInt($('#navInputTextWidth').val(), 10);
			var height = parseInt($('#navInputTextHeight').val(), 10);

			// Resetting colors to default, in case of inputs being red
			$('#navInputTextWidth').css({
				"background-color": '#FFF',
				"color": '#000'
			});
			$('#navInputTextHeight').css({
				"background-color": '#FFF',
				"color": '#000'
			});

			// Control to show user he forget to input something
			if (isNaN(width) === true) {
				$('#navInputTextWidth').css({
					"background-color": 'rgba(255,0,0,.5)',
					"color": '#FFF'
				});
			}
			if (isNaN(height) === true) {
				$('#navInputTextHeight').css({
					"background-color": 'rgba(255,0,0,.5)',
					"color": '#FFF'
				});
			}

			// Cancellers
			if (isNaN(width) === true) {
				return false;
			}
			if (isNaN(height) === true) {
				return false;
			}
			if (width > videoContentWidth) {
				return false;
			}
			if (height > videoContentHeight) {
				return false;
			}

			// If all is good
			$().createAdlibitumScreen();
		},

		//
		// CREATE ADD LIBITUM SCREEN
		//
		// $().createAdlibitumScreen( parameter )

		createAdlibitumScreen: function() {
			if ($("#buttonCropIt").hasClass("disabled") === true) {
				$("#buttonCropIt").removeClass("disabled");
			}

			var id = crops.list.length;

			videoContentWidth = parseInt($('#videoContent').width(), 10);
			videoContentHeight = parseInt($('#videoContent').height(), 10);
			var width = parseInt($('#navInputTextWidth').val(), 10);
			var height = parseInt($('#navInputTextHeight').val(), 10);

			crops.list.push({
				screenId: crops.list.length,
				width: width,
				height: height,
				marginLeft: "0",
				marginTop: "0",
				color: [
				Math.ceil((Math.random() * 255)),
				Math.ceil((Math.random() * 255)),
				Math.ceil((Math.random() * 255)),
				0.5]
			});


			$().addCropLayerToUI(id);
		},

		createFormatScreen: function(ratioW, ratioH) {


			if ($("#buttonCropIt").hasClass("disabled") === true) {
				$("#buttonCropIt").removeClass("disabled");
			}

			ratioW = parseFloat(ratioW);
			ratioH = parseFloat(ratioH);

			var id = crops.list.length;
			var videoContentWidth = parseInt($('#videoContent').width(), 10);
			var videoContentHeight = parseInt($('#videoContent').height(), 10);
			var unit = "";
			var width = "";
			var height = "";

			if (videoContentWidth > videoContentHeight) {
				unit = (videoContentHeight / 2);
			} else {
				unit = (videoContentWidth / 2);
			}

			unit = unit / 2;
			height = parseInt(unit, 10);
			width = parseInt(unit * ratioW, 10);

			crops.list.push({
				screenId: crops.list.length,
				width: width,
				height: height,
				marginLeft: "0",
				marginTop: "0",
				color: [
				Math.ceil((Math.random() * 255)),
				Math.ceil((Math.random() * 255)),
				Math.ceil((Math.random() * 255)),
				0.5]
			});

			$().addCropLayerToUI(id);
		},



		createAutoCropScreens: function(ratioW, ratioH) {
			if ($("#buttonCropIt").hasClass("disabled") === true) {
				$("#buttonCropIt").removeClass("disabled");
			}

			ratioW = parseFloat(ratioW);
			ratioH = parseFloat(ratioH);

			var id = 0;
			var videoContentWidth = parseInt($('#videoContent').width(), 10);
			var videoContentHeight = parseInt($('#videoContent').height(), 10);
			var unit = "";
			var width = "";
			var height = "";
			var colorArray = [];

			if (videoContentWidth > videoContentHeight) {
				unit = (videoContentHeight);
			} else {
				unit = (videoContentWidth);
			}

			unit = unit / 2;
			height = parseInt(unit, 10);
			width = parseInt(unit * ratioW, 10);
			var marginFromLeft = ((videoContentWidth / 2) - (width / 2));
			var marginFromTop = ((videoContentHeight / 2) - (height / 2));
			var longLeft = marginFromLeft + width;
			var longTop = marginFromTop + height;
			var rightSquareWidth = (videoContentWidth - longLeft);
			var underHeight = (videoContentHeight - longTop);

			/* Number 0 */
			/* Position 00 */
			crops.list.push({
				screenId: crops.list.length,
				width: marginFromLeft,
				height: marginFromTop,
				marginLeft: 0,
				marginTop: 0,
				color: [
				Math.ceil(192),
				Math.ceil(255),
				Math.ceil(255),
				0.5]
			});
			$().addCropSlaveLayerToUI(crops.list.length - 1);

			/* Number 1 */
			/* Position 01 */
			crops.list.push({
				screenId: crops.list.length,
				width: width,
				height: marginFromTop,
				marginLeft: marginFromLeft,
				marginTop: 0,
				color: [
				Math.ceil(128),
				Math.ceil(255),
				Math.ceil(255),
				0.5]
			});
			$().addCropSlaveLayerToUI(crops.list.length - 1);

			/* Number 2 */
			/* Position 02 */
			crops.list.push({
				screenId: crops.list.length,
				width: rightSquareWidth,
				height: underHeight,
				marginLeft: longLeft,
				marginTop: 0,
				color: [
				Math.ceil(192),
				Math.ceil(255),
				Math.ceil(255),
				0.5]
			});
			$().addCropSlaveLayerToUI(crops.list.length - 1);

			/* Number 3 */
			/* Position 10 */
			crops.list.push({
				screenId: crops.list.length,
				width: marginFromLeft,
				height: height,
				marginLeft: 0,
				marginTop: marginFromTop,
				color: [
				Math.ceil(128),
				Math.ceil(255),
				Math.ceil(255),
				0.5]
			});
			$().addCropSlaveLayerToUI(crops.list.length - 1);

			/* Number 4 MASTER */
			/* Position 11 */
			crops.list.push({
				screenId: crops.list.length,
				width: width,
				height: height,
				marginLeft: marginFromLeft,
				marginTop: marginFromTop,
				color: [
				Math.ceil(255),
				Math.ceil(128),
				Math.ceil(192),
				0.5]
			});
			$().addCropMasterLayerToUI(crops.list.length - 1);

			/* Number 5 */
			/* Position 12 */
			crops.list.push({
				screenId: crops.list.length,
				width: rightSquareWidth,
				height: height,
				marginLeft: longLeft,
				marginTop: marginFromTop,
				color: [
				Math.ceil(128),
				Math.ceil(255),
				Math.ceil(255),
				0.5]
			});
			$().addCropSlaveLayerToUI(crops.list.length - 1);

			/* Number 6 */
			/* Position 20 */
			crops.list.push({
				screenId: crops.list.length,
				width: marginFromLeft,
				height: marginFromTop,
				marginLeft: 0,
				marginTop: longTop,
				color: [
				Math.ceil(192),
				Math.ceil(255),
				Math.ceil(255),
				0.5]
			});
			$().addCropSlaveLayerToUI(crops.list.length - 1);

			/* Number 7 */
			/* Position 21 */
			crops.list.push({
				screenId: crops.list.length,
				width: width,
				height: marginFromTop,
				marginLeft: marginFromLeft,
				marginTop: longTop,
				color: [
				Math.ceil(128),
				Math.ceil(255),
				Math.ceil(255),
				0.5]
			});
			$().addCropSlaveLayerToUI(crops.list.length - 1);

			/* Number 8 */
			/* Position 22 */
			crops.list.push({
				screenId: crops.list.length,
				width: rightSquareWidth,
				height: underHeight,
				marginLeft: longLeft,
				marginTop: longTop,
				color: [
				Math.ceil(192),
				Math.ceil(255),
				Math.ceil(255),
				0.5]
			});
			$().addCropSlaveLayerToUI(crops.list.length - 1);
		},

		//
		// ADD CROP LAYER TO UI
		//
		// $().addCropLayerToUI( id )

		addCropLayerToUI: function(id) {

			$('#videoContent').append('<div class="cropLayer" id="cropNumber' + id + '"></div>');
			$('#cropNumber' + id).css({
				'position': 'absolute',
				"background-color": 'rgba(' + crops.list[id].color[0] + ',' + crops.list[id].color[1] + ',' + crops.list[id].color[2] + ',' + crops.list[id].color[3] + ')',
				'top': crops.list[id].marginTop + "px",
				'left': crops.list[id].marginLeft + "px",
				'width': crops.list[id].width + "px",
				'height': crops.list[id].height + "px"
			});

			// Draggable, resizable
			$('#cropNumber' + id)
				.resizable({
				resize: function(event, ui) {
					var width = $('#cropNumber' + id).width();
					var height = $('#cropNumber' + id).height();

					// Function update
					$().updateSize(id, width, height);
				},
				containment: $("#videoContent")
			}) // End resizable
			.draggable({ //make it "draggable" and "resizable"
				drag: function(event, ui) { // What happen when dragged
					cropNumberOffsetTop = parseInt($('#cropNumber' + id).offset().top, 10);
					cropNumberOffsetLeft = parseInt($('#cropNumber' + id).offset().left, 10);

					videoContentOffsetTop = parseInt($('#videoContent').offset().top, 10);
					videoContentOffsetLeft = parseInt($('#videoContent').offset().left, 10);

					calculPosTop = cropNumberOffsetTop - videoContentOffsetTop;
					calculPosLeft = cropNumberOffsetLeft - videoContentOffsetLeft;

					// Function update
					$().updatePos(id, calculPosTop, calculPosLeft);
				},
				containment: $("#videoContent")
			}); // End draggable

			$().addToolbarInfos(id);
		},

		//
		// ADD CROP LAYER TO UI
		//
		// $().addCropSlaveLayerToUI( id )

		addCropSlaveLayerToUI: function(id) {

			$('#videoContent').append('<div class="cropLayer" id="cropNumber' + id + '"></div>');
			$('#cropNumber' + id).css({
				'position': 'absolute',
				"background-color": 'rgba(' + crops.list[id].color[0] + ',' + crops.list[id].color[1] + ',' + crops.list[id].color[2] + ',' + crops.list[id].color[3] + ')',
				'top': crops.list[id].marginTop + "px",
				'left': crops.list[id].marginLeft + "px",
				'width': crops.list[id].width + "px",
				'height': crops.list[id].height + "px"
			});
			$().addToolbarInfos(id);
		},

		//
		// ADD CROP MASTER LAYER TO UI
		//
		// $().addCropMasterLayerToUI( id )

		addCropMasterLayerToUI: function(id) {

			$('#videoContent').append('<div class="cropLayer" id="cropNumber' + id + '"></div>');
			$('#cropNumber' + id).css({
				'position': 'absolute',
				"background-color": 'rgba(' + crops.list[id].color[0] + ',' + crops.list[id].color[1] + ',' + crops.list[id].color[2] + ',' + crops.list[id].color[3] + ')',
				'top': crops.list[id].marginTop + "px",
				'left': crops.list[id].marginLeft + "px",
				'width': crops.list[id].width + "px",
				'height': crops.list[id].height + "px"
			});

			// Draggable, resizable
			$('#cropNumber' + id)
				.resizable({
				resize: function(event, ui) {
					$().updateSlavesInformations();
				},
				containment: $("#videoContent")
			}) // End resizable
			.draggable({ //make it "draggable" and "resizable"
				drag: function(event, ui) { // What happen when dragged
					$().updateSlavesInformations();
				},
				containment: $("#videoContent")
			}); // End draggable

			$().addToolbarInfos(id);
		},



		//
		// CHECK FOR EXTENSIONS
		//
		// $().checkExtension( target, arrayOfReferences )

		checkExtension: function(target, arrayOfReferences) {

			target = target.split('.').pop();
			var control = false;
			for (var i = 0; i < arrayOfReferences.length; i++) {
				if (target === arrayOfReferences[i]) {
					control = true;
				}
			}
			return control;
		},

		addVideoContentLoadingSpinner: function() {
			// To conserve?
			$('#videoContentCache').fadeIn().append('<div id="videoContentBackground"></div>');
			$('#videoContentBackground').empty('').append('<div class="spinner large" role="progressbar"></div>');
		},


		displayModal: function(title, text) {
			var titleId = "informationModalContentTitle";
			var textId = "informationModalContentText";

			$("#" + titleId).empty().append(title);
			$("#" + textId).empty().append(text);
			$('#cache').fadeIn();
			$('#informationModal').slideDown();
		},

		hideModal: function() {
			$('#informationModal').slideUp();
			$('#cache').fadeOut();
		},

		defaultFavicon: function() {
			$('#favicon').remove();
			var icon = document.createElement('link');
			icon.type = 'image/png';
			icon.rel = 'icon';
			icon.id = 'favicon';
			icon.href = "data:image/png;base64,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";
			$('head').append(icon);
		},

		changeFavicon: function(newPath) {

			$('#favicon').remove();
			var icon = document.createElement('link');
			icon.type = 'image/png';
			icon.rel = 'icon';
			icon.id = 'favicon';
			icon.href = newPath;
			$('head').append(icon);
			$("#favicon").attr("href", newPath);
		},

		animateFavicon: function() {
			var i = 0;
			$('html').timer({
				delay: 400,
				repeat: true,
				callback: function(index) {
					$().changeFavicon(faviconAnimated[i]);
					i++;
					if (i == 15) {
						i = 0;
					}
				}
			});
		},

		rebuildInterface: function(bool) {
			if (typeof(bool) != "boolean") {
				return false;
			}

			// Reset all crops
			crops.list = [];
			// Reset interface 
			$("#videoCropListDiv").empty();
			$("#videoContent").empty();

			// Activate or desactivate Add Screen function
			if (bool === true) {
				$("#navInputTextWidth,#navInputTextHeight,#buttonAddScreen").addClass("disabled");
				$().createAutoCropScreens(1, 1);
			}
			if (bool === false) {
				$("#navInputTextWidth,#navInputTextHeight,#buttonAddScreen").removeClass("disabled");
			}
		}
	});
	// jQuery end
});



String.prototype.replaceAll = function(token, newToken, ignoreCase) {
	var _token;
	var str = this + "";
	var i = -1;

	if (typeof token === "string")

	if (ignoreCase) {

		_token = token.toLowerCase();

		while ((
		i = str.toLowerCase().indexOf(
		token, i >= 0 ? i + newToken.length : 0)) !== -1) {
			str = str.substring(0, i) + newToken + str.substring(i + token.length);
		}

	} else {
		return this.split(token).join(newToken);
	}
	return str;
};