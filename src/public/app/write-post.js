let btnSubmit = $("#btnSubmit");

btnSubmit.click(postArticle);

function postArticle(req, res) {
  $.post("/api/posts", {
    userId: currentUser.id,
    title: $("#title").val(),
    body: $("#body").val(),
  });
}
