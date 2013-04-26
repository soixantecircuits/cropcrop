jQuery(function($){
	// "use strict";
	console.log("jQuery is ok.");

	/*************/

	var screensCropList = [];
	var screensCropCount = 0; // Use to be an ID

	videoInformations = {
		imgSrc  : "thumbnails/video.jpg",
		width   : 800,
		height  : 600,
		title   : "Battle de créateurs.mp4",
		format  : "AVC Codec",
		size    : "30mo",
		FPS     : "25"
	}

	crops = {};
	crops.list = [];
	crops.list[0]={
		width      : "32",
		height     : "32",
		marginLeft : "0",
		marginTop  : "0",
		color      : [255,0,0,0.5],
	}
	crops.list[1]={
		width      : "60",
		height     : "200",
		marginLeft : "50",
		marginTop  : "0",
		color      : [255,255,0,0.5],
	}
	crops.list[2]={
		width      : "66",
		height     : "66",
		marginLeft : "200",
		marginTop  : "100",
		color      : [255,0,255,0.5],
	}
	crops.list[3]={
		width      : "200",
		height     : "60",
		marginLeft : "400",
		marginTop  : "200",
		color      : [0,255,255,0.5],
	}



	// for (var i = 0; i < oFullResponse.results.length; i++) {
	//     var key = oFullResponse.results[i].label
	//     columns[key] = {
	//         sortable: true,
	//         resizeable: true
	//     };
	// }

	/*************/



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





	/*********************/
	/*********************/
	/*********************/
	/*********************/
	/*********************/

	$("#tmpUpd").click(function(event){
		$().updateVideoInformations( videoInformations )
	});
	$("#tmpAff").click(function(event){
		$("#videoContent").empty();
		$().affiche();
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
			console.log(infos);
			$('#videoContent').empty()
			$('#videoContent').css({
				"background-image" : 'url("server/php/'+infos.message.thumbnails+'")',
				width : infos.message.width, 
				height : infos.message.height
			});

			$('#videoInformationsWidth').text( infos.message.width );
			$('#videoInformationsHeight').text( infos.message.height );
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
				'margin-top'         : crops.list[id].marginTop + "px",
				'margin-left'        : crops.list[id].marginLeft + "px",
				'width'              : crops.list[id].width + "px", 
				'height'             : crops.list[id].height + "px"
			});
			// Draggable, resizable
			$('#cropNumber' + id)
				.resizable()
				.draggable({ //make it "draggable" and "resizable"
					drag: function(event, ui) { // What happen when dragged

						// DO NOT TOUCH. Or I'll bite you.

						cropNumberPositionTop     = parseInt($('#cropNumber'+id).position().top);
						cropNumberPositionLeft    = parseInt($('#cropNumber'+id).position().left);
						cropNumberOffsetTop       = parseInt($('#cropNumber'+id).offset().top);
						cropNumberOffsetLeft      = parseInt($('#cropNumber'+id).offset().left);

						videoContentPositionTop   = parseInt($('#videoContent').position().top);
						videoContentPositionLeft  = parseInt($('#videoContent').position().left);
						videoContentOffsetTop     = parseInt($('#videoContent').offset().top);
						videoContentOffsetLeft    = parseInt($('#videoContent').offset().left);

						calculPosTop              = cropNumberOffsetTop - videoContentOffsetTop;
						calculPosLeft             = cropNumberOffsetLeft - videoContentOffsetLeft;


						console.log("--------------------------------");
						console.log(" cropNumber " + id + " position : " + cropNumberPositionTop + " " + cropNumberPositionLeft);
						console.log(" cropNumber " + id + " offset   : " + cropNumberOffsetTop + " " + cropNumberOffsetLeft);

						console.log(" yourVideo position    : " + videoContentPositionTop + " " + videoContentPositionLeft);
						console.log(" yourVideo offset      : " + videoContentOffsetTop + " " + videoContentOffsetLeft);

						console.log("Mix offset top         : " + calculPosTop);
						console.log("Mix offset left        : " + calculPosLeft);


						crops.list[id].marginTop = calculPosTop;
						crops.list[id].marginLeft = calculPosLeft;
						console.log(crops.list[id].marginTop);
						console.log(crops.list[id].marginLeft);
					}
				});// End draggable

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

			// If all is ok
			if ( isNaN(width) == true ){
				console.log("1");
				return;
			}
			if ( isNaN(height)  == true ){
				console.log("2");
				return;
			}
			if ( width > videoContentWidth ){
				console.log("3");
				return;
			}
			if ( height  > videoContentHeight ){
				console.log("4");
				return;
			}

			crops.list.push({
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


/*
var img = new Image();
img.onload = function() {
  alert(this.width + 'x' + this.height);
}
img.src = 'http://www.google.com/intl/en_ALL/images/logo.gif';
*/