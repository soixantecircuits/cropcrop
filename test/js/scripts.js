jQuery(function($){
	"use strict";
	console.log("jQuery is ok.");

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


	// Called with $().affiche()
	jQuery.fn.extend({
	    affiche: function (SUPERBOB) {
	        var retour = SUPERBOB;
			$('#rouge').fadeIn();
	    	return retour;
	    }
	});



});