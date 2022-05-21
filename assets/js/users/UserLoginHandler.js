var UserLoginHandler = {
    init: function(){
      $("#login-button").click(function(){
        console.log("hi from init");
        UserLoginHandler.validateLoginForm();
      });
    },
    validateLoginForm: function(){
        $('#loginForm').validate({
          submitHandler: function (form) {
            var entity = Object.fromEntries((new FormData(form)).entries());

            $.ajax({
              url: 'api/login',
              type: 'POST',
              data: JSON.stringify(entity),
              contentType: "application/json",
              dataType: "json",
              success: function (response) {
                //$("#guest-navbar").hide();
                $("#user-navbar").show();
                localStorage.setItem("token", response.token);
                $("#loginModal").modal('hide');
                //toastr.success("Uspješno prijavljeni!", "Informacija:");
                
              },
              error: function(response){
                toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
              }
            });
            
          }
        });
     }
}