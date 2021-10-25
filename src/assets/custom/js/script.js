document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".dropdown-menu").forEach(function (element) {
    element.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
  if (window.innerWidth < 992) {
    document
      .querySelectorAll(".navbar .dropdown")
      .forEach(function (everydropdown) {
        everydropdown.addEventListener("hidden.bs.dropdown", function () {
          this.querySelectorAll(".submenu").forEach(function (everysubmenu) {
            everysubmenu.style.display = "none";
          });
        });
      });
    document.querySelectorAll(".dropdown-menu a").forEach(function (element) {
      element.addEventListener("click", function (e) {
        let nextEl = this.nextElementSibling;
        if (nextEl && nextEl.classList.contains("submenu")) {
          e.preventDefault();
          console.log(nextEl);
          if (nextEl.style.display == "block") {
            nextEl.style.display = "none";
          } else {
            nextEl.style.display = "block";
          }
        }
      });
    });
  }
});

let oldUrl = '';

setInterval(() => {
  let currentUrl = window.location.href;
  if(currentUrl != oldUrl){
    setTimeout(function(){
      let htmlData = $("._1nhfz2");
      for (let i = 0; i < htmlData.length; i++) {
        let matches = htmlData[i].src.split('imageproxy/')[1]
        let matches2 = matches.split('?')[0]
        htmlData[i].src = matches2
      }
    }, 3000);
    oldUrl = currentUrl;
  }
}, 1000);