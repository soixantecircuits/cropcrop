jQuery(function($){
	// "use strict";

	/*****************/
	/*               */
	/*  upload part  */
	/*               */
	/*****************/

	$(function () {
		var input = document.getElementById("images"), 
			formdata = false;

		function showUploadedItem (source) {
	  		var list = document.getElementById("image-list"),
		  		li   = document.createElement("li"),
		  		img  = document.createElement("img");
	  		img.src = source;
	  		li.appendChild(img);
			list.appendChild(li);
		}   

		if (window.FormData) {
	  		formdata = new FormData();
	  		document.getElementById("btn").style.display = "none";
		}
		
	 	input.addEventListener("change", function (evt) {
	 		document.getElementById("response").innerHTML = "Uploading . . ."
	 		var i = 0, len = this.files.length, img, reader, file;
		
			for ( ; i < len; i++ ) {
				file = this.files[i];
		
				if (!!file.type.match(/image.*/)) {
					if ( window.FileReader ) {
						reader = new FileReader();
						reader.onloadend = function (e) { 
							showUploadedItem(e.target.result, file.fileName);
						};
						reader.readAsDataURL(file);
					}
					if (formdata) {
						formdata.append("images[]", file);
					}
				}	
			}
		
			if (formdata) {
				$.ajax({
					url: "./server/php/upload.php",
					type: "POST",
					data: formdata,
					processData: false,
					contentType: false,
				}).done(function ( data ) {
					if( console && console.log ) {
					}
				});
			}
		}, false);
	});



/***********************/
/*                     */
/*     file upload     */
/*                     */
/***********************/

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
			$.each(data.result.files, function (index, file) {
				var _self=this;
					$.ajax({
					url: './server/php/test.php',
					type: "POST",
					data : _self,
				
				}).done(function ( response ) {
					dataAStocker = _self;
					$().updateVideoInformations( response );
				});
			})
		});
			// script when subimitted file ! 
		$('#fileupload').bind('fileuploadsubmit', function (e, data) { 
			
			var ext = data.files[0].name.split('.').pop();
				if(ext != (('mp4') || ('avi') || ('mpg') || ('mpeg')) )  {
				alert("not good extension");
			}
		});
		$('#fileupload').bind('fileuploadprogress', function (e, data) {
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#progress .bar').css(
				'width', progress + '%'
			);
			$("#progressBarText").text("Downloading your video file : "+progress+" %");
  		});
	});

/**********************/
/**********************/

	hook = false;

	window.onbeforeunload = function() {
		if (hook) {
			return "Video uploaded, are you sure?"
		}
	}
