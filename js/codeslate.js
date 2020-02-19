

function writeJson(content){

	var data = JSON.stringify(content,null,2);

	fs.writeFile(jsonFilePath,data,function(e){

		if(e){
			alert("restart snippets please");
		}

	});
 

} 

function writeJsonTheme(content){

	var data = JSON.stringify(content,null,2);

	fs.writeFile(jsonThemeFilePath,data,function(e){

		if(e){
			alert("restart snippets please");
		}

	});

}

function push(theFileAddress){

	console.log("push function has worked");

	openedFiles.push(theFileAddress);
}

function pop(fileTabId){
	var fileToPop = $("#"+fileTabId).attr("fileaddress");
	var index = openedFiles.indexOf(fileToPop);

	openedFiles.splice(index,1);
	
}

function universalFileOpener(theFileAddress){
	//this check is done in order to ensure that one file is appended only once in the
	//file container

	console.log(theFileAddress);

	if(thisIsTheFirstFile(theFileAddress)){
		filePath = theFileAddress;

		push(theFileAddress);

		savingAllowed = true;

		mode = getFileExtension(filePath).toLowerCase();
		
		currentFileName = getFileName(filePath);

		//modify the title bar in the file
		modifyTitleBar(currentFileName);
		
		//increases fileTabCount and puts the file in the explorer with the fileaddress provided from here
		appendFileInFileContainer(filePath);

		//responsible for the look and feel that tabs are being selected and new file also has fileselected class
		detectNewlyOpenedFile(fileTabCount);

		//reads the selected file and then sets it in the editor
		readFile(filePath);
		
		//opens the respective code slate for each tab
		openNewCodeSlate(fileTabCount,filePath);

	}else{

	}
		
}


function openNewFile(){
	
	function openFileArg(fileNames){
		
		universalFileOpener(fileNames[0]);
		filePath = fileNames[0];


	}
	
	dialog.showOpenDialog(openFileArg);

}



function displayCustomThemeBlock(){

	console.log("making custom theme here");
}



function parseMode(mode){
	
	if(mode==="js"){
	   mode = "javascript";
	}
	if(mode==="ts"){
		mode = "typescript";
	}
	if(mode==="py"){
		mode = "python"
	}

	return mode;
}

function getFileName(argName){
	//console.log("get file name");
	var intermediate = argName.split('\\');
	return intermediate[ intermediate.length - 1 ];
}

function getFileExtension(argName){
	
	var fileName = getFileName(argName);
	var ext = fileName.split(".");
	
	return ext[ext.length-1];
}


function createNewFile(){
	
	mode = "txt";
	$(".editorContainer div[id^='codeslate_']").css("display","block");
	$(".editorContainer div[id^='codestat']").css("display","block");
	savingAllowed = true;
	
	//adds new tab and sets the fileaddress to null in the explorer
	addNewExplorerTabInFilesContainer();
	//opens new coding screen
	openCodeSlate(fileTabCount);
	
	detectNewlyOpenedFile(fileTabCount);

	populateTitleText();
	
}



function modifyTitleBar(fileName){

	var fileNameComponent = document.getElementById("currentFileName");
    /* if condition fulfills           if                                then                                   else        */
	fileNameComponent.innerHTML = (openedTabs>0) ? (fileNameComponent.innerHTML = fileName + " - ") : (fileNameComponent.innerHTML = fileName);

}


function showShortcuts(){


	const modalPath = path.join('file://',__dirname,'shortcutWindow.html');
	let win = new BrowserWindow({ width:800, height:200, minHeight:100, minWidth:600, frame:true });
	win.on("close",function(){
		win=null;
	});

	win.loadURL(modalPath);
	win.show();


}


function settings(theme){


	const modalPath = path.join('file://',__dirname,'settings.html'+'#'+theme);
	let win = new BrowserWindow({ width:800, height:550, minHeight:300, minWidth:550, maxWidth:800, maxHeight:800, frame:false });
	win.on("close",function(){
		win=null;
	});

	win.loadURL(modalPath);
	win.show();


}


