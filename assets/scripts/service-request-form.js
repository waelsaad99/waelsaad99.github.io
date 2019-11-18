$(document).ready(function() {
  var form = document.getElementById("service-request__form");
  var formInvalidText = document.getElementById("service-request__invalid-text");
  var formBtn = document.getElementById("service-request__button");
  //invalid form state
  form.addEventListener(
    "invalid",
    function(event) {
      this.classList.add("check");
      formInvalidText.classList.add("service-request__invalid-text--show");
      formBtn.classList.add("service-request__button-invalid");
      event.preventDefault();
    },
    true
  );

  //reset form
  form.addEventListener("reset", function(event) {
    this.classList.remove("check");
    formInvalidText.classList.remove("service-request__invalid-text--show");
    formBtn.classList.remove("service-request__button-invalid");
  });
});
