var rootUrl = "http://localhost:3000";

onload = function(){
  var divg = document.createElement("div");
  divg.setAttribute('id', 'vault');

  var divm = document.createElement("span");
  divm.setAttribute('id', 'vaultmessage');
  divm.innerText = "Loading";

  var warmButton = document.createElement("button");
  warmButton.setAttribute('id', 'vaultbutton');
  warmButton.innerHTML = "Warmer";
  warmButton.onclick = likeCurrentPage;

  var coldButton = document.createElement("button");
  coldButton.setAttribute('id', 'vaultbutton');
  coldButton.innerHTML = "Colder";
  coldButton.onclick = dislikeCurrentPage;

  divg.appendChild(warmButton);
  divg.appendChild(coldButton);
  divg.appendChild(divm);
  document.body.appendChild(divg);

  var recommendationPath = rootUrl + "/sites/get_recommendation.json";
  simpleGet(recommendationPath);
};

function likeCurrentPage() {
  var likePath = rootUrl + "/sites/like.json?url=" + document.URL;
  simplePost(likePath);
}

function dislikeCurrentPage() {
  var dislikePath = rootUrl + "/sites/dislike.json?url=" + document.URL;
  simplePost(dislikePath);
}

function simplePost(apiUrl) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);
  xhr.send();
}

function simpleGet(apiUrl) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // JSON.parse does not evaluate the attacker's scripts.
      document.getElementById('vaultmessage').innerText = xhr.responseText;
    }
  }
  xhr.send();
}
