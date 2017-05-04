$(document).ready(function(){
   var scroll_start = 0;
   var startchange = $('.landing');
   var offset = startchange.offset();
    if (startchange.length){
   $(document).scroll(function() {
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top) {
          $(".navbar-fixed-top").css('background-color', 'rgba( 0, 0, 0, .5 )');
       } else {
          $('.navbar-fixed-top').css('background-color', 'transparent');
       }
   });
    }
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });
});



// scroll to top button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
} else {
    document.getElementById("myBtn").style.display = "none";
}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction(event) {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}
