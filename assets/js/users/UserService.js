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
     console.log('hi from show user page');
     var payload = UserService.parseJWT(localStorage.getItem("token"));
     console.log(payload);
     $.ajax({
      url: "api/public/pets/owner/" + payload.user_id,
      type: "GET",
      success: function(data) {
        console.log(data);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(textStatus);
      }
   });
     
    },
    parseJWT: function(token){
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
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
              url: 'api/public/register',
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
              url: 'api/public/login',
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