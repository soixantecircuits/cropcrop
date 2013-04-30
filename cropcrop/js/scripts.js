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



	$('#YourVideoToolbar').hide();
	$('#cache').hide();
	$('#uploadingModal').hide();
	$('#rouge').hide();
	$('#warningJavascriptNotEnabled').hide();

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
		console.log("cache fadeout")
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
			console.log("------------");
			console.log(infos);

			infos.message.filename = infos.message.filename.replaceAll('\'','');
			infos.message.frameRate = infos.message.frameRate.replaceAll('\'','');
			infos.message.fileSize = infos.message.fileSize.replaceAll('\'','');

			var img   = new Image();
			var bgImgUrl  = "server/php/" + infos.message.thumbnails;

			var infWidth  = infos.message.width;
			var infHeight = infos.message.height;

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

			$("#videoInformationsTitle").text( infos.message.filename );
			$("#videoInformationsWidth").text( infos.message.width );
			$("#videoInformationsHeight").text( infos.message.height );
			$("#videoInformationsSize").text( infos.message.fileSize );
			$("#videoInformationsFPS").text( infos.message.frameRate );
		}
	});


	//
	// CROP IT
	//
	// $().sendCrop( infos )
		jQuery.fn.extend({
		sendCrop: function ( jsondata ) {
			console.log(jsondata);
			var jsoninfo = jsondata;
			$.ajax({
				type: "POST",
				data: { json: jsoninfo },
				url: './server/php/crop.php', success: function(response) {
					console.log(response);
				}
			});
		}
	});



	//
	// addToolbarInfos
	//
	// $().addToolbarInfos( infos )
		jQuery.fn.extend({
		addToolbarInfos: function ( id ) {
			console.log(crops.list[id]);
			if (!crops.list[id]) {
				return false;
			};

			var content = "";
			var marginTop = crops.list[id].marginTop;
			var marginLeft = crops.list[id].marginLeft;
			var width = crops.list[id].width;
			var height = crops.list[id].height;



			content += '<div class="videoCropListDivElement">';
				content += '<div id="cropSelection' + id + '" class="videoCropListDivElementContent">';
					content += '<p>' + id + '.</p>';
				content += '</div>';
				content += '<div id="cropSelection' + id + '__rectangle" class="rectangle videoCropListDivElementContent"></div>';
				content += '<div id="cropSelection' + id + '__rectangle" class="rectangle videoCropListDivElementContent">';
					content += '<input type="text" />';
					content += '<input type="text" />';
				content += '</div>';
			content += '</div>';

			return content;
		}
	});



	//
	// CREATE SCREEN
	//
	// $().createScreen( parameter )
	jQuery.fn.extend({
		createScreen: function (id) {
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
					stop: function( event, ui ) {
						crops.list[id].width      = $('#cropNumber'+id).width();
						crops.list[id].height     = $('#cropNumber'+id).height();
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

						crops.list[id].marginTop  = calculPosTop;
						crops.list[id].marginLeft = calculPosLeft;
					},
					containment : $("#videoContent"),
				}); // End draggable

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