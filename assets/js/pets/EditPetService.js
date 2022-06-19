var EditPetService = {
  //TODO create utility biblioteku
  imageGallery: function (photos) {

    $("#photo-edit-wrapper").empty();

    for (let i = 0; i < photos.length; i++) {

      $("#photo-edit-wrapper").append('<img id = "petEditPictureY" class="img-fluid" src="" alt="Slika ljubimca koju ste postavili"></img>');
      $("#petEditPictureY").attr("id", ''.concat("petEditPicture", i));
      $(''.concat("#petEditPicture", i)).attr("src", photos[i]);
      if (i > 0) {
        $(''.concat("#petEditPicture", i)).hide();
      }

    }
    
    $("#previous-edit-button").attr('hidden', false);
    $("#next-edit-button").attr('hidden', false);
    


    $("#photo-edit-wrapper").data("current_photo_id", 0);
    $("#photo-edit-wrapper").data("number_of_photos", photos.length);

    if(photos.length <= 1){
      $("#previous-edit-button").attr('hidden', true);
      $("#next-edit-button").attr('hidden', true);
    }
  },
  onPrevPic: function () {
    var index = $("#photo-edit-wrapper").data("current_photo_id");
    var length = $("#photo-edit-wrapper").data("number_of_photos");

    $(''.concat("#petEditPicture", index)).hide();

    if (index - 1 < 0) {
      index = length - 1;
    } else {
      index--;
    }

    $(''.concat("#petEditPicture", index)).show();

    $("#photo-edit-wrapper").data("current_photo_id", index);
  },
  onNextPic: function () {
    var index = $("#photo-edit-wrapper").data("current_photo_id");
    var length = $("#photo-edit-wrapper").data("number_of_photos");

    $(''.concat("#petEditPicture", index)).hide();

    if (index + 1 > length - 1) {
      index = 0;
    } else {
      index++;
    }

    $(''.concat("#petEditPicture", index)).show();

    $("#photo-edit-wrapper").data("current_photo_id", index);
  },
  editPet: function (id) {


    $.get("api/public/pets/" + id, function (data) {

      SPApp.handleSectionVisibility("#edit-pet");
      //console.log(data);
      var html = `
      <section style = "padding:15px;">
      <div class="row justify-content-md-center">
        <div class = "col">
        <h3 class ="display-10 fw-bolder">Uredi ljubimca:</h3>
        </div>
        </div>
      <div class="row justify-content-md-center">
        <div class="col-md-6">
        <div id = "photo-edit-wrapper">
              
        </div>
            <div class = "controls-wrapper d-flex justify-content-center">
              <div id = "previous-edit-button" class="mt-3" style = "margin-right: 10px;">
                 <button class="btn btn-warning" onclick="EditPetService.onPrevPic()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
                  </button>                      
              </div>
              <div id = "next-edit-button" class="mt-3" style = "margin-right: 10px;">
                <button class="btn btn-warning" onclick="EditPetService.onNextPic()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
              </button>
              </div>
            </div>
        </div>
        <div class="col-md-6">
          <form method="post">
            <div class="md-3">
              <label class="form-label" for="inputPetName"><b>Ime ljubimca:</b></label>
              <input type="text" class="form-control" id="inputPetName" placeholder="Ime Vašeg ljubimca" value="`+ data.petname+`">
            </div>
            <div class="md-3" style="margin-top:15px">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="gender" id="genderMale" value="">
                <label class="form-check-label" for="genderMale">Mužjak</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="gender" id="genderFemale" value="">
                <label class="form-check-label" for="genderFemale">Ženka</label>
              </div>
            </div>
            <div class="md-3" style="margin-top:15px">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="vaccinated" id="vaccinatedYes" value="option1">
                <label class="form-check-label" for="vaccinatedYes">Vakcinisan/a</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="vaccinated" id="vaccinatedNo" value="option2">
                <label class="form-check-label" for="vaccinatedNo">Nije vakcinisan/a</label>
              </div>
            </div>
            <div class="md-3" style="margin-top:15px">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="adopted" id="adoptedYes" value="option1">
                <label class="form-check-label" for="vaccinatedYes">Udomljen/a</label>
              </div>
             
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="adopted" id="adoptedNo" value="option2">
                <label class="form-check-label" for="vaccinatedNo">Nije udomljen/a</label>
              </div>
          </div>
              <div class="md-3">
                <label class="form-label" for="inputDescription"><b>Opis:</b></label>
                <input type="text" class="form-control" id="inputDescription" placeholder="Vaš opis ljubimca" value="`+ data.pets_description +`">
              </div>
              <div class="d-grid gap-2 d-md-block" style="margin-top:10px">
              </form>
              <button class="btn btn-success flex-shrink-0" id="saveButton" onclick="PetService.update(` + data.pets_id + `)"><b>Spasi promjene</b></button>
              </div>
            </div>
        </div>
       
      </div>
    </section>
            `;
      
      $("#edit-pet").html(html);
      if (data.pet_gender == 1) {
        $("#genderFemale").prop("checked", true)
      } else if (data.pet_gender == 0) {
        $("#genderMale").prop("checked", true);
      }
      if (data.vaccinated == 1) {
        $("#vaccinatedYes").prop("checked", true)
      } else if (data.vaccinated == 0) {
        $("#vaccinatedNo").prop("checked", true);
      }
      if (data.adopted == 1) {
        $("#adoptedYes").prop("checked", true);
      } else if (data.adopted == 0) {
        $("#adoptedNo").prop("checked", true);
      }
      EditPetService.imageGallery(data.photos.split(","));
    });
  }
  // add adopted pet function
}