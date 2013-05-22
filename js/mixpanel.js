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
		mixpanel.track("Click GitHub");
	});
//     twitter
	$('#logoTwitter').click(function(event) {
		mixpanel.track("Click Twitter");
	});
//     facebook
	$('#logoFacebook').click(function(event) {
		mixpanel.track("Click facebook");
	});
//     help
	$('#iconHelp').click(function(event) {
		mixpanel.track("Click help icon");
	});
//     mixpanel
	// Is this a good idea to modify the premade
//     soixantecircuits website
	$('#soixantecircuitsWebsite').click(function(event) {
		mixpanel.track("Click soixantecircuits website");
	});
//     legal mentions
	$('#legalMentionsLink').click(function(event) {
		mixpanel.track("Click legal mentions");
	});

// Toolbox
// Main button
//     main button sphere click
	$('#sphere').click(function(event) {
		mixpanel.track("Click sphere toolbox");
	});
//     main button click
	$("#toolsMainContainerMainButton").click(function(event){
		mixpanel.track("Click toolbox");
	});
//     main button double click
	$("#toolsMainContainerMainButton").dblclick(function(event){
		mixpanel.track("Double click toolbox");
	});

// First panel
//     crop disabled
	// $("#cropIcon").click(function(event){
	// 	mixpanel.track("Click cropIcon desactivated");
	// });
//     crop enabled
	$("#cropIcon").click(function(event){
		mixpanel.track("Click cropIcon activated");
	});
//     download disabled
	// $("#downloadIcon").click(function(event){
	// 	mixpanel.track("Click cropIcon activated");
	// });
//     download enabled
	$("#downloadIcon.disabled").click(function(event){
		mixpanel.track("Click cropIcon activated");
	});

// Second panel
//     add format screen
	$(".buttonBar").on("click", function(event) {
		if (($(event.target).data('width') && $(event.target).data('height'))) {
			mixpanel.track(("Click format screen "+$(event.target).data('width')+":"+$(event.target).data('height')));
		};
	});
//     add custom screen
	$("#addScreenForm").submit(function(event) {
		mixpanel.track("Submit add screen");
	});
//     import screen
	$("#buttonImportScreen").click(function(event){
		mixpanel.track("Click toolbox");
	});
//     export screen
	$("#buttonExportScreen").click(function(event){
		mixpanel.track("Click toolbox");
	});
//     autocrop
	$("#toolsMainContainerMainButton").click(function(event){
		mixpanel.track("Click autocrop");
	});

// Crop list

//     ...


});