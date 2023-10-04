let requestURL = "./members.json";
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  const webring = request.response;

  var table = document.getElementById("table");

  for (var i=0; i<webring.length; i++) {
    var row = document.createElement("tr");

    var memberCell = document.createElement("td");
    memberCell.innerHTML = webring[i].member;
    row.appendChild(memberCell);

    var url = webring[i].url;
    var urlShort = new URL(url).hostname;
    var urlCell = document.createElement("td");
    urlCell.innerHTML = "<a rel='noopener' target='_blank' href='"+url+"' >"+urlShort+"</a>";
    row.appendChild(urlCell);

    table.appendChild(row);
  }
}