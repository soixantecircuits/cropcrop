jQuery(function($) {
	cropmodule = $('body').cropcrop();
	var formdata = false;

	// Script part
	var closeTabWithoutWarning = false;
	isToolsMainContainer = 0;
	isCropMenuShown = 0;

	//
	// Module dependant
	//
	$("#images").change(function(evt) {
		if (window.FormData) {
			formdata = new FormData();
		}
		var i = 0,
			len = this.files.length,
			img, reader, file;
		for (; i < len; i++) {
			file = this.files[i];

			if ( !! file.type.match(/image.*/)) {
				if (window.FileReader) {
					reader = new FileReader();

					reader.readAsDataURL(file);
				}
				if (formdata) {
					formdata.append("images[]", file);
				}
			}
		}
		if (formdata) {
			$.ajax({
				url: "server/php/upload.php",
				type: "POST",
				data: formdata,
				processData: false,
				contentType: false
			}).done(function(data) {
				cropmodule.cropcrop("enablePhotoLayer", data);
				photoEnabled = $('#photoCheckbox').is(':checked');
				cropmodule.cropcrop("displayPhotoLayer", photoEnabled);
			});
		}
	});

	$('#fileupload').fileupload({
		dataType: 'json',

		add: function(e, data) {
			if (data.autoUpload || (data.autoUpload !== false && ($(this).data('blueimp-fileupload') || $(this).data('fileupload')).options.autoUpload)) {
				extName = data.files[0].name;
				//console.log(extName.toLowerCase());
				var ext = cropmodule.cropcrop("checkExtension", extName.toLowerCase(), videoExtensionsAllowed);
				if (ext) {
					// var title = $("#fileupload").val();
					// title = title.split(/(\\|\/)/g).pop();
					$("#uploadZone").hide();
					$("#dropzone").hide();
					cropmodule.cropcrop("updateCropsTitle", data.files[0].name);
					cropmodule.cropcrop("animateFavicon");
					data.submit();
					cropmodule.cropcrop("addVideoContentLoadingSpinner");
					closeTabWithoutWarning = true;
				} else {
					cropmodule.cropcrop("displayModal", "Uploading error", "Please select a video file.");
				}
			}
		}
	});

	$('#fileupload').bind('fileuploaddone', function(e, data) {
		$.each(data.result.files, function(index, file) {
			var _self = this;
			$.ajax({
				url: 'server/php/getVideoInformations.php',
				type: "POST",
				data: _self
			}).done(function(response) {
				dataAStocker = _self;
				cropmodule.cropcrop("updateVideoInformations", response);
			});
		});
	});

	$('#fileupload').bind('fileuploadprogress', function(e, data) {
		var progress = parseInt(data.loaded / data.total * 100, 10);
		$('#progress .bar').css(
			'width', progress + '%');
		$("#progressBarText").text("Downloading your video file : " + progress + " %");
		if (progress == 100) {
			$("#progressBarText").text("Creating thumbnails...");
		}
	});


	//
	// Header
	//
	$("#iconHelp").click(function(event) {
		event.preventDefault();
		var textContent = "";
		textContent += "<h3>ABOUT Crop Crop</h3>";
		textContent += "<p>We made cropping videos easy.</p>";
		textContent += "<h3>HOW IT WORKS?</h3>";
		textContent += "<ul id='iconHelpUl'>";
		textContent += "<li>Upload your Video file</li>";
		textContent += "<li>Wait thumbnails to be created</li>";
		textContent += "<li>Draw as much screens as you wish over your video</li>";
		textContent += "<li>Crop</li>";
		textContent += "<li>Download zipped folder with all your cropped videos !</li>";
		textContent += "</ul>";
		cropmodule.cropcrop("displayModal", "Help", textContent);
	});

	//
	// Ask user to quit
	//
	window.onbeforeunload = function() {
		if (closeTabWithoutWarning) {
			return "Video uploaded, are you sure?";
		}
	};

	$("#fileupload").change(function(event) {
		event.preventDefault();
	});

	//
	// Interface
	//

	// Initialisation
	$('#videoCropListDiv,#cropItProgressBar,#toolsMainContainerContent,#hiddenElements,#cache,#informationModal,#warningJavascriptNotEnabled').hide();
	$('#downloadLi').tipsy();
	$('#cropLi').tipsy();
	$("#videoCropListDiv").perfectScrollbar();
	$('#videoCropListDivContainer').perfectScrollbar();

	//
	// Has to be worked
	//
	$("#toolsFirstContainer").resizable({
		handles: 's',
		maxHeight: "204",
		minHeight: "34"
	});
	$("#toolsSecondContainer").resizable({
		handles: 's',
		maxHeight: "216",
		minHeight: "24"
	});

	// Menu
	$("#toolsMainContainer").draggable({
		handle: "#toolsMainContainerMainButton",
		containment: "body"
	});
	$("#toolsMainContainerMainButton").dblclick(function(event){
		$('#sphere').trigger("click");
	});
	$("#toolsMainContainerMainButton").hover(function () {
			$('#sphere').toggleClass("blue");
		},
		function () {
			$('#sphere').toggleClass("blue");
		});
	$("#uploadZone").hover(function () {
			$('#centralUploadButton').toggleClass("hover");
		},
		function () {
			$('#centralUploadButton').toggleClass("hover");
		});
	$('#sphere').click(function(event) {
		event.preventDefault();
		if (isToolsMainContainer === 0) {
			$('#toolsMainContainerContent').slideDown();
			$('#sphere').toggleClass('up');
			isToolsMainContainer = 1;
		} else {
			$('#toolsMainContainerContent').slideUp();
			$('#sphere').toggleClass('up');
			isToolsMainContainer = 0;
		}
	});

	// Buttons
	$('#uploadZone').click(function(event) {
		event.preventDefault();
		$("#fileupload").trigger("click");
	});

	// $('#buttonCropIt').click(function(event) {
	$('#cropIcon').click(function(event) {
		event.preventDefault();
		if (crops.list.length > 0) {
			$("#progressBarText").text("Croping your video, please wait....");
			$('html').timer('start');
			$('html').timer('start');
			cropmodule.cropcrop("sendCrop");
		};
	});

	$('#cache').click(function(event) {
		event.preventDefault();
		cropmodule.cropcrop("hideModal");
	});

	$("#addScreenForm").submit(function(event) {
		event.preventDefault();
		cropmodule.cropcrop("addScreen");
	});

	$("#autoCropCheckbox").click(function(event) {
		autoCropEnabled = $('#autoCropCheckbox').is(':checked');
		cropmodule.cropcrop("rebuildInterface", autoCropEnabled);
	});

	$("#buttonImportScreen").click(function(event) {
		event.preventDefault();
		var textContent = "";
		textContent += '<div><textarea id="bulkArea"></textarea></div>';
		textContent += '<div>';
		textContent += '<input type="button" role="button" class="button dark" id ="bulkExcel" value="Excel">';
		textContent += '<input type="button" role="button" class="button dark" id ="bulkJson" value="jSon">';
		textContent += '</div>';
		cropmodule.cropcrop("displayModal", "Import Content", textContent);
	});
	$("#buttonExportScreen").click(function(event) {
		event.preventDefault();
		var textContent = "";
		textContent += '<div>';
		textContent += '<textarea>' + JSON.stringify(crops) + '</textarea>';
		textContent += '</div>';
		cropmodule.cropcrop("displayModal", "Export Content", textContent);
	});

	$("#carouselContainer").on("click", function(event) {
		event.preventDefault();
		$("#videoContent").css({
			"background-image": "url(" + $(event.target).data('big') + ")"
		});
	});

	// To put a crop layer on the top
	$("#videoCropListDiv").on("click", ".videoCropListDivElement", function(event) {
		event.preventDefault();
		var id = $(this).attr("id");
		id = id.replace("videoCropListDivElement", "");
		if ($("#cropNumber" + id).hasClass("topLayer") === false) {
			$(".topLayer").removeClass("topLayer");
			$("#cropNumber" + id).addClass("topLayer").effect("highlight", {}, 1000);
		}
	});

	$(".buttonBar").on("click", function(event) {
		if (($(event.target).data('width') && $(event.target).data('height'))) {
			// console.log($(event.target).data('width'));
			cropmodule.cropcrop("createFormatScreen", $(event.target).data('width'), $(event.target).data('height'));
		};
	});

	$("#photoCheckbox").click(function(event) {
		photoEnabled = $('#photoCheckbox').is(':checked');
		cropmodule.cropcrop("displayPhotoLayer", photoEnabled);
	});

	$("#buttonUploadYourPhoto").click(function(event) {
		event.preventDefault();
		$("#images").trigger("click");
	});
	$("#yourPhotoUpload").change(function(event) {
		event.preventDefault();
		$("#btn").submit();
	});

	$("#videoCropListDiv").on("click", ".cropDestroyerContainer", function(event) {
		event.preventDefault();
		var id = $(this).attr("id");
		id = id.replace("destroyer", "");
		cropmodule.cropcrop("destroyCrop", id);
	});
	
	//
	// Footer
	//
	$("#legalMentionsLink").click(function(event) {
		event.preventDefault();
		cropmodule.cropcrop("displayModal", "Legal Mentions", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
	});

	//
	// bulk screens
	//
	$("#informationModal").on("click", "#bulkExcel", function(event) {
		event.preventDefault();
		cropmodule.cropcrop("bulkExcel", $('#bulkArea').val());
	});
	$("#informationModal").on("click", "#bulkJson", function(event) {
		event.preventDefault();
		cropmodule.cropcrop("bulkJson", $('#bulkArea').val());
	});

	//
	// Menu tabs
	//
	$(".menuTab").click(function(event) {
		var targetPanel = $(this).attr("data-associatedPanel");
		var container = $($(this).parents(".toolsContainer"));
		container.find(".selectedMenu").removeClass("selectedMenu");
		$(this).addClass("selectedMenu");
		container.find(".selectedPanel").removeClass("selectedPanel");
		container.find("#"+targetPanel).addClass("selectedPanel");
	});

	//
	// Bob
	//
	$('#showCropListDivButtonDiv').click(function(event) {
		event.preventDefault();
		if (isCropMenuShown === 0) {
			event.preventDefault();
			$('#videoCropListDiv').slideDown();
			$('#triangle').toggleClass('up');
			isCropMenuShown = 1;
		} else {
			$('#videoCropListDiv').slideUp();
			$('#triangle').toggleClass('up');
			isCropMenuShown = 0;
		}
	});



	//
	// Dropzone !
	//
	// Disable drag n' drop
	$(document).bind('drop dragover', function (e) {
	    e.preventDefault();
	});
	// Das Dropzone !
	$(document).bind('dragover', function (e) {
	    var dropZone = $('#dropzone'),
	        timeout = window.dropZoneTimeout;
	    if (!timeout) {
	        dropZone.addClass('in');
	    } else {
	        clearTimeout(timeout);
	    }
	    var found = false,
	      	node = e.target;
	    do {
	        if (node === dropZone[0]) {
	       		found = true;
	       		break;
	       	}
	       	node = node.parentNode;
	    } while (node != null);
	    if (found) {
	        dropZone.addClass('hover');
	    } else {
	        dropZone.removeClass('hover');
	    }
	    window.dropZoneTimeout = setTimeout(function () {
	        window.dropZoneTimeout = null;
	        dropZone.removeClass('in hover');
	    }, 100);
	});


    $("body").click(function(event){
    	if (thumnbnailsLoaded == true) {
	    	$('#progress').fadeOut();
	    	thumnbnailsLoaded = false;
    	}
    })
    // $(".formatButton.button.dark.disabled").click(function(){
    // 	console.log("bob");
    // })
	// jQuery end
});



String.prototype.replaceAll = function(token, newToken, ignoreCase) {
	var _token;
	var str = this + "";
	var i = -1;

	if (typeof token === "string")

	if (ignoreCase) {

		_token = token.toLowerCase();

		while ((
		i = str.toLowerCase().indexOf(
		token, i >= 0 ? i + newToken.length : 0)) !== -1) {
			str = str.substring(0, i) + newToken + str.substring(i + token.length);
		}

	} else {
		return this.split(token).join(newToken);
	}
	return str;
};