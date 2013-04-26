jQuery(function($){
	// "use strict";
	console.log("jQuery is ok.");

	/*************/

	var screensCropList = [];
	var screensCropCount = 0; // Use to be an ID

	crops = {};
	crops[1]={
		width      : "60",
		height     : "200",
		marginLeft : "",
		marginTop  : "",
		color      : [255,255,0,0.5],
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



	/***********************************************/
	/*                                             */
	/*                                             */
	/*              CUSTOM FUNCTIONS               */
	/*                                             */
	/*                                             */
	/***********************************************/

	//
	// AFFICHE
	//
	// Called with $().affiche()
	jQuery.fn.extend({
	    affiche: function (SUPERBOB) {
	        var retour = SUPERBOB;
			$('#rouge').fadeIn();
	    	return retour;
	    }
	});

	//
	// SHOW THUMBNAIL
	//
	// Called with $().afficheThumbnail( parameter )
	jQuery.fn.extend({
	    showThumbnail: function (thumbnailName) {
	    	$('#videoContent').empty()
	    	$('#videoContent').css({
			    "background-image" : 'url("thumbnails/video.jpg")',
			    width : '800px', 
			    height : '600px'
			});
	    }
	});

	//
	// UPDATE VIDEO INFORMATIONS
	//
	// Called with $().afficheThumbnail( parameter )
	jQuery.fn.extend({
	    updateVideoInformations: function (thumbnailName) {
	    	$('#videoInformationsTitle').empty();
	    	$('#videoInformationsFormat').empty();
	    	$('#videoInformationsWidth').empty();
	    	$('#videoInformationsHeight').empty();
	    	$('#videoInformationsSize').empty();
	    	$('#videoInformationsFPS').empty();
	    }
	});

	//
	// CREATE SCREEN
	//
	// $().createScreen( parameter )
	jQuery.fn.extend({
	    createScreen: function (id) {
	    	crops[id].width
	    	
		    $('#videoContent').append('<div id="cropNumber' + id + '"></div>');


		    $('#cropNumber' + id).css({
		    	'position'           : 'absolute',
			    "background-color"   : 'rgba(' + crops[id].color[0] + ',' + crops[id].color[1] + ',' + crops[id].color[2] + ',' + crops[id].color[3] + ')',
			    'margin-top'         : crops[id].marginTop,
			    'margin-left'        : crops[id].marginLeft,
			    'width'              : crops[id].width, 
			    'height'             : crops[id].height
			});
			// Draggable, resizable
		    $('#cropNumber' + id).draggable().resizable();

	    }
	});


	//
	// ADD SCREEN
	//
	// $().afficheThumbnail( parameter )
	jQuery.fn.extend({
	    addScreen: function () {
	    	var width = $('#navInputTextWidth').val();
	    	var height = $('#navInputTextHeight').val();

	    	// Resetting to default, in case of inputs being red
			$('#navInputTextWidth').css({
			    "background-color"   : '#FFF'
			});
			$('#navInputTextHeight').css({
			    "background-color"   : '#FFF'
			});


			// Control to show user he forget to input something
	    	if ( width == '' ){
				$('#navInputTextWidth').css({
				    "background-color"   : 'rgba(255,0,0,.5)'
				});
	    	}
	    	if ( height  == '' ){
				$('#navInputTextHeight').css({
				    "background-color"   : '#A00'
				});
	    	}

	    	// If all is ok
	    	if ( (width != '') && ( height != '') ) {
		    	console.log(width + " " + height)
		    	$('#videoContent').append('<div id="cropNumber' + screensCropCount + '"></div>');
		    	$('#cropNumber' + screensCropCount).css({
		    		'position'           : 'absolute',
				    "background-color"   : 'rgba(0,255,255,.5)',
				    'width'              : width, 
				    'height'             : height
				});
				// Draggable, resizable
		    	$('#cropNumber' + screensCropCount).draggable().resizable();
	    	};
	    }
	});

});


/*
var img = new Image();
img.onload = function() {
  alert(this.width + 'x' + this.height);
}
img.src = 'http://www.google.com/intl/en_ALL/images/logo.gif';
*/