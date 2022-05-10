var AddPetService = {
    init : function(){
        
        
    },
    addPet: function (pet) {
        //$('#addButton').attr('disabled', true);
        //$('#saveAdd').attr('disabled', false);
        var pet = {};
        console.log('add pet called');
        pet.petname = $('#addPetName').val();
        pet.birthdate = $('#birthdate').val();
        if(($('#species').val()).localeCompare("Mačka")){
          pet.species_id=1;
        } else if(($('#species').val()).localeCompare("Pas")){
          pet.species_id=2;
        } else if(($('#species').val()).localeCompare("Zec")){
          pet.species_id=3;
        } 
        ($('#vaccinatedNo').is(':checked')) ? pet.vaccinated = 0 : pet.vaccinated = 1;
        ($('#genderFemale').is(':checked')) ? pet.pet_gender = 1 : pet.pet_gender = 0;
        //($('#adoptedYes').is(':checked')) ? pet.adopted = 1 : pet.adopted = 0;
        pet.pets_description = $('#addDescription').val();
        pet.photos_url= $('#addPhoto').val();
        //maybe set adopted as 0 at first in db
        pet.adopted=0;
    
        $.ajax({
          url: 'api/pets',
          type: 'POST',
          data: JSON.stringify(pet),
          contentType: "application/json",
          dataType: "json",
          success: function () {
            PetService.showMine();
          }
        });
        //$('#addButton').attr('disabled', false);
        //$('#saveAdd').attr('disabled', true);
      },
      addPetScreen: function () {
        
          var html = `
          <div class="container">
          
          <div class="row justify-content-md-center">
            
            <div class="col-md-6" id="photo">
              <button onclick="">
                <img class="img-fluid" src="img/plus.png" alt="plusić">
              </button>
            </div>
          
            <div class="col-md-6">
              <form id = "#addPetForm">
                <div class="md-3">
                  <label class="form-label" for="addPetName">Ime ljubimca: </label>
                  <input type="text" class="form-control" id="addPetName" placeholder="Ime Vašeg ljubimca" </div>
                  <div>
                    <label class="form-label" for="birthdate">Datum rođenja: </label>
                    <input name="birthdate" type="date" class="form-control required">
                  </div>
                  <div class="md-3" style="margin-top:10px">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="gender" id="genderMale" value="">
                      <label class="form-check-label" for="genderMale">Mužjak</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="gender" id="genderFemale" value="">
                      <label class="form-check-label" for="genderFemale">Ženka</label>
                    </div>
                  </div>
                  <div class="md-3" style="margin-top:10px">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="vaccinated" id="vaccinatedYes" value="option1">
                      <label class="form-check-label" for="vaccinatedYes">Vakcinisan/a</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="vaccinated" id="vaccinatedNo" value="option2">
                      <label class="form-check-label" for="vaccinatedNo">Nije vakcinisan/a</label>
                    </div>
                  </div>
                  <div class="md-3" style="margin-top:10px">
                    <label class="form-label" for="addDescription">Opis:</label>
                    <input type="text" class="form-control" id="addDescription" placeholder="Vaš opis ljubimca" </div>
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
                      <button class="btn btn-success flex-shrink-0" id="saveAdd" onclick="PetService.addPet">Spasi
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