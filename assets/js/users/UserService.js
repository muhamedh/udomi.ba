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

     //TODO rijesiti bez toga da parsamo jwt token ovdje.

     var payload = UserService.parseJWT(localStorage.getItem("token"));
     $.ajax({
      url: "api/public/pets/owner/" + payload.user_id,
      type: "GET",
      success: function(data) {
        SPApp.handleSectionVisibility(["#pets-list","#individual-pet","#edit-pet","#add-pet","#user-page"], "#user-page");
            
        var html="";

        var html = `
        <div class="container">        
        <button id = "add-pet-button" class="btn btn-warning mb-3" onclick="AddPetHandler.init()">Dodaj ljubimca</button>
        <button id = "delete-account-button" class="btn btn-danger mb-3" onclick="UserService.deleteUser()">Izbriši nalog</button>
        </div>`;
       
       for (let i = 0; i < data.length; i++) {
          html += `
          <div class="col-md-12 col-sm-12 col-lg-4">
              <div class="card h-100">
                <img src="` + data[i].photos_url + `" class="card-img-top" alt="A picture of cat">
              <div class="card-body">
                <h5 class="card-title fw-bold">` + data[i].petname + `</h5>
                <p class="card-text">` + data[i].pets_description + `</p>
                <button class="btn btn-warning flex-shrink-0" type="button" onclick="PetService.editPet(` + data[i].pets_id + `)" >Uredi ljubimca</button>
                <button class="btn btn-danger flex-shrink-0 float-end" type="button" onclick="PetService.deletePet(` + data[i].pets_id + `)" >Izbriši ljubimca</button>
              </div>
            </div>
          </div>
        `;
      }
      $("#user-page").html(html);
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
  
      return (JSON.parse(jsonPayload));
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
     },

     deleteUser : function(){
      $.ajax({
        url: 'api/private/users/',
        type: 'DELETE',
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        },
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            toastr.success("Raćun uspješno izbrisan!", "Informacija:");
            localStorage.removeItem('token');
            UserService.showGuestNavbar();
            SPApp.handleSectionVisibility(["#individual-pet","#edit-pet","#add-pet","#user-page"], "#pets-list");
        }
      });
    }
     
}