jQuery(function(){

	// localStorage.setItem('key', value);
	// localStorage.getItem('key');
	// localStorage.removeItem('key');

	if (!localStorage.getItem("UUID")) {
		UUID = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
		localStorage.setItem("UUID", UUID);
	};

//
// Buttons
//
// Main interface
//     Upload to server button
	$('#uploadZone').click(function(event) {
		mixpanel.track("Click upload file");
	});
//     github
	$('#logoGitHub').click(function(event) {
		mixpanel.track("Click GitHub", {
			"UUID" : localStorage.getItem("UUID")
		});
	});
//     twitter
	$('#logoTwitter').click(function(event) {
		mixpanel.track("Click Twitter", {
			"UUID" : localStorage.getItem("UUID")
		});
	});
//     facebook
	$('#logoFacebook').click(function(event) {
		mixpanel.track("Click facebook", {
			"UUID" : localStorage.getItem("UUID")
		});
	});
//     help
	$('#iconHelp').click(function(event) {
		mixpanel.track("Click help icon", {
			"UUID" : localStorage.getItem("UUID")
		});
	});
//     mixpanel
	// Is this a good idea to modify the premade
//     soixantecircuits website
	$('#soixantecircuitsWebsite').click(function(event) {
		mixpanel.track("Click soixantecircuits website", {
			"UUID" : localStorage.getItem("UUID")
		});
	});
//     legal mentions
	$('#legalMentionsLink').click(function(event) {
		mixpanel.track("Click legal mentions", {
			"UUID" : localStorage.getItem("UUID")
		});
	});

// Toolbox
// Main button
//     main button sphere click
	$('#sphere').click(function(event) {
		mixpanel.track("Click sphere toolbox", {
			"UUID" : localStorage.getItem("UUID")
		});
	});
//     main button click
	$("#toolsMainContainerMainButton").click(function(event){
		mixpanel.track("Click toolbox", {
			"UUID" : localStorage.getItem("UUID")
		});
	});
//     main button double click
	$("#toolsMainContainerMainButton").dblclick(function(event){
		mixpanel.track("Double click toolbox", {
			"UUID" : localStorage.getItem("UUID")
		});
	});

// First panel
	$("#cropIcon").click(function(event){
		// crop disabled
		if( $("#cropIcon").hasClass("disabled") ){
			mixpanel.track("Click downloadIcon desactivated", {
				"UUID" : localStorage.getItem("UUID")
			});
		}
		// crop enabled
		if( ! $("#cropIcon").hasClass("disabled") ){
			mixpanel.track("Click cropIcon activated", {
				"UUID" : localStorage.getItem("UUID")
			});
		}
	});
	$("#downloadIcon").click(function(event){
		// download disabled
		if( $("#downloadIcon").hasClass("disabled") ){
			mixpanel.track("Click downloadIcon desactivated", {
				"UUID" : localStorage.getItem("UUID")
			});
		}
		// download enabled
		$("#downloadIcon").click(function(event){
			if( ! $("#downloadIcon").hasClass("disabled")){
				mixpanel.track("Click cropIcon activated", {
					"UUID" : localStorage.getItem("UUID")
				});
			}
		});
	});

// Second panel
//     add format screen
	$(".buttonBar").on("click", function(event) {
		if (($(event.target).data('width') && $(event.target).data('height'))) {
			var format = $(event.target).data('width')+":"+$(event.target).data('height');
			mixpanel.track("Click format screen ", {
			"UUID" : localStorage.getItem("UUID"),
			"format" : format
		});
		};
	});
//     add custom screen
	$("#addScreenForm").submit(function(event) {
		mixpanel.track("Submit add screen", {
			"UUID" : localStorage.getItem("UUID")
		});
	});
//     import screen
	$("#buttonImportScreen").click(function(event){
		mixpanel.track("Click toolbox", {
			"UUID" : localStorage.getItem("UUID")
		});
	});
//     export screen
	$("#buttonExportScreen").click(function(event){
		mixpanel.track("Click toolbox", {
			"UUID" : localStorage.getItem("UUID")
		});
	});
//     autocrop
	$("#toolsMainContainerMainButton").click(function(event){
		mixpanel.track("Click autocrop", {
			"UUID" : localStorage.getItem("UUID")
		});
	});

// Crop list

//     ...


});