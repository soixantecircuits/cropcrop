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
});