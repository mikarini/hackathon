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