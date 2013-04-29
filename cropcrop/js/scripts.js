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
	crops.title = "None";
	crops.list = [];


	crops.list[0]={
		screenId   : 0, 
		width      : "32",
		height     : "32",
		marginLeft : "0",
		marginTop  : "0",
		color      : [255,0,0,0.5],
	}
	crops.list[1]={
		screenId   : 1, 
		width      : "60",
		height     : "200",
		marginLeft : "50",
		marginTop  : "0",
		color      : [255,255,0,0.5],
	}
	crops.list[2]={
		screenId   : 2, 
		width      : "66",
		height     : "66",
		marginLeft : "200",
		marginTop  : "100",
		color      : [255,0,255,0.5],
	}
	crops.list[3]={
		screenId   : 3, 
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
		var title = $("#fileupload").val();
		title = title.split(/(\\|\/)/g).pop();
		crops.title = title;

		$('#videoContentBackground').empty();
		$('#videoContentBackground').append('<div class="spinner large" role="progressbar"> </div>');
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

			var img = new Image();
			bgImgUrl = "server/php/" + infos.message.thumbnails;
		       
			$(img).attr('src', bgImgUrl).load(function() {
				$("#videoContent").animate({width: infos.message.width }, 1000, "easeInCirc", function(){
					$("#videoContentCache").empty();
					$("#videoContent").css({
						"background-image": "url(" + bgImgUrl + ")",
					});
					$("#videoContentCache").fadeOut();
					
				});
				$("#videoContent").animate({height: infos.message.height}, 1000, "easeOutCirc");
			});

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
					
 					
					// Lets put our stringified json into a variable for posting
					
			
				$.ajax({
					type: "POST",

					data: { json: JSON.stringify(jsoninfo) },
					url: './server/php/crop.php', success: function(response) {
						console.log(response);
				}
			});
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
				.resizable({
					stop: function( event, ui ) {
						crops.list[id].width      = $('#cropNumber'+id).width();
						crops.list[id].height     = $('#cropNumber'+id).height();
					}
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
					}
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

			// If all is ok
			if ( isNaN(width) == true ){
				console.log("1");
				return false;
			}
			if ( isNaN(height)  == true ){
				console.log("2");
				return false;
			}
			if ( width > videoContentWidth ){
				console.log("3");
				return false;
			}
			if ( height  > videoContentHeight ){
				console.log("4");
				return false;
			}

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


/*
var img = new Image();
img.onload = function() {
  alert(this.width + 'x' + this.height);
}
img.src = 'http://www.google.com/intl/en_ALL/images/logo.gif';
*/