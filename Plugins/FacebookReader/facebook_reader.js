var steps=[];
var testindex = 0;
var loadInProgress = false;//This is set to true when a page is still loading
var page = require('webpage').create();

page.open('http://facebook.com/', function() {
 
console.log("Initialization successful");
steps=[
	function (){//Step 1 - Load Code Epicenter
 page.evaluate(function() {
  function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));}
  document.getElementById("email").value ="email@gmail.com";
  document.getElementById("pass").value =b64_to_utf8("PASSWORD_BASE64_ENCODED");
  document.getElementById("u_0_o").click();
});
	},
    function (){//Step 1 - Load Code Epicenter
       var x =  page.evaluate(function() {
            return 'Vous avez '+  document.getElementById("requestsCountValue").textContent + ' invitations; ' +  document.getElementById("mercurymessagesCountValue").textContent + ' nouveaux messages et ' + document.getElementById("notificationsCountValue").textContent + ' notifications.';
        });
        var fs = require('fs');
        var path = 'result.txt'
        fs.write(path,x,'w')
        
},
    function(){//STEP 2 - After page load, parse results. DO NOT CALL readResponse() IN STEP ONE, because our RESULT might be empty
		page.render('facebook.png');
	}
];
//Start interval to read website content
interval = setInterval(executeRequestsStepByStep,2000);
 
function executeRequestsStepByStep(){
	if (loadInProgress == false && typeof steps[testindex] == "function") {
		console.log("step " + (testindex + 1));
		steps[testindex]();
		testindex++;
	}
	if (typeof steps[testindex] != "function") {
		console.log("test complete!");
		phantom.exit();
	}
}
 
/**
* These listeners are very important in order to phantom work properly. Using these listeners, we control loadInProgress marker which controls, weather a page is fully loaded.
* Without this, we will get content of the page, even a page is not fully loaded.
*/
page.onLoadStarted = function() {
	loadInProgress = true;
	console.log(loadInProgress);
	console.log("Loading started");
};
page.onLoadFinished = function() {
	loadInProgress = false;
	console.log("Loading finished");
};
page.onConsoleMessage = function(msg) {
	console.log(msg);
};
});