function onLoad() {
  const pathName = window.location.pathname;
  const backButton = document.querySelector("#back-button");

  // show/hide
  if (pathName === "/") {
    backButton.classList.add("hidden");
  } else {
    backButton.classList.remove("hidden");
  }

  // add listener
  backButton.addEventListener("click", onBack)
}

function onBack(){
  history.back()
}

document.addEventListener("DOMContentLoaded", function(event) {
  onLoad();
});