//so I am going to show you how to work when there isomething to work with

//so this is a video that I now recorded in mp4 and it seems like this is  a fair choice



//now i am going to select folders



function selectFolder(){

dialog.showOpenDialog({

    	properties: ['openDirectory']

  		}, function(dir,e){
  			if(dir!==undefined){

  			$(".exploredFilesContainer").html("");

  			var selectedDirectory = dir[0];	

  			directoryPath = selectedDirectory;

  			readDirectoryAt(selectedDirectory);

  			$("#folderName").html(getFileName(selectedDirectory));

  			fileObj.directoryPath = selectedDirectory;

  			writeJson(fileObj);

  			}else{
  			
  			}

});


}


function syncFiles(){

	$(".exploredFilesContainer").html("");
	readDirectoryAt(directoryPath);


}


function readDirectoryAt(selectedDirectory){
	
	var i;	

	
	fs.readdir(selectedDirectory, function(err,dir){

  			 
        	for(i=0; i<dir.length; i++){

        		var folderFileAddress = selectedDirectory+"\\"+dir[i];
			

        		currentFileName = getFileName(folderFileAddress);

        		mode = getFileExtension(folderFileAddress).toLowerCase();

				appendFileInExploredContainer(folderFileAddress);
		
        	}

			
		
		});

}


//debug the add new explporer tab

function addNewExplorerTabInFilesContainer(){

	fileTabCount++;
	openedTabs++;
	untitledCount++;
	
	var tabId = "tabId_"+fileTabCount;
	var fileAddress = "null";
	var fileName = "Untitled - "+untitledCount;
	
	
	$(".filesContainer").append("<li>"+returnListDesign(tabId,fileAddress,fileName,false)+"</li>");
	
	filePath = fileAddress;
	
}

 


function returnListDesign(tabId, fileAddress, fileName, fileSaved){

 var des =	"<span onclick='closeTab("+tabId+")' class='closeTabIcon'>X</span>" +
	"<div id='"+tabId+"' fileaddress='"+fileAddress+"' class='filenameSpan'  onclick='toggleCodingScreensFromFilesContainer(id);'>"+fileName ; 
	des += updateFileSave(fileSaved); 
	
	
 return des;
	
}


function returnExplorerDesign(tabId, fileAddress, fileName){

var closingTabId = tabId;
var des;
var symbolId = "symbol_"+numberReturner(tabId);

var functionToCall = '';

var ext = getFileExtension(fileAddress);
var symbol = '';

if(ext===fileName){
	//when its a folder
	functionToCall = 'openFolder(id)';
	symbol = "<div class='symbol folderClosed' id='"+symbolId+"'></div>";

}else{

	//when its  a file
	functionToCall = desiredFunctions(ext);
	symbol = "<div class='symbol fileSymbol' id='"+symbolId+"'></div>";
}

des ="<div id='"+tabId+"' fileaddress='"+fileAddress+"' class='filenameSpan'";
des += "oncontextmenu='contextMenuForExploredContainer(event,id);'";
des += "onclick="+functionToCall+">"+symbol+"<span id='"+tabId+"_fileName'>"+fileName+"</span>";

return des;


}


function openFolder(id){

	var listElement = $("#"+id);

	var subId = "subId_"+numberReturner(id);
	var address = listElement.attr("fileaddress");
	var symbolId = "symbol_"+numberReturner(id);

	$("#"+subId).html("");
	$("#"+subId).toggleClass("opened");

	if($("#"+subId).hasClass("opened")){

		$("#"+symbolId).removeClass("folderClosed");
		$("#"+symbolId).addClass("folderOpen");

	}else if(!$("#"+subId).hasClass("opened")){

		$("#"+symbolId).removeClass("folderOpen");
		$("#"+symbolId).addClass("folderClosed");

	}

	fs.readdir(address,function(err,dir){


			for(i=0; i<dir.length; i++){

        		var folderFileAddress = address+"\\"+dir[i];
			
				currentFileName = getFileName(folderFileAddress);

        		mode = getFileExtension(folderFileAddress).toLowerCase();

				appendFileInSubfileContainer(folderFileAddress,subId);
		
        	}

	});

}


