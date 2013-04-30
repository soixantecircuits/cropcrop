jQuery(function($){
	// "use strict";
	console.log("jQuery is ok.");

	/*************/

	var screensCropList = [];
	var screensCropCount = 0; // Use to be an ID

	videoInformations = {
		message:{
			thumbnails    : "http://elevage-guppy.fr/wp-content/uploads/2012/03/video.jpg",
			width         : 800,
			height        : 600,
			title         : "Battle de créateurs.mp4",
			fileSize      : "30mo",
			frameRate     : "25"
		}
	}

	crops = {};
	crops.title = "None";
	crops.list = [];


	/***********************************************/
	/*                                             */
	/*                                             */
	/*                  INTERFACE                  */
	/*                                             */
	/*                                             */
	/***********************************************/

	  /*****************/
	 /* Hide elements */
	/*****************/
	$('#cropItProgressBar').hide();
	$('#YourVideoToolbar').hide();
	$('#cache').hide();
	$('#uploadingModal').hide();
	$('#rouge').hide();
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





	/***********************************************/
	/*                                             */
	/*                                             */
	/*                  TEMPORARY                  */
	/*                                             */
	/*                                             */
	/***********************************************/

	$("#tmpUpd").click(function(event){
		$().updateVideoInformations( videoInformations )
	});
	$("#tmpAff").click(function(event){
		$("#videoContent").empty();
		$().affiche();
	});

	//
	// MOVE TO CROPS
	//
	// $().moveToCrops()
	jQuery.fn.extend({
		moveToCrops: function () {
			for ( i in annotations.notes ) {
				// console.log( annotations.notes[i].height );
				crops.list.push({
					screenId   : crops.list.length,
					width      : annotations.notes[i].width,
					height     : annotations.notes[i].height,
					marginLeft : annotations.notes[i].left,
					marginTop  : annotations.notes[i].top,
					color      : [
						Math.ceil( (Math.random()*255) ), 
						Math.ceil( (Math.random()*255) ), 
						Math.ceil( (Math.random()*255) ),
						0.5
					],
				});
			}
		}
	});



	/***********************************************/
	/*                                             */
	/*                                             */
	/*              CUSTOM FUNCTIONS               */
	/*                                             */
	/*                                             */
	/***********************************************/

	/* Functions list
		$().affiche()
		$().updateVideoInformations(  )
		$().createScreen( parameter )
		$().addScreen( parameter )
	*/

	//
	// AFFICHE
	//
	// $().affiche()
	jQuery.fn.extend({
		affiche: function () {
			for ( i in crops.list ) {
				$().createScreen( i )
			}
		}
	});


	//
	// UPDATE VIDEO INFORMATIONS
	//
	// $().updateVideoInformations( infos )
	jQuery.fn.extend({
		updateVideoInformations: function ( infos ) {
			console.log("$().updateVideoInformations() ------------");
			console.log(infos);

			infos.message.filename  = infos.message.filename.replaceAll('\'','');
			infos.message.frameRate = infos.message.frameRate.replaceAll('\'','');
			infos.message.fileSize  = infos.message.fileSize.replaceAll('\'','');

			var img                 = new Image();
			var bgImgUrl            = "server/php/" + infos.message.thumbnails;
			var infWidth            = infos.message.width;
			var infHeight           = infos.message.height;

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
			$("#videoInformationsTitle").text( infos.message.filename );
			$("#videoInformationsWidth").text( infos.message.width );
			$("#videoInformationsHeight").text( infos.message.height );
			$("#videoInformationsSize").text( infos.message.fileSize );
			$("#videoInformationsFPS").text( infos.message.frameRate );
			
			// Enable to user the use of interface
			$("#navInputTextWidth").removeClass("disabled");
			$("#navInputTextHeight").removeClass("disabled");
			$("#buttonAddScreen").removeClass("disabled");
			$("#buttonCropIt").removeClass("disabled");
			$("#autoCropCheckbox").removeClass("disabled");
			$("#buttonYourVideo").removeClass("disabled");


			// Update Carousel
			carouselContent ="";
			carouselContent += '<li><img src="server/php/' + infos.message.mini1 + '" alt="" width="' + infos.message.miniwidth + '" height="' + infos.message.miniheight + '" ></li>';
			carouselContent += '<li><img src="server/php/' + infos.message.mini2 + '" alt="" width="' + infos.message.miniwidth + '" height="' + infos.message.miniheight + '" ></li>';
			carouselContent += '<li><img src="server/php/' + infos.message.mini3 + '" alt="" width="' + infos.message.miniwidth + '" height="' + infos.message.miniheight + '" ></li>';

			$("#carouselContainer").append(carouselContent)

			for (var i = 1; i = Things.length; i++) {
				Things[i]
			};

			$("#mini1").attr("href", ""+infos.message.mini1);
			$("#mini2").attr(carouselContent);
			$("#mini3").attr(carouselContent);
		}
	});


	//
	// CROP IT
	//
	// $().sendCrop( infos )
		jQuery.fn.extend({
		sendCrop: function ( jsondata ) {
			// console.log(jsondata);
			$("#buttonCropIt").hide();
			$("#cropItProgressBar").fadeIn();

			var jsoninfo = jsondata;
			$.ajax({
				type: "POST",
				data: { json: jsoninfo },
				url: './server/php/crop.php', success: function(response) {
					$('#buttonDownloadIt').attr("href","server/php/download.php?filename="+response);
					$('#buttonDownloadItInput').removeClass("disabled");
					$("#buttonYourVideo").effect("highlight", {}, 1000);
					$("#buttonDownloadItInput").effect("highlight", {}, 1000);
					$("#cropItProgressBar").hide();
					$("#buttonCropIt").fadeIn();
				}
			});
		}
	});



	//
	// addToolbarInfos
	//
	// $().addToolbarInfos( id )
	jQuery.fn.extend({
		addToolbarInfos: function ( id ) {
			console.log("   "+crops.list[id]);
			if (!crops.list[id]) {
				return false;
			};

			var content = "";
			var width = crops.list[id].width;
			var height = crops.list[id].height;
			var marginTop = crops.list[id].marginTop;
			var marginLeft = crops.list[id].marginLeft;


			content += '<div class="videoCropListDivElement">';
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
	// CREATE SCREEN
	//
	// $().createScreen( parameter )
	jQuery.fn.extend({
		createScreen: function ( id ) {
			console.log("essais : "+id);
			$('#videoContent').append('<div id="cropNumber' + id + '"></div>');
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
						var width = $('#cropNumber'+id).width();
						var height = $('#cropNumber'+id).height();

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

			// Cancel
			if ( isNaN(width) == true )         {return false;}
			if ( isNaN(height)  == true )       {return false;}
			if ( width > videoContentWidth )    {return false;}
			if ( height  > videoContentHeight ) {return false;}

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
			$().createScreen( crops.list.length-1 )
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