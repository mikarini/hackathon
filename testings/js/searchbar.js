//var jasonArray;

function parseJason()
{
	var xml = new XMLHttpRequest();
	xml.open("GET","https://api.radio-canada.ca/",true);
	xml.onreadystatechange = getData;
	xml.send();
}

function getData()
{
	if(xml.readyState === XMLHttpRequest.DONE && xml.status === 200)
	{
		console.log(JSON.parse(xml.responseText));
		fillInCards();
	}
	else{
		console.log("There was a problem with connection");
	}
	
}

function fillInCards()
{	
	for (var j = 0; j < 2 ; j++)
	{
		
		var cardDeck = document.createElement("DIV");
		cardDeck.setAttribute("class", "card-deck");
		document.getElementById("searchDisplay").appendChild(cardDeck);
		for(var i = 0; i < 3 ; i++)
		{
			var card = document.createElement("article");
			card.setAttribute("class", "card");
			card.setAttribute("id", "card");
			cardDeck.appendChild(card);
			
			var img = document.createElement("image");
			img.setAttribute("class","card-image-top");
			img.setAttribute("src","images/placeholder-images.jpg");
			img.setAttribute("alt","Card image cap");
			card.appendChild(img);
			
			var cardBody = document.createElement("DIV");
			cardBody.setAttribute("class","card-body");
			card.appendChild(cardBody);
			
			var title = document.createElement("H5");
			title.setAttribute("class","card-title");
			title.appendChild(document.createTextNode("Will need more info"));
			cardBody.appendChild(title);
			
			var description = document.createElement("P");
			description.setAttribute("class","card-text");
			description.appendChild(document.createTextNode("Some quick example text to build on the card title and make up the bulk of the card's content."));
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



