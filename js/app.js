jQuery(function($){
	// "use strict";

	/**********************/
	/* old upload.js  */
	/**********************/


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


/**********************/
/**********************/
/*   file upload      */
/**********************/

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

			// $("#autoCropCheckbox").is(':checked');
		});
/**********************/
/**********************/
/**********************/
/**********************/


	var serverPath = "server/php/";
	var screensCropList = [];
	var screensCropCount = 0; // Use to be an ID
	videoInformations = {};
	var crops = {};
	crops.title = "None";
	crops.list = [];
	dataAStocker = "";


	/***********************************************/
	/*                                             */
	/*                                             */
	/*                  INTERFACE                  */
	/*                                             */
	/*                                             */
	/***********************************************/

	  /*******************/
	 /*  Hide elements  */
	/*******************/
	$('#cropItProgressBar').hide();
	$('#YourVideoToolbar').hide();
	$('#cache').hide();
	$('#uploadingModal').hide();
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
		$().sendCrop( crops );
	});

	$('#cache').click(function(event){
		event.preventDefault();
		$('#cache').fadeOut();
		$('#uploadingModal').fadeOut();
	});

	$("#addScreenForm").submit(function(event){
		event.preventDefault();
		$().addScreen();
	});

	// When upload start
	$("#fileupload").change(function(event){
		event.preventDefault();
		$('#videoContentCache').fadeIn();
		var title = $("#fileupload").val();
		title = title.split(/(\\|\/)/g).pop();
		crops.title = title;

		$('#videoContentCache').append('<div id="videoContentBackground"></div>');
		$('#videoContentBackground').empty('');
		$('#videoContentBackground').append('<div class="spinner large" role="progressbar"></div>');
	});

	  /********************************/
	 /*  Mini thumbnails management  */
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
	 /*  Select crop layer  */
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
	 /*  Video format function  */
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
	 /*  User can upload his photo  */
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
				  	thumnbnailsinfos = datas;
					$().createCarousel();
					$("#progressBarText").text("You can now add screens to crop with video");
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
				  	$('#buttonDownloadIt').attr("href","server/php/download.php?filename="+datas);
					$('#buttonDownloadItInput').removeClass("disabled");
					$("#buttonYourVideo").effect("highlight", {}, 1000);
					$("#buttonDownloadItInput").effect("highlight", {}, 1000);
					$("#cropItProgressBar").hide();
					$("#buttonCropIt").fadeIn();
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

			console.log("Infos " +unit +" "+ height +" "+  width);

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


// jQuery end
});









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