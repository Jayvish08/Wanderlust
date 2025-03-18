// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submissio
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if(!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  function adjustTextareaRows() {
    let textarea = document.getElementById("txt-ar");
    if (window.innerWidth <= 750) {
      textarea.rows = 5;
    } else{
      textarea.rows = 2;
    }
  }
  // Page load aur resize hone par function call hoga
  window.onload = adjustTextareaRows;
  window.onresize = adjustTextareaRows;