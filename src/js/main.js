window.addEventListener("load", () => {
  document.querySelector("#loader").style.display = 'none';
  console.log(window.location.hash);
  let pageChange = window.location.hash;
  onRouteChanged(pageChange);
});

// Sidebar config
document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelector(".sidenav");
  let options = {
    edge: 'left',
    dragable: true,
    preventScrolling: true
  }
  let instances = M.Sidenav.init(elems, options);
  
  document.querySelectorAll(".topnav li a, .sidenav li a").forEach(elm => {
    elm.addEventListener("click", event => {
      const instance = M.Sidenav.getInstance(elems)
      instance.close();
    })
  })
});

function loadPage(page){
  fetch(`${page}`)
  .then(res => {
    return res.text();
  })
  .then(html => {

    // convert the html string into a document object
    /*const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');*/
    const bodyContent = document.querySelector("#body-content")
    bodyContent.innerHTML = html;
  })
  .catch(err => console.error(err));
}

function onRouteChanged(pageChange){
  const hash = window.location.hash;
  let page = '';

  switch(hash || pageChange){
    case '#about': page = '/pages/about/about.html';
    break;
    case '#portofolio': page = 'pages/portofolio/portofolio.html';
    break;
    case '#blog': page = '/pages/blogs/blog.html';
    break;
    case '#chitchat': page = '/pages/chitchat/chitchat.html';
    break;
    case '#home': page = '/pages/home/home.html';
    break; 
    default: page = '/pages/home/home.html';
    break;
  }

  loadPage(page);

}

window.addEventListener("hashchange", onRouteChanged);