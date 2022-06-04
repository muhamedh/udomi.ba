var UserService = {

  init: function () {

    if (localStorage.getItem("token") === null) {
      UserService.showGuestNavbar();
    } else {
      UserService.showUserNavbar();
    }
    $("#register-button").click(function () {
      UserService.validateRegisterForm();
    });
    $("#login-button").click(function () {
      UserService.validateLoginForm();
    });
  },
  showUserPage: function () {

    //TODO rijesiti bez toga da parsamo jwt token ovdje.

    var payload = UserService.parseJWT(localStorage.getItem("token"));
    $.ajax({
      url: "api/public/pets/owner/" + payload.user_id,
      type: "GET",
      success: function (data) {
        SPApp.handleSectionVisibility(["#pets-list", "#individual-pet", "#edit-pet", "#add-pet", "#my-profile", "#edit-profile", "#user-page"], "#user-page");

        var html = "";

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
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });

  },
  parseJWT: function (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return (JSON.parse(jsonPayload));
  },
  logOut: function () {
    localStorage.clear();
    UserService.showGuestNavbar();
    PetService.list()
  },
  validateRegisterForm: function () {

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
          error: function (response) {
            toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
          }
        });

      }
    });
    $('#registerModal').on('hidden.bs.modal', function () {
      UserService.showUserNavbar();
    });
  },
  validateLoginForm: function () {
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
          error: function (response) {
            toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
          }
        });

      }
    });
    $('#loginModal').on('hidden.bs.modal', function () {
      UserService.showUserNavbar();
    });
  },
  showUserNavbar: function () {
    $("#guest-navbar").hide();
    $("#user-navbar").show();
  },
  showGuestNavbar: function () {
    $("#guest-navbar").show();
    $("#user-navbar").hide();
  },

  deleteUser: function () {
    $.ajax({
      url: 'api/private/users/',
      type: 'DELETE',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        toastr.success("Raćun uspješno izbrisan!", "Informacija:");
        localStorage.removeItem('token');
        UserService.showGuestNavbar();
        PetService.list()
        SPApp.handleSectionVisibility(["#individual-pet", "#edit-pet", "#add-pet", "#user-page"], "#pets-list");
      }
    });
  },

  showUserContact: function (id) {
    //zasad ne mora neko biti registrovan da bi vidio contact info
    //nvm

  },

  myProfile: function () {
    var payload = UserService.parseJWT(localStorage.getItem("token"));
    
    
    $.ajax({
      url: "api/public/users/" + payload.user_id,
      type: "GET",
      success: function (data) {
        SPApp.handleSectionVisibility(["#pets-list","#individual-pet","#edit-pet","#add-pet","#user-page", "#edit-profile", "#my-profile"], "#my-profile");

        var html = "";

        html += `
        <ul class="inline">
          <li class="fs-3 fw-bold list-inline-item">Korisničko ime: </li>
          <li class="fs-3 list-inline-item">`+ data[0].username +`</li>
        </ul>
        <ul class="inline">
          <li class="fs-3 fw-bold list-inline-item">Email adresa: </li>
          <li class="fs-3 list-inline-item">`+ data[0].user_mail +`</li>
        </ul>
        <ul class="inline">
          <li class="fs-3 fw-bold list-inline-item">Broj telefona: </li>
          <li class="fs-3 list-inline-item">` + data[0].phone_number + `</li>
        </ul>
        <ul class="inline">
          <li class="fs-3 fw-bold list-inline-item">Lokacija: </li>
          <li class="fs-3 list-inline-item">`+ data[0].city +`, </li>
          <li class="fs-3 list-inline-item">` + data[0].municipality + `</li>
        </ul>
        <div>
          <button id="edit-account-button" class="btn btn-warning btn-lg " onclick="UserService.edit()">Uredite račun</button>
          <button id="delete-account-button" class="btn btn-danger btn-lg ms-3" onclick="UserService.deleteUser()">Izbrišite račun</button>
        </div>`;

        
        $("#my-profile").html(html);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(textStatus);
      }
    });
  },

  edit: function(id) {
    var payload = UserService.parseJWT(localStorage.getItem("token"));
      id=payload.user_id;
    $.get("api/public/users/" + id, function(data){

      
      SPApp.handleSectionVisibility(["#pets-list","#individual-pet","#edit-pet","#add-pet","#user-page", "#add-pet-button", "#my-profile"], "#edit-profile");

      var html="";
      console.log(id);
      
      html+=`
      <div class="col-md-6">
          <form>
            <div class="container">
              <div class="row">
                <div class="col">
                  <label class="form-label" for="inputUsername">Korisničko ime </label>
                </div>
                <div class="col mb-3">
                  <input type="text" class="form-control" id="inputUsername" placeholder="ime123"
                    value="`+ data[0].username + `">
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <label class="form-label" for="inputEmail">Email adresa </label>
                </div>
                <div class="col mb-3">
                  <input type="text" class="form-control" id="inputEmail" placeholder="ime.prezime@mail.com"
                    value="`+ data[0].user_mail + `">
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <label class="form-label" for="inputPhone">Broj telefona </label>
                </div>
                <div class="col mb-3">
                  <input type="text" class="form-control" id="inputPhone" placeholder="061234567"
                    value="`+ data[0].phone_number + `">
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <label class="form-label" for="inputCity">Grad </label>
                </div>
                <div class="col mb-3">
                  <input type="text" class="form-control" id="inputCity" placeholder="Sarajevo"
                    value="`+ data[0].city + `">
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <label class="form-label" for="inputMunicipality">Općina </label>
                </div>
                <div class="col mb-3">
                  <input type="text" class="form-control" id="inputMunicipality" placeholder="Novi Grad"
                    value="`+ data[0].municipality + `">
                </div>
              </div>

            </div>
            <div class="d-grid gap-2 d-md-block" style="margin-top:10px">
          </form>
          <button class="btn btn-success flex-shrink-0 " id="saveButton"
            onclick="UserService.update(` + id + `)">Spasi promjene</button>
        </div>
      
      `;

      $("#edit-profile").html(html);
    })
  },

  update: function(id){
    var user = {};
    user.username = $("#inputUsername").val();
    user.user_mail = $("#inputEmail").val();
    user.phone_number = $("#inputPhone").val();
    user.city = $("#inputCity").val();
    user.municipality = $("#inputMunicipality").val();
    $.ajax({
      url: 'api/public/users/'+ id,
      type: 'PUT',
      data: JSON.stringify(user),
      beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      contentType: 'application/json',
      dataType: 'json',
      success: function() {
        
        console.log("yay");
          UserService.myProfile(); // perf optimization
      }
    });
  }

}