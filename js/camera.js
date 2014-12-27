var pictureSource;   // picture source
var destinationType; // sets the format of returned value 

function init_camera() {
	// setup camera
	console.log("camera init");
	//alert("camera init");
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFail);
}
function onFileSystemSuccess(fileSystem) {
	alert("requestFileSystem success");
}
// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
	// Uncomment to view the base64 encoded image data
	//var smallImage = document.getElementById('smallImage');
	//smallImage.style.display = 'block';
	//smallImage.src = "data:image/jpeg;base64," + imageData;
	$("#smallImage").attr("src","data:image/jpeg;base64," + imageData);
	$("#smallImage").show();
	//$("#path").append("<br/>URI: " + "data:image/jpeg;base64," + imageData);
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
	$("#largeImage").attr("src",imageURI);
	$("#largeImage").show();
	$("#path").append("<br/>URI: "+imageURI);
	window.resolveLocalFileSystemURI(imageURI, onResolveSuccess, onFail);  
}
function onResolveSuccess(fileEntry) {
	
	$("#path").append("<br/>entry: "+fileEntry.name);
	$("#path").append("<br/>path: "+fileEntry.fullPath);
}
function capturePhoto() {
	console.log("capturePhoto");
	$("#path").html("capturePhoto");
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
		destinationType: destinationType.DATA_URL });
}

function capturePhotoEdit() {
	console.log("capturePhotoEdit");
	$("#path").html("capturePhotoEdit");
	// Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
		destinationType: destinationType.DATA_URL });
}

function getPhoto(source) {
	console.log("getPhoto");
	$("#path").html("getPhoto");
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
		destinationType: destinationType.FILE_URI, sourceType: source });
}

// Called if something bad happens.
// 
function onFail(message) {
  alert('Failed because: ' + message);
}

