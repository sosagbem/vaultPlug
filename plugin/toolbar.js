$rootUrl = "http://localhost:3000"

$(document).ready(function(){
  visitCurrentPage();
  $toolbar = $(document.createElement('div')).attr("id","vault");
  ratings().appendTo($toolbar);
  newCommentForm().appendTo($toolbar);
  submitButton().appendTo($toolbar);
  existingCommentFields().appendTo($toolbar);

  $(document.body).append($toolbar);
});

// Components
function ratings() {
  $ratingsUrl = $rootUrl + "/websites/ratings";
  $ratings = $(document.createElement('div')).attr("id", "ratings");
  $.getJSON($ratingsUrl, function(ratingsDetails) {
    $ratings = $("#ratings");
    for(var i = 1; i <= parseInt(ratingsDetails.number_of_ratings); i++) {
        addImage($ratings, $rootUrl + ratingsDetails.rating_image_unselected_url, $rootUrl + ratingsDetails.rating_image_selected_url, i);
    }
  });
  return $ratings;
}

//would ideally do this inline above, but need to force create a new scope for the loop
function addImage(element, imagePath, switchPath, i) {
  $(document.createElement('img')).attr("id", "rating-" + i).prop("src", imagePath).mouseover(function() {
    for(var i = 1; i <= ratingNumber($(this).attr("id")); i++) {
      $("#rating-" + i).attr("src", switchPath);
    }
  }).mouseout(function() {
    for(var i = 1; i <= ratingNumber($(this).attr("id")); i++) {
      $("#rating-" + i).attr("src", imagePath);
    }
  }).click(function() {
    visitCurrentPage(ratingNumber($(this).attr("id")));
  }).appendTo(element);
}

function ratingNumber(ratingId) {
  return ratingId.match(/\d+/)[0];
}

function existingCommentFields() {
  $commentsPreview = $(document.createElement('div')).attr("id", "existing-comments");

  getExistingComments();

  return $commentsPreview;
}

function newCommentForm() {
  $formUrl = $rootUrl + "/website_comments/new";
  $form = $(document.createElement('form')).attr({
    action: $formUrl,
    id: "new-comment-form"
  });

  $hiddenUrl = $(document.createElement("input")).attr({
    type: "hidden",
    name: "url",
    value: currentUrl()
  }).appendTo($form);

  $commentBox = $(document.createElement("input")).attr({
    type: "text",
    name: "comment",
    id: "new-comment",
    placeholder: "Leave your comment..."
  }).appendTo($form);

  $providersUrl = $rootUrl + "/providers/index";
  $.getJSON($providersUrl, function(providers) {
    $form = $("#new-comment-form");
    $.each(providers, function(i, provider) {
      $providerId = "providerCheck-" + provider.name;
      $providerCheck = $(document.createElement("div")).attr("id", $providerId).appendTo($form);
      $(document.createElement('img')).prop("src", $rootUrl + provider.logo_url).appendTo($providerCheck);
      $(document.createElement('input')).attr({
        id: $providerId,
        name: provider.name,
        type: 'checkbox'
      }).appendTo($providerCheck);
    });
  });

  $form.submit(submit);
  return $form;
}

function submitButton() {
  $submitButton = $(document.createElement('button')).click(submit).text("Post");
  return $submitButton;
}

function submit() {
  $form = $("#new-comment-form");
  $.post($form.attr('action'), $form.serialize(), function(response){
    $("#new-comment").val('');
    getExistingComments();
  },'json');
  return false;
}

function populateComments(comments) {
  $commentsPreview = $("#existing-comments");
  $commentsPreview.empty();
  $.each(comments, function(i, comment) {
    $commentText = "@" + comment.created_at + " " + comment.preview_text;
    $(document.createElement('div')).attr("id", "comment").text($commentText).appendTo($commentsPreview);
  });
}

//API calls
function visitCurrentPage(rating) {
  rating = rating || -1;
  $visitPath = $rootUrl + "/websites/visit";
  $.post($visitPath, { url: currentUrl(), rating: rating });
}

function getExistingComments() {
  $commentsUrl = $rootUrl + "/website_comments/index";
  $.getJSON($commentsUrl, { url: currentUrl() }, populateComments);
}

//Helper methods
function currentUrl() {
  return $(location).attr('href');
}
