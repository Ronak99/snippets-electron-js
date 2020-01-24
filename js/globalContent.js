 

const app = require("electron");
const path = require("path");
/*
if(app == undefined){
	alert("This application is not meant to run on a browser. Please find its executable file to run it.");
	$("body").css("background","none");
	$("body").html("Credits : <b>Ronak Punase</b>");
}*/

const ipc = app.ipcRenderer;


const BrowserWindow = app.remote.BrowserWindow;

var dialog = app.remote.dialog;

var fs = require("fs");

var jsonFilePath = path.join(__dirname,'jsonRecord','storage.json');

var jsonThemeFilePath = path.join(__dirname,'jsonRecord','themes.json');

var directoryPath;
var themeObj = {}
var recievedTheme;
 
var browserTabCount = 0;
var fileTabCount = 0;
var explorerTabCount = 0;
var openedTabs = 0;
var untitledCount = 0;
var editorId;
var filetype="";
var codestatId;
var currentFileName;
var editor;
var explorerHidden = false;
var filePath = 'null';
var fileSaved;
var selectedTabId;
var characterLength = 0;
var closedTabs=0;
var widgetsShown = true;
var openedFiles = [];
var savedFiles = [];


var editorStyles = "position: relative;"+
        "top:0;"+
        "right: 0;"+
       " bottom: 90;"+
    	"left:0;"+
		"font-size:12pt;"+
		 "font-weight:normal;"+
		"white-space:nowrap;"+
		"display:none"+
		"z-index:999;";

var savingAllowed = false;

ipc.on("getThemeValue",function(event,arg){

	if(arg!="createCustomTheme"){
		if(editor!=undefined){
		editor.setTheme("../ace/theme/"+arg);	
		}
	}

	if(arg === "createCustomTheme"){

		displayCustomThemeBlock();

	}
	
	

});


ipc.on("setThemeValue",function(event,arg){

	if(editor!=undefined){
	editor.setTheme("../ace/theme/"+arg);	
	}

	themeObj.currentTheme = "../ace/theme/"+arg;

	writeJsonTheme(themeObj);

});

ipc.on("newfile",function(){
	createNewFile();
}) 
ipc.on("newfolder",function(){
	selectFolder();
}) 
ipc.on("save",function(){
	saveFile();
}) 


var fileObj = {

}

var times;

fs.readFile(jsonFilePath,"utf-8",function(e,data){

	var parseJson = JSON.parse(data);
	var defaultDirectoryPath;
	times = parseJson.firstTime;

	if(times === "true"){

		defaultDirectoryPath = path.join(__dirname,'getStarted');

		fileObj.firstTime = "false";
		fileObj.directoryPath = defaultDirectoryPath;

		writeJson(fileObj);

	}else{
		defaultDirectoryPath = parseJson.directoryPath;
	}

	directoryPath = defaultDirectoryPath;

	readDirectoryAt(defaultDirectoryPath);

	$("#folderName").html(getFileName(directoryPath));

});


