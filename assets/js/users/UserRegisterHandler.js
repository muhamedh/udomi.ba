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
            
            console.log(JSON.stringify(entity));
            
            $.ajax({
              url: 'api/register',
              type: 'POST',
              data: JSON.stringify(entity),
              contentType: "application/json",
              dataType: "json",
              success: function (response) {
                
                $("#registerModal").modal('hide');
                toastr.success("Uspješno registrovani!", "Informacija:");
              },
              error: function(response){
                toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
              }
            });
            

          }
        });
     }
}