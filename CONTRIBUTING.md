# Contributing

## Join the Webring

Insert the following HTML code into your website.

```html
<div id="webring-wrapper">
  <a href="https://webring.hackclub.com/" id="previousBtn" class="webring-anchor" title="Previous">‹</a>
  <a href="https://webring.hackclub.com/" class="webring-logo" title="Hack Club Webring" alt="Hack Club Webring"></a>
  <a href="https://webring.hackclub.com/" id="nextBtn" class="webring-anchor" title="Next">›</a>
  <script src="https://webring.hackclub.com/public/embed.min.js"></script>
</div>
```

Next, add your name (or nickname!) and URL where you placed the above code snippet at the file [members.json](members.json). 

```javascript
{
        "member": "Your Name",
        "url": "https://yourwebsite.com"
}
```

Open a pull request ([tutorial here](https://github.com/hackclub/hackclub/blob/main/CONTRIBUTING.md#making-a-pull-request)!) and we'll review it within the next 48 hours. Cheers!
