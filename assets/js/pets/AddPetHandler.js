var AddPetHandler = {
    init: function(){
        AddPetHandler.addPetScreen();
    },
    validatePetForm: function(){
        $('#addPetForm').validate({
          submitHandler: function (form) {
            var entity = Object.fromEntries((new FormData(form)).entries());
            uploadPicture.handleUpload(entity);
          }
        });
     },
    handleTempImgPreview : function(event){

        var output = document.getElementById('petPicture');
        output.src = URL.createObjectURL(event.target.files[0]);
        
        output.onload = function() {
            URL.revokeObjectURL(output.src) // free memory
        }

    },
    addPet: function (entity) {
    
        /**
         * GET ALL SPECIES FROM DB
         */
        if (($('#species').val()).localeCompare("Mačka")) {
          entity.species_id = "1"; // HARDCODED!
        } else if (($('#species').val()).localeCompare("Pas")) {
          entity.species_id = "2"; // HARDCODED!
        } else if (($('#species').val()).localeCompare("Zec")) {
          entity.species_id = "4"; // HARDCODED!
        }
        /**
         * KADA BUDEMO IMALI TOKENE U USER TOKENU CE BITI PET OWNERRR!!!!
         */
        entity.owner_id = "1";
    
        delete entity.myFile;
        
        //console.log(JSON.stringify(entity));

        $.ajax({
          url: 'api/private/pets',
          type: 'POST',
          data: JSON.stringify(entity),
          contentType: "application/json",
          dataType: "json",
          beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
          },
          success: function () {
            toastr.success("Ljubimac uspješno dodan.", "Informacija:");
          },
          error: function(){
            toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
          }
        });
        
      },
    addPetScreen : function(){
        SPApp.handleSectionVisibility(["#pets-list","#individual-pet","#edit-pet","#add-pet","#user-page"], "#add-pet");
        
        var html = `
              <div class="container">
              
              <div class="row justify-content-md-center">
                
                <div class="col-md-6 col-sm-12" id="photo">
                  <button onclick="">
                    <img id = "petPicture"class="img-fluid" src="./assets/img/addimage.png" alt="Slika ljubimca koji ste postavili">
                  </button>
                </div>
              
                <div class="col-md-6 col-sm-12">
                  <form id = "addPetForm">
                    <div class="md-3">
                      <label class="form-label" for="petname">Ime ljubimca: </label>
                      <input name = "petname" type="text" class="form-control" id="petname" placeholder="Ime Vašeg ljubimca"></div>
                      <div>
                        <label class="form-label" for="pet_birthdate">Datum rođenja: </label>
                        <input name="pet_birthdate" type="date" class="form-control" id = "pet_birthdate">
                      </div>
                      <div class="md-3" style="margin-top:10px">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="pet_gender" id="genderMale" value="0">
                          <label class="form-check-label" for="genderMale">Mužjak</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="pet_gender" id="genderFemale" value="1">
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
                            <label for="addPhoto" class="form-label">Dodajte sliku Vašeg ljubimca</label>
                            <input class="form-control" style="margin-bottom:10px" type="file" id="addPhoto" name = "myFile" onchange="AddPetHandler.handleTempImgPreview(event)" >
                            
                        
                        </div>
                        <div class="md-3" style="margin-top:10px; margin-bottom:10px;">
                          <button type = "Submit" value = "Submit" class="submit btn btn-success flex-shrink-0" id="saveAdd" onclick="AddPetHandler.validatePetForm()">Dodaj ljubimca!</button>
                        </div>
                        </form>
                      </div>
                    </div>
                </div>
              </div>
            </div>`;
    
        $("#add-pet").html(html);
        $("#loadingButton").attr('hidden',true);
    }
}