function desiredFunctions(ext){

	switch(ext.toLowerCase()){

		case "html":case "css":case "txt": case "php": case "json":case"js":
		case "php":case "py":case "xml":case "ts": case "cpp": case"java": case "dart":
		return 'toggleCodingScreensFromExplorerContainer(id)';
		
		case "png":case "PNG":case "JPG":case "jpg": case"jpeg": case "JPEG":case "psd":
		case "gif":
		case "webp":
		return 'togglePictureViewFromExplorerContainer(id)';

		case "mp4":case "flv":case "mkv":
		return 'toggleVideoViewFromExplorerContainer(id)';
		
		
	}

}





function updateFileSave(fileSaved){
	
	var statement;
	
	if(fileSaved){
		 
	 statement = "<div class='writeIndicator' style='opacity:0;'></div></div>";
		 
	 }
	else{
		
	 statement = "<div class='writeIndicator' style='opacity:1;'></div></div>";	
		
	 }
	
	return statement;
	
}




function toggleCodingScreensFromFilesContainer(explorerTabId){

			var tabNumber = numberReturner(explorerTabId);
	
			toggleCodeSlate(tabNumber);
		
			deselectAllFiles();

			selectedTabId = explorerTabId;

			$(".filesContainer #"+explorerTabId).parent().addClass("selectedFile");
	
			populateTitleText();
}


function thisIsTheFirstFile(currentFileAddress){
	var check = true;
	for(var i=0; i<=openedFiles.length; i++){

		if(currentFileAddress == openedFiles[i]){
			check = false;
			break;
			
		}
	}
	return check;
}

//toggling coding screens from explorer container
function toggleCodingScreensFromExplorerContainer(explorerTabId){
		
		//check whether the current file is already in the filecontainer or not
		
			var tabNumber = numberReturner(explorerTabId);
			var currentFileAddress = $("#"+explorerTabId).attr("fileaddress");

			universalFileOpener(currentFileAddress);
		
}




function togglePictureViewFromExplorerContainer(explorerTabId){

	var fileaddress = $("#"+explorerTabId).attr("fileaddress");
	var tabNumber = numberReturner(explorerTabId);

			openPictureView(tabNumber, fileaddress);
			
			toggleScreens("imageSlate_"+tabNumber);

			deselectAllFilesInExplorer();

			selectedTabId = explorerTabId;

			populateTitleText();

}

function toggleVideoViewFromExplorerContainer(explorerTabId){

	var fileaddress = $("#"+explorerTabId).attr("fileaddress");
	var tabNumber = numberReturner(explorerTabId);

			openVideoView(tabNumber, fileaddress);
		
			toggleScreens("videoSlate_"+tabNumber);


			deselectAllFilesInExplorer();

			selectedTabId = explorerTabId;

			populateTitleText();
}



function numberReturner(id){
	return id.split("_")[1];
}

function toggleCodeSlate(tabNumber){
	
	hideContentFromContainer();
	
	var codeslateId = "codeslate_"+tabNumber;
	var codestatId = "codestat_"+tabNumber;
	
	$("#"+codeslateId).css("display","block");
	$("#"+codestatId).css("display","block");
	 
	findEditor(codeslateId);

}

function toggleScreens(element){

	hideContentFromContainer();

	$("#"+element).css("display","block");


}

function hideContentFromContainer(){


	$(".editorContainer div[id^='codeslate_']").css("display","none");
	$(".editorContainer div[id^='codestat_']").css("display","none");
	$(".editorContainer div[id^='imageSlate_']").css("display","none");
	$(".editorContainer div[id^='videoSlate_']").css("display","none");

}

