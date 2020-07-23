let requestURL = "public/members.json";
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
    var urlShort = url.replace(/(^\w+:|^)\/\//, '').split("?")[0];
    var urlCell = document.createElement("td");
    urlCell.innerHTML = "<a href='"+url+"' target='_blank'>"+urlShort+"</a>";
    row.appendChild(urlCell);

    table.appendChild(row);
  }
}
