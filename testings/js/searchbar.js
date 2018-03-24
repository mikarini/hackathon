var request;

sendRequest();

function sendRequest(){
	request = new XMLHttpRequest();
	request.open("GET", "https://http.cat/100", true);
	request.onreadystatechange = parseResponse
	request.send();
}

function parseResponse(){
	if (this.status === 200) {
		console.log(request.response);
	}
	else
		console.log("Whoops! Something went horribly wrong when recieving the request!");
}
function display()
{
	console.log("Hey");
	/*doc.innerHTML = '<div class="card" style="width: 18rem;">'
	  +'<img class="card-img-top" src="..." alt="Card image cap">'
	  +'<div class="card-body">'
		+'<h5 class="card-title">Card title</h5>'
		+'<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>'
		+'<a href="#" class="btn btn-primary">Go somewhere</a>'
	  +'</div>'
	+'</div>";'*/
}
