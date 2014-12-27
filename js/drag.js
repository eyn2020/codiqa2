jQuery(function() {
	//alert("jquery ready");
	app.initialize();
});

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		// are we running in native app or in a browser?
		window.isphone = false;
		if(document.URL.indexOf("http://") === -1 
			&& document.URL.indexOf("https://") === -1) {
			window.isphone = true;
		}
		if( window.isphone ) {
			document.addEventListener("deviceready", onDeviceReady, false);
		} else {
			onDeviceReady();
		}
        //document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        navigator.splashscreen.hide();
        onDeviceReady();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function onDeviceReady() {
	//alert("phonegap ready");
	// phonegap ready
	scale = 1;
	deg = 0
	
	// setup drag/touch
	initTouch();
	initDraggable();
	//init_jGestures();
	//initButtons();
	init_camera();
}

// jquery draggable
function initDraggable () {
	//$("#draggable").css("transform","scale(1,1) rotate(0deg)");
	
	$( "#draggable" ).draggable();
}
function initTouch() {
	var e = document.getElementById("draggable");
	e.addEventListener("touchstart", touchHandler, true);
	e.addEventListener("touchmove", touchHandler, true);
	e.addEventListener("touchend", touchHandler, true);
	e.addEventListener("touchcancel", touchHandler, true);
	
	e.addEventListener("mousemove", mouseHandler, true);   
}
function initButtons () {	
	// init buttons
	$( "#maginc" )
		.button()
		.click(function( event ) {
			scale += .1;
			console.log("magify "+scale);
			transform();
	});
	$( "#magdec" )
		.button()
		.click(function( event ) {
			scale -= .1;
			console.log("magify "+scale);
			transform();
	});
	$( "#rotdec" )
		.button()
		.click(function( event ) {
			deg -= 5;
			console.log("rotate "+deg);
			transform();
	});
	$( "#rotinc" )
		.button()
		.click(function( event ) {
			deg += 5;
			console.log("rotate "+deg);
			transform();
	});

}
function transform() {
	$("#status").prepend("scale: "+scale+" deg: "+deg+"<br/>");
	$("#draggable").css("transform","scale("+scale+","+scale+") rotate("+deg+"deg)");
	$("#draggable").css("-ms-transform","scale("+scale+","+scale+") rotate("+deg+"deg)");
	$("#draggable").css("-webkit-transform","scale("+scale+","+scale+") rotate("+deg+"deg)");
}
function touchHandler(event) {
  var touches = event.changedTouches,
  first = touches[0],
  type = "";
  //$("#status").prepend("event.type: "+event.type+"<br/>");
  switch(event.type)
  {
	  case "touchstart": type="mousedown"; break;
	  case "touchmove":  type="mousemove"; break;        
	  case "touchend":   type="mouseup"; break;
	  default: return;
  }
  var simulatedEvent = document.createEvent("MouseEvent");
   simulatedEvent.initMouseEvent(type, true, true, window, 1,
					  first.screenX, first.screenY,
					  first.clientX, first.clientY, false,
					  false, false, false, 0/*left*/, null);
  first.target.dispatchEvent(simulatedEvent); 
  event.preventDefault();
}
function mouseHandler(event) {
	if (event.type=="mousemove") {
	  var left = $("#draggable").css("left");
	  var top = $("#draggable").css("top");
	  $("#status").prepend("move: "+left+","+top+"<br/>");
	}
}
