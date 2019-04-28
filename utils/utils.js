// Figure out how to move this into impact
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments))}};

String.prototype.addCommas = function(){

	//this += '';
	var x = this.split('.'),
	x1 = x[0],
	x2 = x.length > 1 ? '.' + x[1] : '',
	rgx = /(\d+)(\d{3})/;
	
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
 	
 	return x1 + x2;
};

if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

Number.prototype.addCommas = function(){
	// Convert to a string and add commas
	return String(this).addCommas();
};

$(function(){
	$('#share_facebook').on("click",function(){
		ga("send", "event", "share", "facebook");
	});
	$('#share_twitter').on("click",function(){
		ga("send", "event", "share", "twitter");
	});
});

if(window.addEventListener) {

	window.addEventListener('message', function(event){

		var supportedDomains = [
			"http://localhost:59848",
			"http://barney.hldm-br.net"
		]

		if(!supportedDomains.indexOf) return; // Is indexOf supported?

		// Make sure the domain is supported
		if(supportedDomains.indexOf(event.origin) === -1) return;

		//console.log(event.data); // Contains the data passed from the parent window

		// Call your function here
		var index = _.findIndex(ig.game.servicePacks, { 'id': event.data });

		if(ig.game.state.intro){
      if(index != -1) {
        ig.game.servicePacks[index].active = true;
        event.source.postMessage("Installation Complete.\n" + ig.game.servicePacks[index].mode + " Unlocked\nSystem Message: " + ig.game.servicePacks[index].system, event.origin);
        //return "Installation Complete.\n " + ig.game.servicePacks[index].mode + " Unlocked\n System Message: " + ig.game.servicePacks[index].system
      }
      else {
      	event.source.postMessage("Error x09082009: Service Pack Not Found", event.origin);
        //return "Error x09082009: Service Pack Not Found"
      }
    } else {
    	event.source.postMessage("Windows XP has encountered an error while installing your service pack.\nError x07311981: Service Pack timestamp has expired.", event.origin);
      //return "Windows XP has encountered an error while installing your service pack.\nError x07311981: Service Pack timestamp has expired."
    }

	}, false);

}
