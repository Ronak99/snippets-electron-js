const app = require("electron");
const ipc = app.ipcRenderer;
const path = require("path");

if(require === undefined){
	console.log("ok");
}

var themeSelected;
var fs = require("fs");
var jsonThemeFilePath = path.join(__dirname,'jsonRecord','themes.json');




function readJsonThemeFile(){

fs.readFile(jsonThemeFilePath,"utf-8",function(e,data){

	var parseJson = JSON.parse(data);

	var themeSplit = parseJson.currentTheme.split("/");

	var themeName = themeSplit[themeSplit.length - 1];

	$(".row section").css({
	
			"border":"0px"
		});


	$("#"+themeName).css({
		"border":"5px solid #929dad"
	});



});

};

$(".cancel").click(function(){

	remote.getCurrentWindow().close()

});

	



readJsonThemeFile();

$(function(){

	var sectionLength = $(".defaultThemeBlock .row section").length;
	var id;
	var imgPath ;
	var scroll = 0;
	
	for(var i=1; i<=sectionLength; i++){

		id = $(".defaultThemeBlock .row section:nth-child("+i+")").attr("id");

		imgPath = 'themeScreenshots/'+id+'.png';

		$(".defaultThemeBlock .row section:nth-child("+i+")").css({
			"background":"url("+imgPath+") repeat-y",
			"background-size":"cover"
		});
	}


	$(".dropdownContainer").click(function(){

		$(".settingsNameContainer").css({
			"display":"block"
		});


	});


	$(".settingsContainer").click(function(){

		$(".settingsNameContainer").css({
			"display":"none"
		});


	});

	var hovering = false;


	$(".row section").click(function(){
		
		if(this.id!="createCustomTheme"){
		

		$(".row section").css({
	
			"border":"0px"
		});

		$(this).css({
			"border":"5px solid #929dad"
		});

		themeSelected = this.id;

		}

		ipc.send("themeValue",this.id);
	});


	$(".ok").click(function(){
		
		if(themeSelected!=undefined){
			ipc.send("selectedThemeValue",themeSelected);
			readJsonThemeFile();
			remote.getCurrentWindow().close();
		}else{
			alert("No new theme selected, theme is not going to change");
		}
		
		
	});

	$(".switchBlock button").click(function(){

		$(".defaultThemeBlock").css("display","none");
		$(".customThemeBlock").css("display","none");
		$(".switchBlock button").removeClass("selectedTab");

		var button = "."+this.id+"Block";

		$(button).css("display","block");
		$("#"+this.id).addClass("selectedTab");

	});

}) 