/**********************/
/**********************/





	var serverPath         = "server/php/";
	var screensCropList    = [];
	var screensCropCount   = 0; // Use to be an ID
	var videoInformations  = {};
	var crops              = {};
	var dataAStocker       = "";
	crops.title = "None";
	crops.list = [];

	videoExtensionsAllowed = [
		'mpg',
		'avi',
		'mp4'
	];
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
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABISURBVHjaYvT09fvPAAXbNm1k9PLzJ4nP+P8/nE8y8PLz/8+EbCI5gImBQkCRAaNhMBoGgycMWGAmkZOVGRgYGAAAAAD//wMAsG9BjaDPCMcAAAAASUVORK5CYII=",
		];




	/***********************************************/
	/*                                             */
	/*                                             */
	/*                  INTERFACE                  */
	/*                                             */
	/*                                             */
	/***********************************************/

	    /*******************/
	   /*                 */
	  /*  Hide elements  */
	 /*                 */
	/*******************/
	$('#cropItProgressBar').hide();
	$('#YourVideoToolbar').hide();
	$('#hiddenElements').hide();
	$('#cache').hide();
	$('#informationModal').hide();
	$('#warningJavascriptNotEnabled').hide();

	/* Tool box */
	var isShown = 0;
	$('#buttonYourVideo').click(function(event){
		event.preventDefault();

		if (isShown === 0) {
			event.preventDefault();
			$('#YourVideoToolbar').slideDown();
			$('#triangle').toggleClass('up');
			isShown = 1;
		}else{
			$('#YourVideoToolbar').slideUp();
			$('#triangle').toggleClass('up');
			isShown = 0;
		};
	});

	$('#buttonUpload').click(function(event){
		event.preventDefault();
		$("#fileupload").trigger("click")
	});

	$('#buttonCropIt').click(function(event){
		event.preventDefault();
		$("#progressBarText").text("Croping your video, please wait....");
		$('html').timer('start');
		$().sendCrop( crops );
	});

	$('#cache').click(function(event){
		event.preventDefault();
		$('#cache').fadeOut();
		$('#informationModal').fadeOut();
	});

	$("#addScreenForm").submit(function(event){
		event.preventDefault();
		$().addScreen();
	});

	// When upload start
	$("#fileupload").change(function(event){
		event.preventDefault();
		var title = $("#fileupload").val();
		title = title.split(/(\\|\/)/g).pop();
		crops.title = title;
	});

	    /********************************/
	   /*                              */
	  /*  Mini thumbnails management  */
	 /*                              */
	/********************************/

	$("#carouselContainer").on("click", "#mini1", function(event){
		event.preventDefault();
		$("#videoContent").css({
			"background-image": "url(" + serverPath + thumnbnailsinfos.message.thumbnails1 + ")",
		});
	});
	$("#carouselContainer").on("click", "#mini2", function(event){
		event.preventDefault();
		$("#videoContent").css({
			"background-image": "url(" + serverPath + thumnbnailsinfos.message.thumbnails2 + ")",
		});
	});
	$("#carouselContainer").on("click", "#mini3", function(event){
		event.preventDefault();
		$("#videoContent").css({
			"background-image": "url(" + serverPath + thumnbnailsinfos.message.thumbnails3 + ")",
		});
	});

	    /***********************/
	   /*                     */
	  /*  Select crop layer  */
	 /*                     */
	/***********************/
	$("#videoCropListDiv").on("click", ".videoCropListDivElement",function(event){
		event.preventDefault();
		var id = $(this).attr("id");
		if ( $("#cropNumber" + id).hasClass("topLayer") === false ){
			$(".topLayer").removeClass("topLayer")
			$("#cropNumber" + id).addClass("topLayer");
			$("#cropNumber" + id).effect("highlight", {}, 1000);
		}
	});

	    /***************************/
	   /*                         */
	  /*  Video format function  */
	 /*                         */
	/***************************/
	$("#secondMenu").on("click", "#buttonFormat1_1", function(event){
		event.preventDefault();
		$().createFormatScreen( 1, 1 );
	});
	$("#secondMenu").on("click", "#buttonFormat3_2", function(event){
		event.preventDefault();
		$().createFormatScreen( 1.5, 1 );
	});
	$("#secondMenu").on("click", "#buttonFormat4_3", function(event){
		event.preventDefault();
		$().createFormatScreen( 1.33, 1 );
	});
	$("#secondMenu").on("click", "#buttonFormat16_9", function(event){
		event.preventDefault();
		$().createFormatScreen( 1.77, 1 );
	});
	$("#secondMenu").on("click", "#buttonFormat5_3", function(event){
		event.preventDefault();
		$().createFormatScreen( 1.66, 1 );
	});
	$("#secondMenu").on("click", "#buttonFormat16_10", function(event){
		event.preventDefault();
		$().createFormatScreen( 1.618, 1 );
	});

	    /*******************************/
	   /*                             */
	  /*  User can upload his photo  */
	 /*                             */
	/*******************************/
	$("#buttonUploadYourPhoto").click(function(event){
		event.preventDefault();
		$("#images").trigger("click");
	});
	$("#yourPhotoUpload").change(function(event){
		event.preventDefault();
		$("#btn").submit();
	});


	/***********************************************/
	/*                                             */
	/*                                             */
	/*              CUSTOM FUNCTIONS               */
	/*                                             */
	/*                                             */
	/***********************************************/

	//
	// UPDATE VIDEO INFORMATIONS
	//
	// $().updateVideoInformations( infos )
	jQuery.fn.extend({
		updateVideoInformations: function ( infos ) {
			
			

			videoInformations                   = infos;
			videoInformations.message.filename  = videoInformations.message.filename.replaceAll('\'','');
			videoInformations.message.frameRate = videoInformations.message.frameRate.replaceAll('\'','');
			videoInformations.message.fileSize  = videoInformations.message.fileSize.replaceAll('\'','');

			// Display HTML content in the interface (thumbnails, informations,...)
			$().displayContent();

			// Enable to user the use of interface
			$().enableUserInterface();

			$("#progressBarText").text("Creating thumbnails...");
			$().thumbnails();
			// Update Carousel
			//$().createCarousel();
		}
	});




	//THUMBNAILS CREATION
	jQuery.fn.extend({
		thumbnails: function ( infos ) {			


				$.ajax({
				  url: './server/php/test2.php',
				  type: "POST",
				data : dataAStocker,
				
				}).done(function ( datas ) {
					$('html').timer('stop');

				  	thumnbnailsinfos = datas;
					$().createCarousel();
					$("#progressBarText").text("You can now add screens to crop with video");
					$().defaultFavicon();

				});

		}
	});


	//
	// Enable user interface
	//
	// $().displayContent()
	jQuery.fn.extend({
		displayContent: function () {
			var img                 = new Image();
			var bgImgUrl            = serverPath + videoInformations.message.thumbnails1;
			var infWidth            = videoInformations.message.width;
			var infHeight           = videoInformations.message.height;

			// We wait for the image to load, and only after we act
			$(img).attr('src', bgImgUrl).load(function() {
				$("#videoContent").animate({width: infWidth }, 1000, "easeInCirc", function(){
					$("#videoContentCache").empty();
					$("#videoContent").css({
						"background-image": "url(" + bgImgUrl + ")",
					});
					$("#videoContentCache").fadeOut();
				});
				$("#videoContent").animate({height: infHeight}, 1000, "easeOutCirc");
			});

			// Update infos content
			$("#videoInformationsTitle").text( videoInformations.message.filename );
			$("#videoInformationsWidth").text( videoInformations.message.width );
			$("#videoInformationsHeight").text( videoInformations.message.height );
			$("#videoInformationsSize").text( videoInformations.message.fileSize );
			$("#videoInformationsFPS").text( videoInformations.message.frameRate );
		}
	});


	//
	// Enable user interface
	//
	// $().enableUserInterface()
	jQuery.fn.extend({
		enableUserInterface: function () {
			$("#navInputTextWidth").removeClass("disabled");
			$("#navInputTextHeight").removeClass("disabled");
			$("#buttonAddScreen").removeClass("disabled");
			$("#autoCropCheckbox").removeClass("disabled");
			$("#buttonYourVideo").removeClass("disabled");
			$("#carouselPrev").removeClass("disabled");
			$("#carouselNext").removeClass("disabled");

			// Toolbar 2
			$("#buttonUploadYourPhoto").removeClass("disabled");
			$("#buttonFormat1_1").removeClass("disabled");
			$("#buttonFormat3_2").removeClass("disabled");
			$("#buttonFormat4_3").removeClass("disabled");
			$("#buttonFormat16_9").removeClass("disabled");
			$("#buttonFormat5_3").removeClass("disabled");
			$("#buttonFormat16_10").removeClass("disabled");
		}
	});


	//
	// Disable user interface
	//
	// $().disableUserInterface()
	jQuery.fn.extend({
		disableUserInterface: function () {
			$("#navInputTextWidth").addClass("disabled");
			$("#navInputTextHeight").addClass("disabled");
			$("#buttonAddScreen").addClass("disabled");
			$("#buttonCropIt").addClass("disabled");
			$("#autoCropCheckbox").addClass("disabled");
			$("#buttonYourVideo").addClass("disabled");
			$("#carouselPrev").addClass("disabled");
			$("#carouselNext").addClass("disabled");

			if (isShown === 1) {
				$('#YourVideoToolbar').slideUp();
				$('#triangle').toggleClass('up');
				isShown = 0;
			};

			// Toolbar 2
			$("#buttonUploadYourPhoto").addClass("disabled");
			$("#buttonFormat1:1").addClass("disabled");
			$("#buttonFormat4:3").addClass("disabled");
			$("#buttonFormat16:9").addClass("disabled");
			$("#buttonFormat16:10").addClass("disabled");
		}
	});


	//
	// createCarousel
	//
	// $().createCarousel()
	jQuery.fn.extend({
		createCarousel: function () {
			$("#carouselContainer").empty();

			carouselContent = "";
			carouselContent += '<li><img id="mini1" src="server/php/' + thumnbnailsinfos.message.mini1 + '" alt="" width="' + thumnbnailsinfos.message.miniwidth + '" height="' + thumnbnailsinfos.message.miniheight + '" ></li>';
			carouselContent += '<li><img id="mini2" src="server/php/' + thumnbnailsinfos.message.mini2 + '" alt="" width="' + thumnbnailsinfos.message.miniwidth + '" height="' + thumnbnailsinfos.message.miniheight + '" ></li>';
			carouselContent += '<li><img id="mini3" src="server/php/' + thumnbnailsinfos.message.mini3 + '" alt="" width="' + thumnbnailsinfos.message.miniwidth + '" height="' + thumnbnailsinfos.message.miniheight + '" ></li>';

			$("#carouselContainer").append(carouselContent);

			$(function() {
			    $(".thumbnailsCarousel").jCarouselLite({
			        btnNext: ".next",
			        btnPrev: ".prev"
			    });
			});
		}
	});


	//
	// SEND CROP
	//
	// $().sendCrop( infos )
	jQuery.fn.extend({

		sendCrop: function ( jsondata ) {
			// console.log(jsondata);
			$("#buttonCropIt").hide();
			$("#cropItProgressBar").fadeIn();



				var jsoninfo = jsondata;
				$.ajax({
				  url: './server/php/crop.php',
				  type: "POST",
				data: { json: jsoninfo },
				
				}).done(function ( datas ) {

					$("#progressBarText").text("Your videos are ready to download");
				  	$('#buttonDownloadIt').attr("href","server/php/download.php?filename="+datas);
					$('#buttonDownloadItInput').removeClass("disabled");
					$("#buttonYourVideo").effect("highlight", {}, 1000);
					$("#buttonDownloadItInput").effect("highlight", {}, 1000);
					$("#cropItProgressBar").hide();
					$("#buttonCropIt").fadeIn();
					$('html').timer('stop');
					$().defaultFavicon();
				});
		}
	});



	//
	// addToolbarInfos
	//
	// $().addToolbarInfos( id )
	jQuery.fn.extend({
		addToolbarInfos: function ( id ) {
			//console.log("   "+crops.list[id]);
			if (!crops.list[id]) {
				return false;
			};

			var content = "";
			var width = crops.list[id].width;
			var height = crops.list[id].height;
			var marginTop = crops.list[id].marginTop;
			var marginLeft = crops.list[id].marginLeft;


			content += '<div class="videoCropListDivElement" id="' + id + '">';
				content += '<div id="cropSelection2" class="videoCropListDivElementContent">';
					content += '<p>' + id + ' . </p>';
				content += '</div>';
				content += '<div id="cropSelection' + id + '__rectangle" class="rectangle videoCropListDivElementContent"></div>';
				content += '<div class="videoCropListDivElementContent inputContainer">';
					content += '<input type="text" id="inputWidth' + id + '" placeholder="W : ' + width + '" />';
					content += '<input type="text" id="inputHeight' + id + '" placeholder="H : ' + height + '" />';
				content += '</div>';
				content += '<div class="videoCropListDivElementContent inputContainer">';
					content += '<input type="text" id="inputTop' + id + '" placeholder="T : ' + marginTop + '" />';
					content += '<input type="text" id="inputLeft' + id + '" placeholder="L : ' + marginLeft + '" />';
				content += '</div>';
			content += '</div>';

			// Add to UI
			$("#videoCropListDiv").append(content);
			// Add rectangle color
			$('#cropSelection' + id + '__rectangle').css({
				"background-color"   : 'rgba(' + crops.list[id].color[0] + ',' + crops.list[id].color[1] + ',' + crops.list[id].color[2] + ',' + crops.list[id].color[3] + ')',
			});
		}
	});


	//
	// UPDATE SIZE
	//
	// $().updateSize( id, width, height )
	jQuery.fn.extend({
		updateSize: function ( id, width, height ) {
			crops.list[id].width      = width;
			crops.list[id].height     = height;
			$('#inputWidth' + id).attr("placeholder", "W : " + crops.list[id].width);
			$('#inputHeight' + id).attr("placeholder", "H : " + crops.list[id].height);
		}
	});

	//
	// UPDATE POS
	//
	// $().updatePos( id, top, left )
	jQuery.fn.extend({
		updatePos: function ( id, top, left ) {
			crops.list[id].marginTop  = calculPosTop;
			crops.list[id].marginLeft = calculPosLeft;
			$('#inputTop' + id).attr("placeholder", "T : " + crops.list[id].marginTop);
			$('#inputLeft' + id).attr("placeholder", "L : " + crops.list[id].marginLeft);
		}
	});


	//
	// ADD SCREEN
	//
	// $().addScreen()
	jQuery.fn.extend({
		addScreen: function () {
			videoContentWidth     = parseInt($('#videoContent').width());
			videoContentHeight    = parseInt($('#videoContent').height());
			var width = parseInt( $('#navInputTextWidth').val() );
			var height = parseInt( $('#navInputTextHeight').val() );

			// Resetting colors to default, in case of inputs being red
			$('#navInputTextWidth').css({
				"background-color"   : '#FFF',
				"color"   : '#000'
			});
			$('#navInputTextHeight').css({
				"background-color"   : '#FFF',
				"color"   : '#000'
			});


			// Control to show user he forget to input something
			if ( isNaN(width) == true ){
				$('#navInputTextWidth').css({
					"background-color"   : 'rgba(255,0,0,.5)',
					"color"   : '#FFF'
				});
			}
			if ( isNaN(height)  == true ){
				$('#navInputTextHeight').css({
					"background-color"   : 'rgba(255,0,0,.5)',
					"color"   : '#FFF'
				});
			}

			// Cancellers
			if ( isNaN(width) == true )         {return false;}
			if ( isNaN(height)  == true )       {return false;}
			if ( width > videoContentWidth )    {return false;}
			if ( height  > videoContentHeight ) {return false;}

			// If all is good
			$().createAdlibitumScreen()
		}
	});



	//
	// CREATE ADD LIBITUM SCREEN
	//
	// $().createAdlibitumScreen( parameter )
	jQuery.fn.extend({
		createAdlibitumScreen: function () {
			if ( $("#buttonCropIt").hasClass("disabled") === true ) {
				$("#buttonCropIt").removeClass("disabled");
			};

			var id = crops.list.length;

			videoContentWidth     = parseInt($('#videoContent').width());
			videoContentHeight    = parseInt($('#videoContent').height());
			var width = parseInt( $('#navInputTextWidth').val() );
			var height = parseInt( $('#navInputTextHeight').val() );

			crops.list.push({
				screenId   : crops.list.length,
				width      : width,
				height     : height,
				marginLeft : "0",
				marginTop  : "0",
				color      : [
					Math.ceil( (Math.random()*255) ), 
					Math.ceil( (Math.random()*255) ), 
					Math.ceil( (Math.random()*255) ),
					0.5
				],
			});


			$().addCropLayerToUI( id )
		}
	});



	//
	// CREATE FORMAT SCREEN
	//
	// $().createFormatScreen( ratioW, ratioH )
	jQuery.fn.extend({
		createFormatScreen: function ( ratioW, ratioH ) {
			if ( $("#buttonCropIt").hasClass("disabled") === true ) {
				$("#buttonCropIt").removeClass("disabled");
			};

			// console.log( ratioW + " : " + ratioH);

			ratioW                    = parseFloat( ratioW );
			ratioH                    = parseFloat( ratioH );


			var id                    = crops.list.length;
			var videoContentWidth     = parseInt( $('#videoContent').width() );
			var videoContentHeight    = parseInt( $('#videoContent').height() );
			var unit                  = "";
			var width                 = "";
			var height                = "";

			if ( videoContentWidth > videoContentHeight) {
				unit   = ( videoContentHeight / 2 );
			}
			else{
				unit   = ( videoContentWidth / 2 );
			}

			unit       = unit / 2 ;
			height     = parseInt( unit );
			width      = parseInt( unit * ratioW );

			// console.log("Infos " +unit +" "+ height +" "+  width);

			crops.list.push({
				screenId   : crops.list.length,
				width      : width,
				height     : height,
				marginLeft : "0",
				marginTop  : "0",
				color      : [
					Math.ceil( (Math.random()*255) ), 
					Math.ceil( (Math.random()*255) ), 
					Math.ceil( (Math.random()*255) ),
					0.5
				],
			});

			$().addCropLayerToUI( id )
		}
	});



	//
	// ADD CROP LAYER TO UI
	//
	// $().addCropLayerToUI( id )
	jQuery.fn.extend({
		addCropLayerToUI: function ( id ) {

			$('#videoContent').append('<div class="cropLayer" id="cropNumber' + id + '"></div>');
			$('#cropNumber' + id).css({
				'position'           : 'absolute',
				"background-color"   : 'rgba(' + crops.list[id].color[0] + ',' + crops.list[id].color[1] + ',' + crops.list[id].color[2] + ',' + crops.list[id].color[3] + ')',
				'top'                : crops.list[id].marginTop + "px",
				'left'               : crops.list[id].marginLeft + "px",
				'width'              : crops.list[id].width + "px", 
				'height'             : crops.list[id].height + "px"
			});

			// Draggable, resizable
			$('#cropNumber' + id)
				.resizable({
					resize: function( event, ui ) {
						var width     = $('#cropNumber'+id).width();
						var height    = $('#cropNumber'+id).height();

						// Function update
						$().updateSize( id, width, height );
					},
					containment : $("#videoContent"),
				}) // End resizable
				.draggable({ //make it "draggable" and "resizable"
					drag: function(event, ui) { // What happen when dragged
						cropNumberOffsetTop       = parseInt($('#cropNumber'+id).offset().top);
						cropNumberOffsetLeft      = parseInt($('#cropNumber'+id).offset().left);

						videoContentOffsetTop     = parseInt($('#videoContent').offset().top);
						videoContentOffsetLeft    = parseInt($('#videoContent').offset().left);

						calculPosTop              = cropNumberOffsetTop - videoContentOffsetTop;
						calculPosLeft             = cropNumberOffsetLeft - videoContentOffsetLeft;

						// Function update
						$().updatePos( id, calculPosTop, calculPosLeft );
					},
					containment : $("#videoContent"),
				}); // End draggable

			$().addToolbarInfos( id );
		}
	});



	//
	// CHECK FOR EXTENSIONS
	//
	// $().checkExtension( target, arrayOfReferences )
	jQuery.fn.extend({
		checkExtension: function ( target, arrayOfReferences ) {

			target = target.split(/(\\|\/)/g).pop();


			target = target.split(/(\\|\/)/g).pop();

			target = target.split('.').pop();
			var control = false; 
			
			for (var i = 0 ; i < arrayOfReferences.length ; i ++ ){
				if ( target === arrayOfReferences[i] ) {
					control = true;
				}
			}

			return control;
		}
	});



	//
	// Add Video Content Loading Spinner
	//
	// $().addVideoContentLoadingSpinner(  )
	jQuery.fn.extend({
		addVideoContentLoadingSpinner: function (  ) {
			$('#videoContentCache').fadeIn();
			$('#videoContentCache').append('<div id="videoContentBackground"></div>');
			$('#videoContentBackground').empty('');
			$('#videoContentBackground').append('<div class="spinner large" role="progressbar"></div>');
		}
	});



	//
	// DISPLAY MODAL WITH DESIRED INFORMATIONS
	//
	// $().displayModal( title, text )
	jQuery.fn.extend({
		displayModal: function ( title, text ) {
			var titleId = "informationModalContentTitle";
			var textId = "informationModalContentText";

			$("#" + titleId).empty();
			$("#" + textId).empty();
			$("#" + titleId).append(title);
			$("#" + textId).append(text);


			$('#cache').fadeIn();
			$('#informationModal').slideDown();
		}
	});



	//
	// HIDE MODALE WINDOW
	//
	// $().hideModal( )
	jQuery.fn.extend({
		hideModal: function (  ) {
			$('#informationModal').slideUp();
			$('#cache').fadeOut();
		}
	});

    //
    // defaultFavicon
    //
    // $().defaultFavicon();
	jQuery.fn.extend({
		defaultFavicon: function (  ) {
			oldLink = document.getElementById('favicon');
			document.head.removeChild(oldLink);

			 var icon = document.createElement('link');
			    icon.type = 'image/png';
			    icon.rel = 'icon';
			    icon.id = 'favicon';
			    icon.href = "data:image/png;base64,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";
			    document.getElementsByTagName('head')[0].appendChild(icon);
		}
	});

	//
	// changeFavicon
	//
	// $().changeFavicon( newPath );
	jQuery.fn.extend({
		changeFavicon: function ( newPath ) {
			oldLink = document.getElementById('favicon');
			document.head.removeChild(oldLink);

			 var icon = document.createElement('link');
			    icon.type = 'image/png';
			    icon.rel = 'icon';
			    icon.id = 'favicon';
			    icon.href = newPath;
			    document.getElementsByTagName('head')[0].appendChild(icon);

			$("#favicon").attr("href", newPath);
		}
	});



	//
	// Animated favicon
	//
	// $().animateFavicon();
	jQuery.fn.extend({
		animateFavicon: function () {
			var i = 0;
			$('html').timer({
				delay: 400,
				repeat: true,
				callback: function( index ) {
					$().changeFavicon( faviconAnimated[i] );
					i ++;
					if ( i == 15){
						i = 0;
					}
					
				}
			});
		}
	});

// jQuery end
});


		// $("#autoCropCheckbox").is(':checked');






/**
 * ReplaceAll by Fagner Brack (MIT Licensed)
 * Replaces all occurrences of a substring in a string
 */
String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
    var _token;
    var str = this + "";
    var i = -1;

    if ( typeof token === "string" ) {

        if ( ignoreCase ) {

            _token = token.toLowerCase();

            while( (
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                ) ) !== -1
            ) {
                str = str.substring( 0, i ) +
                    newToken +
                    str.substring( i + token.length );
            }

        } else {
            return this.split( token ).join( newToken );
        }

    }
return str;
};