linkCss();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {  
	parseJason();
    sendResponse();
});

var jsonArray;
var xml;
var sections;

function parseJason()
{
	xml = new XMLHttpRequest();
	xml.onreadystatechange = getData;
	xml.open("GET","http://13.72.105.141/feed",true);
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
	document.getElementById("container-anchor").innerHTML="";
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
			card.setAttribute("style","width: 30%; border: 2px solid black; padding: 5px; margin: 10px; border-radius: 25px; align:center;");
			card.setAttribute("class", "content-col-text");
			card.setAttribute("id", element.video_id);
			
			var deck = document.getElementById("deck"+category);
			console.log(deck);
			deck.appendChild(card);
			
			var img = document.createElement("IMG");
			img.setAttribute("height","300");
			img.setAttribute("width","300");
			img.setAttribute("class","card-image-top");
			img.setAttribute("src",""+ element.image.href);
			img.setAttribute("alt","Image for " + element.title);
			card.appendChild(img);
			
			var cardBody = document.createElement("DIV");
			cardBody.setAttribute("class","card-body");
			card.appendChild(cardBody);
			
			var title = document.createElement("H5");
			title.setAttribute("class","card-title");
			title.appendChild(document.createTextNode(element.title));
			cardBody.appendChild(title);
			
			var description = document.createElement("P");
			description.setAttribute("class","card-text");
			description.appendChild(document.createTextNode(element.description));
			cardBody.appendChild(description);
			
			var rating = document.createElement("P");
			rating.setAttribute("class","card-text");
			if(element.rating < 5)
				rating.setAttribute("style", "color: #d24b4b");
			else
				rating.setAttribute("style", "color: #4da00d");
			rating.appendChild(document.createTextNode(element.rating));
			cardBody.appendChild(rating);
			
			var btn = document.createElement("A");
			btn.setAttribute("href","#");
			btn.setAttribute("class","btn btn-primary");
			btn.setAttribute("title","Read more about this article");
			btn.appendChild(document.createTextNode("Read more..."));
			cardBody.appendChild(btn);
		
	});
	
}
function createSection(name)
{
	    var section = document.createElement("SECTION");
		document.getElementById("container-anchor").appendChild(section);
		var heading = document.createElement("H3");
		heading.appendChild(document.createTextNode(name));
		section.appendChild(heading);
		var cardDeck = document.createElement("SECTION");
			cardDeck.setAttribute("class", "card-deck");
			cardDeck.setAttribute("id", "deck"+name);
			cardDeck.setAttribute("title","Categorie : " + name);
			section.appendChild(cardDeck);
		
		sections[name] = section;
		
		return section;
}