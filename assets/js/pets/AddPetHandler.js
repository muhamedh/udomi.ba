var AddPetHandler = {

  init: function () {
    AddPetHandler.addPetScreen();
  },

  validatePetForm: function () {
    $('#addPetForm').validate({
      submitHandler: function (form) {
        var entity = Object.fromEntries((new FormData(form)).entries());
        uploadPicture.handleUpload(entity);
      }
    });
  },

  handleTempImgPreview: function (event) {

    $("#photo-wrapper").empty();

    var temp_photos = [];
    var temp_events = [];
    var temp_outputs = [];
    for( let i = 0; i < event.target.files.length; i++){
      temp_events[i] = event.target.files[i];
      temp_photos[i] = URL.createObjectURL(temp_events[i]);
    }

    for( let i = 0; i < temp_photos.length;i++){
      $("#photo-wrapper").append('<img id = "petPictureX" class="img-fluid" src="" alt="Slika ljubimca koju ste postavili"></img>');
      $("#petPictureX").attr("id", ''.concat("petPicture", i));
      if(i > 0){
        $(''.concat("#petPicture",i)).hide();
      }
      temp_outputs[i] = document.getElementById(''.concat('petPicture', i));
      temp_outputs[i].src = URL.createObjectURL(temp_events[i]);
    }
    
    //fancy optimization
    temp_outputs[temp_outputs.length -1].onload = function(){
      for( let i = 0; i < temp_outputs.length;i++){
        URL.revokeObjectURL(temp_outputs[i].src);
      }
    }
    $("#previous-add-button").attr('hidden', false);
    $("#next-add-button").attr('hidden', false);
    $("#photo-wrapper").data("current_photo_id", 0);
    $("#photo-wrapper").data("number_of_photos", temp_photos.length);
  },
  onPrev : function(){
    var index = $("#photo-wrapper").data("current_photo_id");
    var length = $("#photo-wrapper").data("number_of_photos");
    

    $(''.concat("#petPicture",index)).hide();    

    if(index - 1 < 0){
      index = length - 1;
    }else{
      index--;
    }

    $(''.concat("#petPicture",index)).show(); 

    $("#photo-wrapper").data("current_photo_id", index);
  },
  onNext : function(){
    var index = $("#photo-wrapper").data("current_photo_id");
    var length = $("#photo-wrapper").data("number_of_photos");

    $(''.concat("#petPicture",index)).hide();  

    if(index + 1 > length - 1){
      index = 0;
    }else{
      index++;
    }

    $(''.concat("#petPicture",index)).show(); 

    $("#photo-wrapper").data("current_photo_id", index);
  },
  //TODO mozda implementovati
  onDelete : function(){
    var id = $("#photo-wrapper").data("current_photo_id");
    
  },
  addPet: function (entity, photos) {
    //console.log(photos);
    
    entity.species_id = $('select[class*="selectize"] option').val();

    var payload = UserService.parseJWT(localStorage.getItem("token"));
    entity.owner_id = payload.user_id;
    delete entity.myFile;
    entity.photos = photos;
    
    //console.log(entity);
    
    $.ajax({
      url: 'api/private/pets',
      type: 'POST',
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function (response) {
        
        toastr.success("Ljubimac uspješno dodan.", "Informacija:");
      },
      error: function (response) {
        
        toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
      }
    });

  },
  addPetScreen: function () {
    SPApp.handleSectionVisibility("#add-pet");

    var html = `
              <div class="container">
              
              <div class="row justify-content-md-center">
                
                <div class="col-md-6 col-sm-12" id="photo">
                  <div id = "photo-wrapper">
                    <!-- <img id = "petPicture" class="img-fluid" src="./assets/img/addimage.png" alt="Slika ljubimca koji ste postavili"> -->
                  </div>

                  <div class = "controls-wrapper">
                    <div id = "previous-add-button" class="mt-3 float-start" style = "margin-right: 10px;">
                      <button class="btn btn-warning" onclick="AddPetHandler.onPrev()">Prethodna fotografija</button>
                    </div>
                    <div id = "next-add-button" class="mt-3 float-start" style = "margin-right: 10px;">
                      <button class="btn btn-warning" onclick="AddPetHandler.onNext()">Naredna fotografija</button>
                    </div>
                  </div>
                </div>
              
                <div class="col-md-6 col-sm-12">
                  <form id = "addPetForm">
                    <div class="md-3">
                      <label class="form-label" for="petname">Ime ljubimca: </label>
                      <!-- TODO izbrisati value -->
                      <input value = "test" name = "petname" type="text" class="form-control required" id="petname" placeholder="Ime Vašeg ljubimca"></div>
                      <div>
                        <label class="form-label" for="pet_birthdate">Datum rođenja: </label>
                        <input name="pet_birthdate" type="date" class="form-control required" id = "pet_birthdate">
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
                          <select id="speciesList">
                          </select>
                        </div>
                        
                        
                        <div class="md-3" style="margin-top:10px">
                            <label for="addPhoto" class="form-label">Dodajte sliku Vašeg ljubimca</label>
                            <input class="form-control" style="margin-bottom:10px" type="file" id="addPhoto" name = "myFile" onchange="AddPetHandler.handleTempImgPreview(event)" multiple >
                            
                        
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
    $("#previous-add-button").attr('hidden',true);
    $("#next-add-button").attr('hidden',true);
    
    $("#loadingButton").attr('hidden', true);
    AddPetHandler.getSpecies();
  },

  getSpecies: function () {
    $.ajax({
      url: "api/public/species",
      type: "GET",
      success: function (data) {


        $("#speciesList").append("<option value=\"\"><option>");
        for (let i = 0; i < data.length; i++) {
          $("#speciesList").append("<option value='" + data[i].species_id + "'>" + data[i].name + "</option>");
        };

        $("#speciesList").selectize({
          create: false,
          sortField: "text",
          placeholder: "Vrsta ljubimca"
        });
      }
    });
  }
}