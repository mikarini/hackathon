document.onload = startSearch();

function startSearch(){
	linkCss();
	var input = document.createElement("INPUT");
	input.setAttribute("style", "display:block;");
	document.getElementsByClassName("header-audio-controller").appendChild(input);
	
	document.getElementsByClassName('hidden-tag')[0].setAttribute("aria-hidden", "false");
	
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


//JS from the file that I was working on.

var xml;

function parseJason()
{
	xml = new XMLHttpRequest();
	xml.onreadystatechange = getData;
	xml.open("POST","http://13.72.105.141",true);
	xml.send();
}

function getData()
{
	if(xml.readyState == XMLHttpRequest.DONE && xml.status == 200)
	{
		console.log(JSON.parse(xml.responseText));
		fillInCards();
	}
	else{
		console.log("There was a problem with connection");
		fillInCards();
	}
	
}
function displayResult()
{
	document.getElementById("container-anchor").innerHTML = "";
	for (var j = 0; j < 2 ; j++)
	{
		var section = document.createElement("SECTION");
		section.setAttribute("id","section");
		document.getElementById("container-anchor").appendChild(section);
		var heading = document.createElement("H3");
		heading.setAttribute("style","color: white;");
		heading.appendChild(document.createTextNode("Catégorie: Business"));
		section.appendChild(heading);
		
		var cardDeck = document.createElement("SECTION");
		cardDeck.setAttribute("class", "card-deck");
		cardDeck.setAttribute("title","Category: Commerce.");
		section.appendChild(cardDeck);

		
		for(var i = 0; i < 3 ; i++)
		{
			var card = document.createElement("article");
			card.setAttribute("class", "card");
			card.setAttribute("style", "border: 1px solid black; padding: 5px; margin: 10px;");
			card.setAttribute("id", "card");
			cardDeck.appendChild(card);
			
			var img = document.createElement("IMG");
			img.setAttribute("class","card-image-top");
			img.setAttribute("src","images/placeholder-images.jpg");
			img.setAttribute("alt","Image title");
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