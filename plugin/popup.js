window.addEventListener("load", windowLoaded, false);

// get current url
// send to Vault
// get new recommendation
// put recommendation in popup

function windowLoaded() {
  chrome.tabs.getSelected(null, function(tab) {
    fetchVaultSuggestion(tab.url, changePopup);
  });
}
function fetchVaultSuggestion(currentUrl, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        changePopup(data, currentUrl);
      } else {
        changePopup("about:blank", currentUrl);
      }
    }

  }
  // Note that any URL fetched here must be matched by a permission in
  // the manifest.json file!
  //var url = 'http://www.sylverconn.com/';
  var url = 'http://localhost:3000/pages/index.json';
  xhr.open('GET', url, true);
  xhr.send();
}

function changePopup(data, oldUrl) {
  if(data.recommended_url) {
    document.getElementById('currentLink').innerHTML = oldUrl+ " " + data.recommended_url;
  }
}
