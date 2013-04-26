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
		$('#cache').fadeIn();
		$('#uploadingModal').fadeIn();
	});

	$('#cache').click(function(event){
		event.preventDefault();
		console.log("cache fadeout")
		$('#cache').fadeOut();
		$('#uploadingModal').fadeOut();
	});


	$("#buttonAddScreen").click(function(event){
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
			$('#videoContent').empty()
			$('#videoContent').css({
				"background-image" : 'url("")',
				"background-image" : infos.imgSrc,
				width : infos.width, 
				height : infos.height
			});

			$('#videoInformationsTitle').text(infos.title);
			$('#videoInformationsFormat').text(infos.format);
			$('#videoInformationsWidth').text(infos.width);
			$('#videoInformationsHeight').text(infos.height);
			$('#videoInformationsSize').text(infos.size);
			$('#videoInformationsFPS').text(infos.FPS);
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
						crops.list[id].marginTop = $('#cropNumber'+id).position().top;
						console.log(crops.list[id].marginTop);
						crops.list[id].marginLeft = $('#cropNumber'+id).position().left;
						console.log(crops.list[id].marginLeft);
					}
				});

		}
	});


	//
	// ADD SCREEN
	//
	// $().addScreen( parameter )
	jQuery.fn.extend({
		addScreen: function () {
			var width = parseInt( $('#navInputTextWidth').val() );
			var height = parseInt( $('#navInputTextHeight').val() );

			// Resetting colors to default, in case of inputs being red
			$('#navInputTextWidth').css({
				"background-color"   : '#FFF'
			});
			$('#navInputTextHeight').css({
				"background-color"   : '#FFF'
			});


			// Control to show user he forget to input something
			if ( isNaN(width) == true ){
				$('#navInputTextWidth').css({
					"background-color"   : 'rgba(255,0,0,.5)'
				});
			}
			if ( isNaN(height)  == true ){
				$('#navInputTextHeight').css({
					"background-color"   : '#A00'
				});
			}

			// If all is ok
			if ( ( isNaN(width) == false ) && ( isNaN(height)  == false ) )
			{
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
			};


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