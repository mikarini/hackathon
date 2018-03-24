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

function getData()
{
	if(xml.readyState == XMLHttpRequest.DONE && xml.status == 200)
	{
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
			card.setAttribute("class", "card");
			card.setAttribute("id", element.video_id);
			
			var deck = document.getElementById("deck"+category);
			console.log(deck);
			deck.appendChild(card);
			
			var img = document.createElement("IMG");
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