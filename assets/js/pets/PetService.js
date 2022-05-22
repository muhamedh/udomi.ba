var PetService = {
  init: function () {
    PetService.list(); 
  },

  list: function () {
    $.get("api/public/pets", function (data) {
      SPApp.handleSectionVisibility(["#pets-list","#individual-pet","#edit-pet","#add-pet","#user-page"], "#pets-list");
            
      var html = "";
      for (let i = 0; i < data.length; i++) {
        html += `
          <div class="col-md-12 col-sm-12 col-lg-4">
            <div class="card h-100">
              <img src="` + data[i].photos_url + `" class="card-img-top" alt="A picture of cat">
            <div class="card-body">
              <h5 class="card-title fw-bold">` + data[i].petname + `</h5>
              <p class="card-text">` + data[i].pets_description + `</p>
              <button type="button" class="btn btn-success float-end vise-detalja" onclick="PetService.showPet(` + data[i].pets_id + `)">Više detalja</button>
            </div>
          </div>
        </div>
      `
      }
      //spinner gets hidden
      document.getElementById("loading-spinner").style.display = "none";
      $("#pets-list").html(html);
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
    
    //console.log(JSON.stringify(pet));
    $.ajax({
      url: 'api/private/pets/'+ id,
      type: 'PUT',
      data: JSON.stringify(pet),
      beforeSend: function(xhr){
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      contentType: "application/json",
      dataType: "json",
      success: function(result) {
          UserService.showUserPage(); // perf optimization
      }
    });

    $('#saveButton').attr('disabled',false);
    $("#edit-pet").attr('hidden', true);
  }


}
