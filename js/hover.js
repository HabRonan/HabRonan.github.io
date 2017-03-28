$( document ).ready( function(){
  alert("I am working")
  $("#left").on({
      mouseenter: function () {
          $("#toggle1").show('slide', {
              direction: 'left'
          }, 1000);
      },
      mouseleave: function () {
          $("#toggle1").hide('slide', {
              direction: 'left'
          }, 1000);
      }
  });
  $("#right").on({
      mouseenter: function () {
          $("#toggle2").show('slide', {
              direction: 'right'
          }, 1000);
      },
      mouseleave: function () {
          $("#toggle2").hide('slide', {
              direction: 'right'
          }, 1000);
      }
  });

 });

 $(document).ready(function() {
   $(".trigger").click(function() {
     $(".menu").toggleClass("active");
   });
 });
