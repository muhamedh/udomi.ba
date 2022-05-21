var UserService = {

    init: function(){

        if(localStorage.getItem("token") === null){
            UserService.showGuestNavbar();
        }else{
            UserService.showUserNavbar();
        }
        $("#register-button").click(function(){
            UserService.validateRegisterForm();
        });
        $("#login-button").click(function(){
            UserService.validateLoginForm();
        });
    },
    showUserPage: function(){

    },
    logOut: function(){
        localStorage.clear();
        UserService.showGuestNavbar();
    },
    validateRegisterForm: function(){

        $('#registerForm').validate({
          submitHandler: function (form) {
            var entity = Object.fromEntries((new FormData(form)).entries());
            
           
            
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
        $('#registerModal').on('hidden.bs.modal', function () {
        UserService.showUserNavbar();
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
                
                
                localStorage.setItem("token", response.token);
                $("#loginModal").modal('hide');
                toastr.success("Uspješno prijavljeni!", "Informacija:");
              },
              error: function(response){
                toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
              }
            });
            
          }
        });
        $('#loginModal').on('hidden.bs.modal', function () {
          UserService.showUserNavbar();
        });
     },
     showUserNavbar : function(){
        $("#guest-navbar").hide();
        $("#user-navbar").show();
     },
     showGuestNavbar : function(){
        $("#guest-navbar").show();
        $("#user-navbar").hide();
     }
}