onload = function(){
  var divg = document.createElement("div");
  divg.setAttribute('id', 'vault');

  var warmButton = document.createElement("button");
  warmButton.setAttribute('id', 'vaultbutton');
  warmButton.innerHTML = "Warmer";

  var coldButton = document.createElement("button");
  coldButton.setAttribute('id', 'vaultbutton');
  coldButton.innerHTML = "Colder";

  divg.appendChild(warmButton);
  divg.appendChild(coldButton);
  document.body.appendChild(divg);
};
