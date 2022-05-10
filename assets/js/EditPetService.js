var EditPetService = {
    editPet: function(id){
      
        $.get("api/pets/" + id, function (data) {
            console.log(data.petname);
            console.log(data.vaccinated);
            console.log(data.pet_gender);

            $("#individual-pet").attr('hidden', true);
            $("#pets-list").attr('hidden', true);
            $("#edit-pet").html("");
            $("#edit-pet").attr('hidden', false);
            
            var html = `
            <div class="container">
            <div class = "row justify-content-md-center">
               <h3>Uredi ljubimca:</h3>
            </div>
            <div class = "row justify-content-md-center">
               <div class = "col-md-6">
                  <img class="card-img-top mb-5 mb-md-0" src="` +"./assets/" + data.photos_url + `" alt="...">
               </div>
               <div class = "col-md-6">
                  <form>
        
                     <div class="md-3">
                        <label class="form-label" for="inputPetName">Ime ljubimca: </label>
                        <input type="text" class="form-control" id="inputPetName" placeholder="Ime Vašeg ljubimca" value="`+ data.petname +`">
                     </div>
        
                     <div class="md-3" style="margin-top:10px">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="gender" id="genderMale" value="">
                          <label class="form-check-label" for="genderMale">Mužjak</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="gender" id="genderFemale" value="" >
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
                     <div class="form-check form-check-inline">
                       <input class="form-check-input" type="radio" name="adopted" id="adoptedYes" value="option1">
                       <label class="form-check-label" for="vaccinatedYes">Udomljen/a</label>
                     </div>
                     <div class="form-check form-check-inline">
                       <input class="form-check-input" type="radio" name="adopted" id="adoptedNo" value="option2">
                       <label class="form-check-label" for="vaccinatedNo">Nije udomljen/a</label>
                     </div>
                  </div>
                     
               </div>
               </form>
               <button class="btn btn-primary" id = "saveButton" onclick = "PetService.update(` + data.pets_id + `)">Spasi promjene</button>
            </div>
            </div>
            </div>`;
            
            $("#edit-pet").html(html);
            if($("#genderFemale").is(":checked")){
               
            }
            data.pet_gender ? $("#genderFemale").prop("checked",true) : $("#genderMale").prop("checked",true);
            data.vaccinated ? $("#vaccinatedYes").prop("checked",true) : $("#vaccinatedNo").prop("checked",true);
            data.adopted ? $("#adoptedYes").prop("checked",true) : $("#adoptedNo").prop("checked",true);
            
          });
    }
}