var rootUrl = "http://localhost:3000";

onload = function(){

  visitCurrentPage();

  var toolbar = document.createElement("div");
  toolbar.setAttribute('id', 'vault');

  add_new_comment_form(toolbar);
  //add_existing_comments(toolbar);
/*
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

    var recommendationPath = rootUrl + "/sites/get_recommendation.json";
  simpleGet(recommendationPath);
*/
  document.body.appendChild(toolbar);
};

function add_new_comment_form(component) {
  var form = document.createElement("form");
  var formUrl = rootUrl + "/website_comments/new"
  form.setAttribute("action", formUrl);
  form.setAttribute("method", "POST");

  var commentBox = document.createElement("input");
  commentBox.setAttribute("type", "text");
  commentBox.setAttribute("id", "comment");
  commentBox.setAttribute("placeholder", "Leave your comment...");
  form.appendChild(commentBox);

  var submitButton = document.createElement("button");
  submitButton.innerText = "Post";
  submitButton.onclick = submitForm;
  form.appendChild(submitButton);

  component.appendChild(form);

}

function submitForm() {
  document.form.submit();

}

function visitCurrentPage() {
  var visitPath = rootUrl + "/websites/visit";
  var params =  "url=" + document.URL;
  simplePost(visitPath, params);
}

function simplePost(apiUrl, params) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", apiUrl, true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.send(params);
}
/*
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
}*/
