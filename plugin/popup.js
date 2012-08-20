
      function windowLoaded() {
        //document.getElementById('currentLink').innerHTML = "please";
        document.getElementById("upvote").object.addEventListener("click", play, false);
         //document.getElementById('currentLink').innerHTML = "pddlease";
      }
      function play() {
        document.getElementById('currentLink').innerHTML = "workingbitch";
      }

function play() {
  document.getElementById('currentLink').innerHTML = "working";
}
//var likeButton = window.getElementById('Warmer');
//var dislikeButton = window.getElementById('Colder');
//likeButton.addEventListener("click", simple)
window.addEventListener("load", windowLoaded, false);

function fetchVaultSuggestion() {
  chrome.tabs.getSelected(null, function(tab) {
    simpleGet(tab.url, changePopup);
  });
}

function simpleGet(currentUrl, callback) {
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
  var url = 'http://localhost:3000/sites/get_recommendation.json';
  xhr.open('GET', url, true);
  xhr.send();
}

function likeCurrentPage() {
  /*var apiUrl = 'http://localhost:3000/sites/like';
  chrome.tabs.getSelected(null, function(tab) {
    simplePost(apiUrl, tab.url);
  });*/
  document.getElementById('currentLink').innerHTML = "liked"
}

function dislikeCurrentPage() {
  var apiUrl = 'http://localhost:3000/sites/dislike';
  chrome.tabs.getSelected(null, function(tab) {
    simplePost(apiUrl, tab.url);
  });
  document.getElementById('currentLink').innerHTML = "disliked"
}

function simplePost(apiUrl, currentUrl) {
    var form = createElement("form", {action: apiUrl,
                                      method: "POST",
                                      style: "display: none"});
    form.appendChild(createElement("input", {type: "hidden",
                                                             name: "url",
                                                             value: currentUrl}));
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

function changePopup(data, oldUrl) {
  if(data.recommended_url) {
    document.getElementById('currentLink').innerHTML = oldUrl+ " " + data.recommended_url;
  }
}
