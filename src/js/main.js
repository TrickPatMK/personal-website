document.addEventListener("load", () => {
  console.log(window.location);
  if (window.location.hash == "") loadPage("home");
});

// Sidebar config
document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelector(".sidenav");
  let options = {
    edge: "left",
    dragable: true,
    preventScrolling: true,
  };
  let instances = M.Sidenav.init(elems, options);

  document.querySelectorAll(".topnav li a, .sidenav li a").forEach((elm) => {
    elm.addEventListener("click", (event) => {
      event.preventDefault();

      document.querySelector("#loader").style.display = "block";

      const page = event.target.getAttribute("href");
      loadPage(page);

      const instance = M.Sidenav.getInstance(elems);
      instance.close();
    });
  });
});

function loadPage(direction) {
  // Define the path
  let hash = direction;
  let page = "";

  switch (hash) {
    case "#about":
      page = "/pages/about/about.html";
      break;
    case "#portofolio":
      page = "pages/portofolio/portofolio.html";
      break;
    case "#blog":
      page = "/pages/blogs/blog.html";
      break;
    case "#chitchat":
      page = "/pages/chitchat/chitchat.html";
      break;
    case "#home":
      page = "/pages/home/home.html";
      break;
  }

  fetch(`${page}`)
    .then((res) => {
      return res.text();
    })
    .then((html) => {
      const bodyContent = document.querySelector("#body-content");
      bodyContent.innerHTML = html;
      document.querySelector("#loader").style.display = "none";
    })
    .catch((err) => console.error(err));
}
