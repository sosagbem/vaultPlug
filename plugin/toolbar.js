$rootUrl = "http://localhost:3000"

$(document).ready(function(){
  visitCurrentPage();
  $toolbar = $(document.createElement('div')).attr("id","vault");
  newCommentForm().appendTo($toolbar);
  submitButton().appendTo($toolbar);
  existingCommentFields().appendTo($toolbar);

  $(document.body).append($toolbar);
});

// Components
/*
function submitButtons() {
  $submitButtons = $(document.createElement('div')).attr("id","submit-buttons");

  $connectedProvidersUrl = $rootUrl + "/providers/index"
  $.getJSON($connectedProvidersUrl, function(providers) {
    $submitButtons = $("#submit-buttons");
    $.each(providers, function(i, provider) {
      $(document.createElement('button')).click(submit).text(provider.name).appendTo($submitButtons);
    });
  });

  return $submitButtons;
}*/

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
function visitCurrentPage() {
  $visitPath = $rootUrl + "/websites/visit";
  $.post($visitPath, { url: currentUrl() });
}

function getExistingComments() {
  $commentsUrl = $rootUrl + "/website_comments/index";
  $.getJSON($commentsUrl, { url: currentUrl() }, populateComments);
}

//Helper methods
function currentUrl() {
  return $(location).attr('href');
}
