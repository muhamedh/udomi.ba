var AddPetService = {
  init: function () {
    AddPetService.addPetScreen();
  },
  validatePetForm: function(){
    $('#addPetForm').validate({
      submitHandler: function (form) {
        var entity = Object.fromEntries((new FormData(form)).entries());
        
        AddPetService.addPet(entity);
      }
    });
  },
  addPet: function (entity) {
    
    /**
     * GET ALL SPECIES FROM DB
     */
    if (($('#species').val()).localeCompare("Mačka")) {
      entity.species_id = "7"; // HARDCODED!
    } else if (($('#species').val()).localeCompare("Pas")) {
      entity.species_id = "8"; // HARDCODED!
    } else if (($('#species').val()).localeCompare("Zec")) {
      entity.species_id = "9"; // HARDCODED!
    }
        /**
     * KADA BUDEMO IMALI TOKENE U USER TOKENU CE BITI PET OWNERRR!!!!
     */
    entity.owner_id = "9";

    entity.photos_url = "/img/cat1.jpg";
    

    

    $.ajax({
      url: 'api/pets',
      type: 'POST',
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function () {
        /**
         * ADD A TOASTER
         */
        console.log('POST ajax call finished')
      }
    });

  },
  addPetScreen: function () {
    $("#pets-list").attr('hidden', true);
    $("#add-pet-button").attr('hidden', true);
    var html = `
          <div class="container">
          
          <div class="row justify-content-md-center">
            
            <div class="col-md-6 col-sm-12" id="photo">
              <button onclick="">
                <img class="img-fluid" src="./assets/img/addimage.png" alt="plusić">
              </button>
            </div>
          
            <div class="col-md-6 col-sm-12">
              <form id = "addPetForm">
                <div class="md-3">
                  <label class="form-label" for="petname">Ime ljubimca: </label>
                  <input name = "petname" type="text" class="form-control required" id="petname" placeholder="Ime Vašeg ljubimca"></div>
                  <div>
                    <label class="form-label" for="pet_birthdate">Datum rođenja: </label>
                    <input name="pet_birthdate" type="date" class="form-control required" id = "pet_birthdate">
                  </div>
                  <div class="md-3" style="margin-top:10px">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="gender" id="genderMale" value="0">
                      <label class="form-check-label" for="genderMale">Mužjak</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="gender" id="genderFemale" value="1">
                      <label class="form-check-label" for="genderFemale">Ženka</label>
                    </div>
                  </div>
                  <div class="md-3" style="margin-top:10px">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="vaccinated" id="vaccinatedYes" value="1">
                      <label class="form-check-label" for="vaccinatedYes">Vakcinisan/a</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="vaccinated" id="vaccinatedNo" value="0">
                      <label class="form-check-label" for="vaccinatedNo">Nije vakcinisan/a</label>
                    </div>
                  </div>
                  <div class="md-3" style="margin-top:10px">
                    <label class="form-label" for="pets_description">Opis:</label>
                    <input type="text" class="form-control" id="pets_description" placeholder="Vaš opis ljubimca" name = "pets_description"> 
                    </div>
                    <div class="md-3" style="margin-top:10px">
                      <label for="species" class="form-label">Vrsta</label>
                      <input class="form-control" list="speciesList" id="species"
                        placeholder="Type to search...">
                      <datalist id="speciesList">
                        <option value="Mačka">
                        <option value="Pas">
                        <option value="Zec">
                      </datalist>
                    </div>
                    <div class="md-3" style="margin-top:10px">
                      <label for="addPhoto" class="form-label">Default file input example</label>
                      <input class="form-control" type="file" id="addPhoto">
                    </div>
                    <div cclass="md-3" style="margin-top:10px; margin-bottom:10px;">
                      <button type = "Submit" value = "Submit" class="submit btn btn-success flex-shrink-0" id="saveAdd" onclick="AddPetService.validatePetForm()">Spasi
                        promjene</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>`;

    $("#add-pet").html(html);
  }

}