function closeCurrentTab(){
	//for current tab..

	var currentTabNumber = numberReturner(selectedTabId);

	if(currentTabNumber!=1) currentTabNumber--;

	var closingTabId = selectedTabId;

	selectedTabId = "tabId_"+currentTabNumber;

	toggleCodingScreensFromFilesContainer(selectedTabId);

	closeTabLogic(closingTabId);


}

function closeTab(tabtoClose){
	
	var closingTabId = tabtoClose.id;

	var currentTabNumber = numberReturner(selectedTabId);

	if(currentTabNumber!=1) currentTabNumber--;

	selectedTabId = "tabId_"+currentTabNumber;

	toggleCodingScreensFromFilesContainer(selectedTabId);
	
	closeTabLogic(closingTabId);
} 

function closeTabLogic(closingTabId){

	if(fileTabCount>0){      
		var relevantCodingSlateId = "codeslate_"+numberReturner(closingTabId);
		var relevantCodingStatId = "codestat_"+numberReturner(closingTabId);
		
		$("#"+relevantCodingSlateId).css("display","none");
		$("#"+relevantCodingStatId).css("display","none");
		
		$("#"+closingTabId).parent().hide();
		--openedTabs;
			
	}	
		populateTitleText();
		 pop(closingTabId);

		 checkIfThereAreNoMoreTabsLeft();
}

function checkIfThereAreNoMoreTabsLeft(){
	if(openedTabs==0){
		modifyTitleBar(" ");
	 }
}

/*
	@param tabNumber : takes unique tabNumber 

	this function defines the editorDesign and its content and appends it to editContainer


	*/
function codeSlate(tabNumber){

	editorId = "codeslate_"+tabNumber;
	codestatId = "codestat_"+tabNumber;
	
	var editorDesign = "<div class='codeslate' id='"+editorId+"' style='"+editorStyles+"'></div>";
	
	var codeStatContent = "<div class='currentLang'>"+parseMode(mode)+"</div>";
	
	editorDesign+="<div class='codeStat' id='"+codestatId+"'> "+codeStatContent+" </div>";
	
	$(".editorContainer").append(editorDesign);
	
	
	if(tabNumber>1){
	   
		hideContentFromContainer();
		
	 }
	
	
	$("#"+editorId).css("display","block");
	$("#"+codestatId).css("display","block");
	

}


function openCodeSlate(tabNumber){
	
	//whenever a new file is created, ctrl-N
	
	codeSlate(tabNumber);
	findEditor(editorId);
}

function openPictureView(tabNumber,src){
	
	var imageContainer = "imageSlate_"+tabNumber;
	
	var viewDesign = "<div class='imageContainer' id='"+imageContainer+"'><img class='browsedImage' src='"+src+"'></div>";
	
	$(".editorContainer").append(viewDesign);
	
}

function openVideoView(tabNumber,src){
	
	var videoContainer = "videoSlate_"+tabNumber;
	var videoExt = getFileExtension(src);
	

	var videoSettings = "<video class='videoProp' controls autoplay>";
  	videoSettings	  +=  "<source src='"+src+"' type='video/"+videoExt+"'>";

	var viewDesign = "<div class='videoContainer' id='"+videoContainer+"'>"+videoSettings+"</div>";
	
	$(".editorContainer").append(viewDesign);
	
}




function openNewCodeSlate(tabNumber,filePath){
	
	//whenever a new file is opened, ctrl-O
	
	//console.log("opening a new code slate");

	codeSlate(tabNumber);
	var fileExt = getFileExtension(filePath);
	
	//console.log("finding the editor through opencodeslate");
	findEditor(editorId,fileExt);
}



function detectNewlyOpenedFile(getId){
	
	deselectAllFiles();
	
	var newTabId = "tabId_"+getId;
	var newTabAddress = $("#"+newTabId).attr("fileaddress");
	var selectedTabAddress = $("#"+selectedTabId).attr("fileaddress");
	
		$("#"+newTabId).parent().addClass("selectedFile");
		selectedTabId = newTabId;
	
}

