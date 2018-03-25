/*document.getElementById("searchBar").addEventListener("keydown", function(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, {query: document.getElementById("searchBar").value}, function(response) {
    //
  });
});
});
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {  
	parseJason();
    sendResponse();
});*/
linkCss();
var input = document.getElementById("input");
input.addEventListener("keyup", function()
{
	parseJason();
});
var jsonArray;
var xml;
var sections;
var colors = ["ff0000","ff4000","ff8000","ffbf00","ffff00","bfff00","80ff00","40ff00","00ff00","00ff40"];
function parseJason()
{
	xml = new XMLHttpRequest();
	xml.onreadystatechange = getData;
	xml.open("GET","http://13.72.105.141/search/rating/" + document.getElementById("rate").value + "/term/" + input.value,true);
	//xml.open("GET","http://13.72.105.141/search/term/" + input.value,true);
	xml.send();
}

function linkCss()
{
	var head  = document.getElementsByTagName('head')[0];
		var stylesheet  = document.createElement('link');
		stylesheet.rel  = 'stylesheet';
		stylesheet.type = 'text/css';
		stylesheet.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
		head.appendChild(stylesheet);
	
}

function returnValue()
{
	var retur = document.getElementById("rate");
	retun.setAttribute("title", retur.value);
	
}
function getData()
{
	if(xml.readyState == XMLHttpRequest.DONE && xml.status == 200)
	{
		console.log(xml.responseText);
		jsonArray = JSON.parse(xml.responseText);
		fillInCards();
	}
	else{
		console.log("There was a problem with connection");
	}
	
}

function fillInCards()
{	
	document.getElementById("searchDisplay").innerHTML="";
	sections = [];
	
	jsonArray.forEach(function(element)
	{
		var category = element.category;
		if(!(category in sections))
		{
			createSection(category);
			console.log("IM HERE");
		}

			var card = document.createElement("article");
			card.setAttribute("id", "card" + element.video_id);
			
			var deck = document.getElementById("deck"+category);
			console.log(deck);
			deck.appendChild(card);
			
			var img = document.createElement("IMG");
			img.setAttribute("class","card-image-top");
			img.setAttribute("src",""+ element.image);
			img.setAttribute("alt",element.title);
			card.appendChild(img);
			
			
			
			var title = document.createElement("H5");
			title.setAttribute("class","card-title");
			title.appendChild(document.createTextNode(element.title));
			card.appendChild(title);
			
			var description = document.createElement("P");
			description.setAttribute("class","card-text");
			description.appendChild(document.createTextNode(element.description));
			
			card.appendChild(description);
			//card.innerHTML += element.description;
			
			var tags = element.tags;
			var tag = document.createElement("DIV");
			tag.setAttribute("id","tags");
			apendTags(tags,tag);
			card.appendChild(tag);
			
			var rating = document.createElement("h6");
			rating.setAttribute("id","emotionBar");
			emotionSetter(element.rating, rating);
			card.appendChild(rating);
			
			var btn = document.createElement("A");
			btn.setAttribute("href",element.link);
			btn.setAttribute("class","btn btn-primary");
			btn.setAttribute("id","readmore");
			btn.setAttribute("target","_blank");
			btn.setAttribute("title","Lire plus par rapport a l'article");
			btn.appendChild(document.createTextNode("Lire plus..."));
			card.appendChild(btn);
			
		
		
	});
	
}
function apendTags(array, parentNode)
{
	for(var i = 0; i < 4; i++)
	{
		var linkA = document.createElement("A");
		linkA.appendChild(document.createTextNode("#"+array[i]));
		linkA.setAttribute("title", "Lien pour twiter");
		linkA.setAttribute("target","_blank");
		linkA.setAttribute("href","https://twitter.com/hashtag/"+ array[i]);
		
		parentNode.appendChild(linkA);
	}
}

function emotionSetter(rating, append)
{
	for(var i = 0 ; i<rating;i++)
	{
		var emotion = document.createElement("h5");
		emotion.setAttribute("style","color: #"+colors[i]);
		emotion.appendChild(document.createTextNode("◙"));
		append.appendChild(emotion);
	}
	for (var j=rating; j < 10; j++)
	{
		var emotion = document.createElement("h5");
		emotion.setAttribute("style","color: #d1e1f9; ");
		emotion.appendChild(document.createTextNode("◙"));
		append.appendChild(emotion);
	}
	
}
function createSection(name)
{
	    var section = document.createElement("SECTION");
		document.getElementById("searchDisplay").appendChild(section);
		var heading = document.createElement("H3");
		heading.appendChild(document.createTextNode(name));
		section.appendChild(heading);
		var cardDeck = document.createElement("SECTION");
			cardDeck.setAttribute("id", "deck"+name);
			cardDeck.setAttribute("title","Categorie : " + name);
			section.appendChild(cardDeck);
		
		sections[name] = section;
		
		return section;
}
