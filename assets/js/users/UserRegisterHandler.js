var UserRegisterHandler = {
    init: function(){
      $("#register-button").click(function(){
        UserRegisterHandler.validateRegisterForm();
      });
    },
    validateRegisterForm: function(){
        $('#registerForm').validate({
          submitHandler: function (form) {
            var entity = Object.fromEntries((new FormData(form)).entries());
            console.log(entity);
            /*
            $.ajax({
              url: 'api/login',
              type: 'POST',
              data: JSON.stringify(entity),
              contentType: "application/json",
              dataType: "json",
              success: function (response) {
                localStorage.setItem("token", response.token);
                $("#loginModal").modal('hide');
                toastr.success("Uspješno prijavljeni!", "Informacija:");
              },
              error: function(response){
                toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
              }
            });
            */

          }
        });
     }
}