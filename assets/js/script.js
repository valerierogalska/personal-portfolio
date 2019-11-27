//
// CONTACT FORM: Textarea auto-expands while typing
//
const textarea = document.querySelector('.contact-textarea');
const heightLimit = 280;
// TODO: When adding a new line, textarea adjusts 1px
let autoHeight = function() {
  textarea.style.height = '';
  textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + 'px';
};

textarea.oninput = autoHeight;

window.addEventListener('DOMContentLoaded', function() {

  // get the form elements defined in your form HTML above

  let form = document.querySelector('.contact-form');
  let button = document.querySelector('.contact-submit');
  let buttonContainer = document.querySelector('.button-effect');


  // Success and Error functions for after the form is submitted
  function toggleButton() {
    buttonContainer.classList.toggle("clicked");
  }

  function success() {
    form.reset();
    autoHeight();
    toggleButton();
    setTimeout(toggleButton, 4000);
  }

  function error() {
    button.innerHTML = 'oops! something went wrong';
  }

  // handle the form submission event

  form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    let data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}


//
// SCROLL ANIMATIONS
//
// Detect request animation frame
let scroll = window.requestAnimationFrame ||
             // IE Fallback
             function(callback){ window.setTimeout(callback, 1000/60);};
let elementsToShow = document.querySelectorAll('.portfolio-inner');

function loop() {

    Array.prototype.forEach.call(elementsToShow, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('is-visible');
      }
    });

    scroll(loop);
}

// Call the loop for the first time
loop();

// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {

  let rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0 && rect.bottom >= 0) ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}