function detectNewlyOpenedFileInExplorer(getId){

	deselectAllFilesInExplorer();
	
	var newTabId = "tabId_"+getId;
	
	$("#"+newTabId).parent().addClass("selectedFile");
	
	selectedTabId = newTabId;

}


function deselectAllFilesInExplorer(){

	if($(".explorerContainer li").hasClass("selectedFile")){
		
	$(".explorerContainer li").removeClass("selectedFile");
		
	}

}

function deselectAllFiles(element){
	
	if($(".filesContainer li").hasClass("selectedFile")){
		
	$(".filesContainer li").removeClass("selectedFile");
		
	}
}



function appendFileInFileContainer(fileAddress){
	//console.log("appending the files in explorer");
	fileTabCount++;
	openedTabs++;
	
	//jsonContent.fileTabCount = fileTabCount;
	
	//writeJson(jsonContent);
	
	var tabId = "tabId_"+fileTabCount;
	var fileName = currentFileName;
	var fileAdd = fileAddress;
	
	$(".filesContainer").append("<li>"+returnListDesign(tabId, fileAdd, fileName,true)+"</li>");
	
	
};



function appendFileInExploredContainer(fileAddress){
	//console.log("appending the files in explorer");
	explorerTabCount++;
	
	
	var tabId = "explorerTabId_"+explorerTabCount;
	var subId = "subId_"+explorerTabCount;
	var fileName = currentFileName;
	var fileAdd = fileAddress;

	
	$(".exploredFilesContainer").append("<li>"+returnExplorerDesign(tabId, fileAdd, fileName)+"</li> <div class='subFileContainer' id='"+subId+"'></div>");
	

	
};


function appendFileInSubfileContainer(fileAddress,subId){
	//console.log("appending the files in explorer");
	explorerTabCount++;
	
	
	var tabId = "tabId_"+explorerTabCount;
	var furtherSubId = "subId_"+explorerTabCount;
	var fileName = currentFileName;
	var fileAdd = fileAddress;

	
	
	$("#"+subId).append("<li>"+returnExplorerDesign(tabId, fileAdd, fileName)+"</li> <div class='subFileContainer' id='"+furtherSubId+"'></div>");
	

	
};

var menuOpen = false;
var menu = $("#contextMenu");
var contextLi;

function contextMenuForExploredContainer(e,id,symbol){
	
	var currentfileaddress = $("#"+id).attr("fileaddress");

	contextMenuProp(e);

	contextLi = $("#"+id).parent();

	$(contextLi).addClass("contextSelected");

	var folder = $(".folderFiles");

	menu.append("<li id='deletefile_"+id+"' address='"+currentfileaddress+"' onclick='deleteCurrentFile(id)'>Delete File</li>");
	menu.append("<li id='renamefile_"+id+"' address='"+currentfileaddress+"' onclick='renameCurrentFile(id)'>Rename File</li>");

}


function contextMenuForEditor(e,id){

	contextMenuProp(e);

	menu.append("<li onclick='copyFileAddress(id)'>Copy File Address</li>");
	menu.append("<li onclick='copyFileAddress(id)'>Copy File Address</li>");
	menu.append("<li onclick='copyFileAddress(id)'>Copy File Address</li>");
	menu.append("<li onclick='copyFileAddress(id)'>Copy File Address</li>");
	menu.append("<li class='separator'></li>");
	menu.append("<li onclick='copyFileAddress(id)'>Copy File Address</li>");
	menu.append("<li onclick='copyFileAddress(id)'>Copy File Address</li>");

}


function contextMenuProp(e){

	/******** menu properties ********/
	var ypos;
	if(e.clientY>555){
		ypos = e.clientY-menu.height();
	}else{
		ypos = e.clientY;
	}
	menu.css({
		top:ypos+"px",
		left:e.clientX+"px"
	});

	menu.html("");

	menuOpen = true;
	menu.show();

}


