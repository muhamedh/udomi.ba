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

  parseJWT: function (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return (JSON.parse(jsonPayload));
  },

  validateRegisterForm: function () {
    // TODO user email should be unique


    $('#registerForm').validate({

      
      submitHandler: function (form) {
        var entity = Object.fromEntries((new FormData(form)).entries());

        entity.municipality_id = $('select[class*="selectize"] option').val();
        entity = JSON.stringify(entity);


        $.ajax({
          url: 'api/public/register',
          type: 'POST',
          data: entity,
          contentType: "application/json",
          dataType: "json",
          success: function (response) {
            localStorage.setItem("token", response.token);
            $("#registerModal").modal('hide');
            toastr.success("Uspješno registrovani!", "Informacija:");
            UserService.showUserNavbar();

          },
          error: function (response) {

            toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
          }
        });

      }
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
            UserService.showUserNavbar();

          },
          error: function (response) {
            toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
          }
        });

      }
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

  logOut: function () {
    localStorage.clear();
    UserService.showGuestNavbar();
    PetService.list()
  },

  copy: function (element) {
    var copyText = document.getElementById(element);

    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(copyText.value);
  },

  showUserPage: function () {
    
    var payload = UserService.parseJWT(localStorage.getItem("token"));
    $.ajax({
      url: "api/public/pets/owner/" + payload.user_id,
      type: "GET",
      success: function (data) {
        SPApp.handleSectionVisibility("#user-page");
        var photos;
        var html = "";
        
        var html = `
        <div class="container">        
        <button id = "add-pet-button" class="btn btn-warning mb-3" onclick="AddPetHandler.init()">Dodaj ljubimca</button>
        <button id = "delete-account-button" class="btn btn-danger mb-3" onclick="UserService.deleteUser()">Izbriši nalog</button>
        </div>`;
        
        for (let i = 0; i < data.length; i++) {
          photos = data[i].photos.split(',');
          html += `
          <div class="col-md-12 col-sm-12 col-lg-4">
              <div class="card h-100">
                <img src="` + photos[0] + `" class="card-img-top" alt="A picture of cat">
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
        toastr.error(textStatus, "Greška");
      }
    });

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
        toastr.success("Račun uspješno izbrisan!", "Informacija:");
        localStorage.removeItem('token');
        UserService.showGuestNavbar();
        PetService.list()
        SPApp.handleSectionVisibility("#pets-list");
      }
    });
  },

  showUserContact: function (id, petname) {

    $.ajax({
      url: "api/public/users/" + id,
      type: "GET",
      success: function (data) {
        var html1 = "";
        var html2 = "";
        
        html1 += `
          <p class="col-sm-2 col-form-label">Email</p>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="owner-mail-input" value="` + data[0].user_mail + `">
              <button type="button" class="btn btn-warning" onclick="UserService.copy('owner-mail-input')" style = "margin-top:10px">Kopiraj email</button>
            </div>
        `;
        html2 += `
          <p class="col-sm-2 col-form-label">Telefon</p>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="owner-phone-input" value="` + data[0].phone_number + `">
              <button type="button" class="btn btn-warning" onclick="UserService.copy('owner-phone-input')" style = "margin-top:10px">Kopiraj broj telefona</button>
            </div>
          `;

        $("#owner-mail").html(html1);
        $("#owner-phone").html(html2);
        $("#petname-on-contact").html(petname);
        $("#owner-info").modal("show");

      }
    })

  },

  myProfile: function () {
    var payload = UserService.parseJWT(localStorage.getItem("token"));


    $.ajax({
      url: "api/private/users/" + payload.user_id,
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function (data) {
        SPApp.handleSectionVisibility("#my-profile");

        var html = "";

        html += `
        <ul class="inline">
          <li class="fs-3 fw-bold list-inline-item">Korisničko ime: </li>
          <li class="fs-3 list-inline-item">`+ data[0].username + `</li>
        </ul>
        <ul class="inline">
          <li class="fs-3 fw-bold list-inline-item">Email adresa: </li>
          <li class="fs-3 list-inline-item">`+ data[0].user_mail + `</li>
        </ul>
        <ul class="inline">
          <li class="fs-3 fw-bold list-inline-item">Broj telefona: </li>
          <li class="fs-3 list-inline-item">` + data[0].phone_number + `</li>
        </ul>
        <ul class="inline">
          <li class="fs-3 fw-bold list-inline-item">Lokacija: </li>
          <li class="fs-3 list-inline-item">` + data[0].name + `</li>
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

  edit: function () {
    var payload = UserService.parseJWT(localStorage.getItem("token"));
    id = payload.user_id;

    $.ajax({
      url: "api/private/users/" + id,
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function (data) {
        SPApp.handleSectionVisibility("#edit-profile");

        var html = "";

        html += `
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
                  
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <label class="form-label" for="inputMunicipality">Općina </label>
                </div>
                <div class="col">
                  <select id="inputMunicipality">
                  </select>
                </div>
              </div>

            </div>
            <div class="d-grid gap-2 d-md-block" style="margin-top:10px">
          </form>
          <button class="btn btn-success flex-shrink-0 " id="saveButton"
            onclick="UserService.update(` + id + `)">Spasi promjene</button>
        </div>
      
      `;
        UserService.fillMunicipalities('#inputMunicipality');
        $("#edit-profile").html(html);
      }
    });

  },

  update: function (id) {
    var user = {};
    user.username = $("#inputUsername").val();
    user.user_mail = $("#inputEmail").val();
    user.phone_number = $("#inputPhone").val();
    if($("#inputMunicipality").val()){
      user.municipality_id = $("#inputMunicipality").val();  
    }
    
    $.ajax({
      url: 'api/private/users/' + id,
      type: 'PUT',
      data: JSON.stringify(user),
      contentType: 'application/json',
      dataType: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },

      success: function () {
        // ajax put request forsira reload stranice na ?
        // TODO nema potrebe za reload
        toastr.success("Podaci uspješno promjenjeni", "Informacija:");
        //UserService.myProfile(); // perf optimization
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  },

  fillMunicipalities: function (list) {
    $.ajax({
      url: "api/public/municipalities",
      type: "GET",

      success: function (data) {
        $(list).append("<option value=\"\"></option>");
        for (let i = 0; i < data.length; i++) {
          $(list).append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
        };

        var $select = $(list).selectize({
          create: false,
          sortField: "text",
          placeholder: "Unesite Vašu opštinu"
        });

        var selectize = $select[0].selectize;
        selectize.setValue('1000',1);

        //$('.selectize')[0].selectize.setValue('1000');
      },

      error: function (XMLHttpRequest, textStatus, errorThrown) {
        toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
      }
    });
  },


}