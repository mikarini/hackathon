chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	document.getElementById("container-anchor").innerHTML = request.query;
    sendResponse();
});