function hideMenu(menu){
	if(menuOpen){
		menu.hide();
		$(contextLi).removeClass("contextSelected");
	}

}


function deleteCurrentFile(fileId){
	
	var addressOfFileToBeDeleted = $("#"+fileId).attr("address");
	var split = fileId.split("_");

	var tabId = split[1]+"_"+split[2];

	fs.unlink(addressOfFileToBeDeleted, (err) => {
  		if (err) throw err;
  		
  		$("#"+tabId).fadeOut("fast");

	});

}


function renameCurrentFile(fileId){
	
	var addressOfFileToBeRenamed = $("#"+fileId).attr("address");

	var fileName = getFileName(addressOfFileToBeRenamed);

	var split = fileId.split("_");
	
	var tabId = split[1]+"_"+split[2];

	$("#renameFileContainer").css("display","block");
	$("#renameInput").focus();

	$(document).on("keydown",function(e){
		if(e.keyCode===13){
			//renamefile
	
		var newName = $("#renameInput").val();
		
		var newAddress = addressOfFileToBeRenamed.replace(fileName,newName);

		$("#"+tabId).attr("fileaddress",newAddress);
		$("#"+tabId+"_fileName").html(newName);



			fs.rename(addressOfFileToBeRenamed, newAddress, (err) => {
  			if (err) throw err;
 			 	
			});

			$("#renameFileContainer").css("display","none");

		}

	});

}


function fileExplorerListAnimation(){
	//animates the list while loading a file

	$(".exploredFilesContainer").css({
		"opacity":0
	});
	$(".exploredFilesContainer").animate({
		"opacity":1
	},850);

}

function readFile(filePath){
//console.log("reading file");

 fs.readFile(filePath,'utf-8',function(e,data){
	//console.log("fs read called");
	editor.setValue(data);
	
});
 
};
																					



function saveFile(){
	
	if(savingAllowed){
	
		if(filePath == 'null'){	
			showSaveDialogAndSaveFile();
		}else{

			saveFileWithoutDialog();
		}
		
	}

}


function showSaveDialogAndSaveFile(){
	
	function saveFileArg(currentFileAddress){
		
		if(currentFileAddress === undefined){
		//alert("File name is undefined");
		return;						 
		}
		
		var content = editor.getValue();
		
		fs.writeFile(currentFileAddress, content, function(e){
			
			if(e){
				
			  alert("An error occured while saving the file");
				fileSaved = false;
				updateFileSave();
				
			}
			else{
				
				var tabIdNum = numberReturner(editor.container.id);
				
				var tabId = "tabId_"+tabIdNum;
				
				var currentFileName = getFileName(currentFileAddress);
				
				$("#"+tabId).parent().html(returnListDesign(tabId, currentFileAddress, currentFileName,true));
				
				populateTitleText();
				
				filePath = currentFileAddress;
				fileSaved = true;
				updateFileSave();
				
				var fileExt = getFileExtension(currentFileAddress);
	
				push(filePath);

				mode = parseMode(fileExt);
				
				//todo : update the ui aftr detecting the extension and then colour code the editor
				codeSlate(tabIdNum);
				

				savedFiles.push(currentFileAddress);
				
				//jsonContent.savedFiles = savedFiles;
				
				//writeJson(jsonContent);
				
				findEditor(editorId,fileExt);
				
			}
		});
		

		
	}
	
	dialog.showSaveDialog(saveFileArg);
	
	
}

function populateTitleText(){
	modifyTitleBar($("#"+selectedTabId).text());
	console.log($("#"+selectedTabId).text());
}

