document.getElementById("searchBar").addEventListener("keydown", function(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, {query: document.getElementById("searchBar").value}, function(response) {
    //
  });
});
});
