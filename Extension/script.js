linkCss();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {  
	parseJason();
    sendResponse();
});

var jsonArray;
var xml;

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
		console.log(JSON.parse(xml.responseText)[0]);
		jsonArray = JSON.parse(xml.responseText);
		fillInCards();
	}
	else{
		console.log("There was a problem with connection");
	}
	
}

function fillInCards()
{	
	
	document.getElementById("container-anchor").innerHTML = "";
	for (var j = 0; j < 2 ; j++)
	{
		if(j == 0)
			var category = jsonArray[0].category;
		else
			var category = jsonArray[3].category;
		var section = document.createElement("SECTION");
		section.setAttribute("id","section");
		document.getElementById("container-anchor").appendChild(section);
		var heading = document.createElement("H3");
		heading.appendChild(document.createTextNode(category));
		section.appendChild(heading);
		
		var cardDeck = document.createElement("SECTION");
		cardDeck.setAttribute("class", "card-deck");
		cardDeck.setAttribute("title","Categorie : " + category);
		section.appendChild(cardDeck);

		
		for(var i = 0; i < 3 ; i++)
		{
			var anArticle = jsonArray[i];
			
			var card = document.createElement("article");
			card.setAttribute("class", "card");
			card.setAttribute("id", anArticle.video_id);
			cardDeck.appendChild(card);
			
			var img = document.createElement("IMG");
			img.setAttribute("class","card-image-top");
			img.setAttribute("src",""+ anArticle.image.href);
			img.setAttribute("alt","Image for " + anArticle.title);
			img.setAttribute("width", "300");
			img.setAttribute("height", "300");
			card.appendChild(img);
			
			var cardBody = document.createElement("DIV");
			cardBody.setAttribute("class","card-body");
			card.appendChild(cardBody);
			
			var title = document.createElement("H5");
			title.setAttribute("class","card-title");
			title.appendChild(document.createTextNode(anArticle.title));
			cardBody.appendChild(title);
			
			var description = document.createElement("P");
			description.setAttribute("class","card-text");
			description.appendChild(document.createTextNode(anArticle.description));
			cardBody.appendChild(description);
			
			var btn = document.createElement("A");
			btn.setAttribute("href","#");
			btn.setAttribute("class","btn btn-primary");
			btn.setAttribute("title","Read more about this article");
			btn.appendChild(document.createTextNode("Read more..."));
			cardBody.appendChild(btn);
		}
		
	}
	
}