function saveFileWithoutDialog(){
	if(savingAllowed){
	var content = editor.getValue();
	
	var tabIdNum = numberReturner(editor.container.id);
				
	var tabId = "tabId_"+tabIdNum;
	
	fs.writeFile(filePath, content, (err) => {

    if (err) {
        alert("An error ocurred updating the file" + err.message);
        console.log(err);
		fileSaved = false;
		updateFileSave();
		
        return;
		
    }
		var opacity = $("#"+tabId+" .writeIndicator");
	
		opacity.css("opacity",0);
		fileSaved = true;
  		updateFileSave();
		
		var fileExt = getFileExtension(filePath);
	
		mode = parseMode(fileExt);
		
	
	});

	}
}


function toggleWidgets(){

	if(widgetsShown){
		$(".widgetsContainer").css("display","none");
		$("#widgetCheckbox").attr("checked","true");	
	}else{
		$(".widgetsContainer").css("display","block");	
		$("#widgetCheckbox").attr("unchecked","false");	
	}
	


	widgetsShown = !widgetsShown;

}


function hideExplorer(){
	
	
	
	if(!explorerHidden){
		
	$("#resizableExplorer").animate({
		width:"2px"
	},90);
	
		explorerHidden = true;
		
	}else{
		
	$("#resizableExplorer").animate({
		width:"215px"
	},90);
		
		explorerHidden = false;
		
	}
	
	
}




/********** ACE CONFIG **********/

function findEditor(id,mode){
	//console.log("finding the editor");
    editor = ace.edit(id);
	
	if(mode==="js"){
	   mode = "javascript";
	}
	if(mode==="ts"){
		mode = "typescript";
	}
	if(mode==="py"){
		mode = "python";
	}
	if(mode === "CPP"){
		mode = 'cpp';
	}

	$("#"+id).on("contextmenu",function(event){

		contextMenuForEditor(event,id);

	});	

	aceConfig(editor,id,mode);
	

	fs.readFile(jsonThemeFilePath,"utf-8",function(e,data){

	var parseJson = JSON.parse(data);

	editor.setTheme(parseJson.currentTheme);

	});

}

function aceConfig(editor,id,mode){
		
editor.getSession().on('change', function() {

	//dont add filesaved false here
	
	var tabNum = id.split("_")[1];
	var tabId = "tabId_"+tabNum;

	
	var opacity = $("#"+tabId+" .writeIndicator");
	
	opacity.css("opacity",1);	
	
	characterLength = editor.session.getValue().length;
});	


	 editor.session.setMode("../ace/mode/"+mode);

	
     editor.setOptions({
         enableBasicAutocompletion: true,
         enableSnippets: true
     });
 




	// pass options to ace.edit

//ace.createEditSession("string or array", "ace/mode/javascript")

	
editor.session.markUndoGroup(); 

	editor.find('function',{
    backwards: false,
    wrap: true,
    caseSensitive: true,
    wholeWord: false,
    regExp: true
});

	
editor.findNext();
editor.findPrevious();

editor.focus();
editor.setShowPrintMargin(false);

editor.getSession().setUseWrapMode(true)
	
	
}



/******** jquery ********/

 $( function() {
	 
    $( "#resizableExplorer" ).resizable({
		
	  maxHeight: 200,
      minWidth:2,
      minHeight: 200,
      handles: 'e'
		
	});
	 
	$(".explorerHeader").html("Current Files");
	 

	 $("#changeFolder").on("click",selectFolder);




	 $("#syncFiles").on("click",syncFiles);

	 $(".widgetsContainer span").on("click",toggleWidgets);

	 $("body").on("click",function(){
	 	hideMenu(menu);
	 });

	 if(widgetsShown){
	 	$("#widgetCheckbox").attr("checked","true");
	 }

  });


 $(".exploredFilesContainer").scroll(function(){

 	if(this.scrollTop > 8){
 		//show shadow
 		
 		
 		$(this).css("box-shadow","inset 0px 0px 5px rgba(0,0,0,0.5)");


 	}else{
 		//hide shadow
		
 		$(this).css("box-shadow","inset 0px 0px 5px transparent");
 	}

 });
