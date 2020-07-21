var wrapper = document.getElementById("webring-wrapper");

var style = document.createElement('style');
style.innerHTML = `
.webring-anchor {
  font-size: 24px;
  color: rgba(132, 146, 166, 0.8);
  text-decoration: none;
}
.webring-anchor:hover {
  color: rgba(132, 146, 166, 1);
  text-decoration: none;
}
.webring-logo {
  background-image: url(https://assets.hackclub.com/icon-rounded.svg);
  background-repeat: no-repeat;
  background-position: top left;
  background-size: contain;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  display: inline-block;
  width: 36px;
  height: 36px;
  margin: 0 4px;
  vertical-align: middle;
}
`;
wrapper.appendChild(style);
