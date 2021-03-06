$(() => {
  $("#navbar").load("../components/navbar.html", loginIfNeeded);
  $("#footer").load("../components/footer.html");
  $("#content").load("../components/all-posts.html"); // this html file contains its own scripts
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
