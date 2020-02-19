const { shell } = require('electron')

var webview;

var widgetShown = false;
var url;
var insideEl;
var viewContainer;

var injectedCss = "::-webkit-scrollbar { width: 10px; }";

injectedCss += "::-webkit-scrollbar-track { background: transparent; }";

injectedCss += "::-webkit-scrollbar-thumb {   background: #888; }";

injectedCss += "::-webkit-scrollbar-thumb:hover {   background: #b9c7d9; }";



function loadView(id) {

	$(".webviewContainer").css("display", "none");
	$("webview").css("visibility", "gone");


	//below code should only run if use is connected to the network
	if (id != "author") {
		if (navigator.onLine) {

			var viewId = id + "View";
			viewContainer = id + "ViewContainer";

			$("#noConnectionViewContainer").css("display", "none");
			$("#authorDetails").css("display", "none");

			$("#" + viewContainer).css("display", "block");
			$("#" + viewId).css("visibility", "");

			initWebview(viewId, viewContainer);

		} else {

			offline();
		}
	} else {
		showAuthorDetails();
	}

	widgetLogic();
}


function offline() {
	$(".webviewContainer").css("display", "none");
	$("webview").css("visibility", "gone");
	$("#noConnectionViewContainer").css("display", "block");
}

function showAuthorDetails() {
	$(".webviewContainer").css("display", "none");
	$("webview").css("visibility", "gone");
	$("#authorDetails").css("display", "block");
}


function loadUrl(url) {
	shell.openExternal(url);
}

function widgetLogic() {

	showWidget();
	widgetShown = !widgetShown
}

function showWidget() {

	$(".widgetLoader").css("display", "block");
	$(".widgetLoader").animate({
		width: "350px"
	}, 100);

}

function initWebview(webviewId, viewContainer) {

	webview = document.getElementById(webviewId);

	insideEl = "#" + viewContainer + " .widgetNavigator";

	webview.addEventListener('did-start-loading', loadStart)
	webview.addEventListener('did-stop-loading', loadStop)

	webview.addEventListener("dom-ready", function () {

		$(insideEl + " #goBack").click(backward);
		$(insideEl + "#goForward").click(forward);


		$(insideEl + " #pageLoadProgress").click(function () {

			hideWidget();

		});

		webview.insertCSS(injectedCss);

	});


	function loadStart() {

		if (!navigator.onLine) {
			offline();
		} else {

			$(insideEl + " #pageLoadProgress").css({
				"background-image": 'url("img/loading.gif")'
			});

		}

	}

	function loadStop() {

		$(insideEl + " #pageLoadProgress").css({
			"background-image": 'url("img/close.png")'
		});

	}

	function forward() {
		if (webview.canGoForward()) {

			webview.goForward();

		}
	}

	function backward() {

		if (webview.canGoBack()) {

			webview.goBack();

		}

	}

}


function hideWidget() {

	$(".widgetLoader").animate({
		width: "0px"
	}, 100);

	setTimeout(function () {
		$(".widgetLoader").css("display", "none");
	}, 100);

}

