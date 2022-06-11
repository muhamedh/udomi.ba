var ShowPetService = {
    //TODO creating utility biblioteki
    imageGallery: function (photos) {

      $("#photo-gallery-wrapper").empty();
  
      for( let i = 0; i < photos.length;i++){
        
        $("#photo-gallery-wrapper").append('<img id = "petGalleryPictureY" class="img-fluid" src="" alt="Slika ljubimca koju ste postavili"></img>');
        $("#petGalleryPictureY").attr("id", ''.concat("petGalleryPicture", i));
        $(''.concat("#petGalleryPicture",i)).attr("src", photos[i]);
        if(i > 0){
          $(''.concat("#petGalleryPicture",i)).hide();
        }
        
      }
      
      $("#previous-button").attr('hidden', false);
      $("#next-button").attr('hidden', false);

      $("#photo-gallery-wrapper").data("current_photo_id", 0);
      $("#photo-gallery-wrapper").data("number_of_photos", photos.length);
    },
    onPrevPic : function(){
      var index = $("#photo-gallery-wrapper").data("current_photo_id");
      var length = $("#photo-gallery-wrapper").data("number_of_photos");
      
      $(''.concat("#petGalleryPicture",index)).hide();    
      
      if(index - 1 < 0){
        index = length - 1;
      }else{
        index--;
      }
      
      $(''.concat("#petGalleryPicture",index)).show(); 
  
      $("#photo-gallery-wrapper").data("current_photo_id", index);
    },
    onNextPic : function(){
      var index = $("#photo-gallery-wrapper").data("current_photo_id");
      var length = $("#photo-gallery-wrapper").data("number_of_photos");
  
      $(''.concat("#petGalleryPicture",index)).hide();  
  
      if(index + 1 > length - 1){
        index = 0;
      }else{
        index++;
      }
  
      $(''.concat("#petGalleryPicture",index)).show(); 
  
      $("#photo-gallery-wrapper").data("current_photo_id", index);
    },

    showPet : function(id){
      var pets = $("#pets-list").data("pets");
      var selected_pet = pets.filter(pets => pets.pets_id == id);
      
      
      
      SPApp.handleSectionVisibility("#individual-pet");
      var genderText;
      var vaccinatedText;

      selected_pet[0].pet_gender ? genderText = "Ženka" : genderText = "Mužjak";
      if(genderText == "Ženka"){
        if(selected_pet[0].vaccinated == 1){
          vaccinatedText = "Vakcinisana";
        }else{
          vaccinatedText = "Nije vakcinisana";
        }
      }else{
        if(selected_pet[0].vaccinated == 1){
          vaccinatedText = "Vakcinisan";
        }else{
          vaccinatedText = "Nije vakcinisan";
        }
        
      }
      var html = "";
        html += `
        <section>
          <div class="container px-4 px-lg-5 my-5">
            <div class="row gx-4 gx-lg-5 align-items-center">
              <div class="col-md-6">
              
              <div id = "photo-gallery-wrapper">
                    
              </div>

                  <div class = "controls-wrapper">
                    <div id = "previous-button" class="mt-3 float-start" style = "margin-right: 10px;">
                      <button class="btn btn-warning" onclick="ShowPetService.onPrevPic()">Prethodna fotografija</button>
                    </div>
                    <div id = "next-button" class="mt-3 float-start" style = "margin-right: 10px;">
                      <button class="btn btn-warning" onclick="ShowPetService.onNextPic()">Naredna fotografija</button>
                    </div>
                  </div>
              </div>
              <div class="col-md-6">
                <h1 class="display-5 fw-bolder">` + selected_pet[0].petname + `</h1>
                <div class="fs-5 mb-2">
                  <span><b>Spol:</b> ` + genderText + `<br></span>
                  <span><b>Vrsta</b> ` + selected_pet[0].name + `<br></span>
                  <span><b>Vakcinacija:</b> ` + vaccinatedText + `<br></span>
                  <span><b>Datum rođenja:</b> ` + selected_pet[0].pet_birthdate + `</span>
                  
                </div>
                <div class="fs-5 mb-2">
                  <span><b>Opis ljubimca:</b></span>
                </div>
                <p class="lead">` + selected_pet[0].pets_description + `</p>
                <div class="d-grid gap-2 d-md-block">
                  <button class="btn btn-outline-success flex-shrink-0" type="button" onclick="UserService.showUserContact(` + selected_pet[0].owner_id + `, `+ '\'' + selected_pet[0].petname + '\'' + `)">Udomi!</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        `;
      
      document.getElementById("loading-spinner").style.display = "none";
      $("#individual-pet").html(html);
      ShowPetService.imageGallery(selected_pet[0].photos.split(','));
    }
}