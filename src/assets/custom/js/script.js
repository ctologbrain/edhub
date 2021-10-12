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
$("#pricingRange").on("input", function () {
  var value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background =
    "linear-gradient(to right, #f05454 0%, #f05454 " +
    value +
    "%, #b5b5b5 " +
    value +
    "%, #b5b5b5 100%)";
});

$(window).on('load', function() {
  
  let cpRowOneAllHeights = []
  var rowIndex = $(".compare-part").length;
  var maxHeight = 0;
  var compareColumnWidth = 0;
  var compareParentContainerWidth = $(".compare-product-panel").parent(".col-9").outerWidth();


  if(compareParentContainerWidth == 720){
    compareColumnWidth = compareParentContainerWidth / 2.25;
  }else  if(compareParentContainerWidth == 540){
    compareColumnWidth = compareParentContainerWidth / 1.8;
  }else if(compareParentContainerWidth == 405){
    compareColumnWidth = compareParentContainerWidth / 1.65;
  }else if(compareParentContainerWidth < 405){
    compareColumnWidth = compareParentContainerWidth / 1.65;
  }else{
    compareColumnWidth = compareParentContainerWidth / 3.25;
  }


  for(var i = 1; i <= rowIndex; i++) {
    $('.cp-row-' + i ).each(function () {
      $('.comp-pro-item').css("width", compareColumnWidth);
      cpRowOneAllHeights.push($(this).outerHeight());
    });
    maxHeight = Math.max.apply(Math, cpRowOneAllHeights);
    $('.cp-row-' + i ).css("height", maxHeight);
    // console.log(compareParentContainerWidth)
    cpRowOneAllHeights = []
  }
})