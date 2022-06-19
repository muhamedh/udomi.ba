var PetService = {
  init: function () {

    $('#search-params').keypress(function(event){
      if(event.keyCode == 13){
        event.preventDefault();
        PetService.list($('#search-params').val());
      }
    });
    PetService.list(); 
  },

  list: function (param = null) {
    
    $.get("api/public/pets" + (param != null ? "?search=" + param : ""), function (data) {
      SPApp.handleSectionVisibility("#pets-list");
      var photos;
      var html = "";
      for (let i = 0; i < data.length; i++) {
        photos = data[i].photos.split(",");
        html += `
          <div class="col-md-12 col-sm-12 col-lg-4">
            <div class="card h-100 shadow p-3 mb-5">
              <img src="` + photos[0] + `" class="card-img-top rounded" alt="A picture of cat">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-bold">` + data[i].petname + `</h5>
              <p class="card-text">` + data[i].pets_description + `</p>
              <button type="button" style="margin-top:auto" class="btn btn-success vise-detalja" onclick="PetService.showPet(` + data[i].pets_id + `)">Više detalja</button>
            </div>
          </div>
        </div>
      `
      }
      $("#pets-list").html(html);
      $("#pets-list").data("pets", data);
    });
  },

  editPet: function (id) {
    EditPetService.editPet(id);
  },

  showPet: function (id) {
    ShowPetService.showPet(id);
  },

  update : function(id){
    
    $('#saveButton').attr('disabled',true);
    var pet = {};
    pet.petname = $('#inputPetName').val();
    pet.pets_description = $('#inputDescription').val();
    ($('#vaccinatedNo').is(':checked')) ? pet.vaccinated = 0 : pet.vaccinated = 1;
    ($('#genderFemale').is(':checked')) ? pet.pet_gender = 1 : pet.pet_gender = 0;
    ($('#adoptedYes').is(':checked')) ? pet.adopted = 1 : pet.adopted = 0;
    

    
    $.ajax({
      
      url: 'api/private/pets/'+ id,
      type: 'PUT',
      beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      data: JSON.stringify(pet),
      contentType: "application/json",
      dataType: "json",


      
      success: function(response) {
        UserService.showUserPage(); 
        /*
        console.log(response);

        toastr.info("Ljubimac promjenjen.", "Informacija!");*/
        /*
          console.log('hi');
          UserService.showUserPage(); // perf optimization
          console.log('bye');*/
      },
      error: function(response){
        toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
      }
    });

    $('#saveButton').attr('disabled',false);
    $("#edit-pet").attr('hidden', true);
  },

  deletePet : function(id){
    $.ajax({
      url: 'api/private/pets/delete/'+ id,
      type: 'PUT',
      data: '{ "status" : "INACTIVE"}',
      beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
          
          UserService.showUserPage(); // perf optimization
      }
    });
  }

}
