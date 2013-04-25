jQuery(function($){
	"use strict";
	console.log("jQuery is ok.");

	/*************/

	var screensList = [];

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

	$("#uploadingModal").click(function(event){
		// event.stopPropagation();
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

	// Called with $().affiche()
	jQuery.fn.extend({
	    affiche: function (SUPERBOB) {
	        var retour = SUPERBOB;
			$('#rouge').fadeIn();
	    	return retour;
	    }
	});


	// Called with $().afficheThumbnail( parameter )
	jQuery.fn.extend({
	    showThumbnail: function (thumbnailName) {
	    	$('#videoContent').empty()
	    	$('#videoContent').css({
			    "background-image" : 'url("./thumbnails/video.jpg")', // couleur rouge
			    width : '800px', 
			    height : '600px'
			});
	    }
	});

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

	// Called with $().afficheThumbnail( parameter )
	jQuery.fn.extend({
	    addScreen: function () {
	    	var width = "";
	    	var height = "";

	    	width = $('#navInputTextWidth').val();
	    	height = $('#navInputTextHeight').val();

	    	console.log(width + " " + height)
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