(function () {
  var wrapper = document.getElementById("webring-wrapper");

  var style = document.createElement('style');
  style.innerHTML = ".webring-anchor{font-size:24px;color:rgba(132,146,166,.8);text-decoration:none;transition:color .5s}.webring-anchor:hover{color:#8492a6;text-decoration:none}.webring-logo{background-image:url(https://assets.hackclub.com/icon-rounded.svg);background-repeat:no-repeat;background-position:top left;background-size:contain;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:inline-block;width:36px;height:36px;margin:0 4px;vertical-align:middle}";
  wrapper.appendChild(style);

  var siteHost = document.location.href.toLowerCase();
  var siteIndex = 0;
  var previousIndex = 0;
  var nextIndex = 0;

  var previousBtn = document.getElementById("previousBtn");
  var nextBtn = document.getElementById("nextBtn");

  let requestURL = "https://webring.hackclub.com/public/members.json";
  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    const webring = request.response;

    for (var i=0; i<webring.length; i++) {
      if (siteHost ==  webring[i].url.toLowerCase()) {
        siteIndex = i;
        break;
      }
    }

    previousIndex = siteIndex-1;
    if (previousIndex == -1)
      previousIndex = webring.length-1;
    previousBtn.href = webring[previousIndex].url;

    nextIndex = siteIndex+1;
    if (nextIndex == webring.length)
      nextIndex = 0;
    nextBtn.href = webring[nextIndex].url;
  }
})();
