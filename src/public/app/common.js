$(() => {
  $("#navbar").load("../components/navbar.html", loginIfNeeded);
  $("#footer").load("../components/footer.html");
  $("#content").load("../components/all-posts.html", loadPosts);
});

function loginIfNeeded() {
  // checking for user in localstorage, if there exists a user, parse it, else set it to null
  window.currentUser = window.localStorage.user ? JSON.parse(window.localStorage.user) : null;
  if (!currentUser) {
    // second param : empty body : we don't need to give anybody to the request
    $.post("/api/users", {}, (user) => {
      if (user) {
        console.log("registered current user as ", user.username);
        window.localStorage.user = JSON.stringify(user);
        currentUser = user;

        // updating nav username on the top-right corner of the page
        $("#nav-username").text(currentUser.username);
      }
    });
  } else {
    console.log("resuming session as ", currentUser.username);

    // updating nav username on the top-right corner of the page
    $("#nav-username").text(currentUser.username);
  }
}

function loadPosts() {
  $.get("/api/posts", (posts) => {
    for (let post of posts) {
      $("#posts-container").append(
        $(`
        <div class="col-4">
          <div class="card m-2" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${post.user.username}</h6>
              <p class="card-text">
                ${post.body.substr(0, 200)}
                <a href="#">...read more</a>
              </p>
              <a href="#" class="card-link">Comment</a>
              <a href="#" class="card-link">Like</a>
            </div>
          </div>
        </div>
        `)
      );
    }
  });
}
