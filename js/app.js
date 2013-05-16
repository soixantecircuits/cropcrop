jQuery(function($) {
	cropmodule = $('body').cropcrop();
	var formdata = false;

	// Script part
	var closeTabWithoutWarning = false;
	var isToolsMainContainer = 0;

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
				url: 'server/php/test.php',
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
	$('#cropItProgressBar,#toolsMainContainerContent,#hiddenElements,#cache,#informationModal,#warningJavascriptNotEnabled').hide();

	// Menu
    $("#toolsMainContainer").draggable({
        handle: "#toolsMainContainerMainButton"
    });
    $("#toolsMainContainerMainButton").dblclick(function(event){
    	$('#sphere').trigger("click");
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
	$('#buttonUpload').click(function(event) {
		event.preventDefault();
		$("#fileupload").trigger("click");
	});

	$('#buttonCropIt').click(function(event) {
		event.preventDefault();
		$("#progressBarText").text("Croping your video, please wait....");
		$('html').timer('start');
		cropmodule.cropcrop("sendCrop");
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
	// Functions
	//
	$("#bulkExcel").click(function(event) {
		event.preventDefault();
		cropmodule.cropcrop("bulkExcel", $('#bulkArea').val());
	});

	$("#bulkJson").click(function(event) {
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