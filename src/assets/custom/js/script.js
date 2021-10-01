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
$(".main-menu-dd-item").on("mouseover", function () {
  let mainDdHeight = $(".cousre-dd-main-menu").outerHeight();
  $(".cousre-dd-sub-menu").css("min-height", mainDdHeight);
});

$(".sub-menu-dd-item").on("mouseover", function () {
  let subDdHeight = $(".cousre-dd-sub-menu").outerHeight();
  $(".cousre-dd-sub-child-menu").css("min-height", subDdHeight);
});
