var ShowPetService = {
    //TODO creating utility biblioteki
    imageGallery: function (photos) {

      $("#photo-gallery-wrapper").empty();

      for( let i = 0; i < photos.length;i++){
        
        $("#photo-gallery-wrapper").append('<img id = "petGalleryPictureY" class="img-fluid rounded" src="" alt="Slika ljubimca koju ste postavili"></img>');
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
      
      if(photos.length <= 1){
        $("#previous-button").attr('hidden', true);
        $("#next-button").attr('hidden', true);
      }
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
      console.log(selected_pet);

      var html = "";
        html += `
        <section class = "shadow p-3 mb-5" style = "margin:10px">
          <div class="container px-4 px-lg-5 my-5">
            <div class="row gx-4 gx-lg-5 align-items-center">
              <div class="col-md-6">
              
              <div id = "photo-gallery-wrapper">
                    
              </div>
                  <div class = "controls-wrapper d-flex justify-content-center" style="margin-bottom: 50px;">
                    <div id = "previous-button" class="mt-3 " style = "margin-right: 10px;">
                      <button class="btn btn-warning" onclick="ShowPetService.onPrevPic()">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                      </button>
                    </div>
                    <div id = "next-button" class="mt-3 " style = "margin-right: 10px;">
                      <button class="btn btn-warning" onclick="ShowPetService.onNextPic()">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                       </svg>
                      </button>
                    </div>
                  </div>
              </div>
              <div class="col-md-6">
                <h1 class="display-5 fw-bolder">` + selected_pet[0].petname + `</h1>
                <div class="fs-5 mb-2">
                  <span><b>Spol: </b> ` + genderText + `<br></span>
                  <span><b>Vrsta: </b> ` + selected_pet[0].species_name + `<br></span> 
                  <span><b>Vakcinacija: </b> ` + vaccinatedText + `<br></span>
                  <span><b>Datum rođenja: </b> ` + selected_pet[0].pet_birthdate + `<br></span>
                  <span><b>Lokacija: </b> ` + selected_pet[0].name + `</span>
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
      
      $("#individual-pet").html(html);
      ShowPetService.imageGallery(selected_pet[0].photos.split(','));
    }
}