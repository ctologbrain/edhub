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
$(document).ready(function () {
  $(".slider-range").slider({
    range: true,
    min: 0,
    max: 150000,
    step: 100,
    slide: function (event, ui) {
      $("#min-price").html($(this).slider("values", 0));
      $("#max-price").html($(this).slider("values", 1));
      $('#min-price-input').val($(this).slider("values", 0));
      $('#max-price-input').val($(this).slider("values", 1));
    },
    change: function (event, ui) {
      $("#min-price").html($(this).slider("values", 0));
      $("#max-price").html($(this).slider("values", 1));
      $('#min-price-input').val($(this).slider("values", 0));
      $('#max-price-input').val($(this).slider("values", 1));
    },
    create: function (event, ui) {
      $(this).slider('values', 0, 0);
      $(this).slider('values', 1, 150000);
    },
  });

  $('input').change(function (e) {
    var setIndex = (this.id == "max-price-input") ? 1 : 0;
    $('.slider-range').slider("values", setIndex, $(this).val());
  });
});

// var waypoint = new Waypoint({
//   element: document.getElementById('waypoint'),
//   handler: function(direction) {
//     console.log('Scrolled to waypoint!');
//   }
// });