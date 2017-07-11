$(document).ready(function() {
var form = document.getElementById('cform');
form.noValidate = true;
form.addEventListener('submit', function(event) { // listen for form submitting
        if (!event.target.checkValidity()) {
            event.preventDefault(); // dismiss the default functionality
            alert('Please, fill the form'); // error message
        }
    }, false);
});
