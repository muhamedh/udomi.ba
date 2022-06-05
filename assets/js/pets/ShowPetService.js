var ShowPetService = {
    // moguca optimizacija -> ne treba nam jos jedan ajax call
    // kada bi mogli iskoristiti -> objekat iz show all pets-a
    // showPet(data[i]) perhaps?

    showPet : function(id){
      var pets = $("#pets-list").data("pets");
      var selected_pet = pets.filter(pets => pets.pets_id == id);

      SPApp.handleSectionVisibility(["#pets-list","#individual-pet","#edit-pet","#add-pet","#user-page"], "#individual-pet");
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
              <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="` + selected_pet[0].photos_url + `" alt="Img of individual pet"></div>
              <div class="col-md-6">
                <h1 class="display-5 fw-bolder">` + selected_pet[0].petname + `</h1>
                <div class="fs-5 mb-2">
                  <span><b>Spol:</b> ` + genderText + `<br></span>
                  <span><b>Vakcinacija:</b> ` + vaccinatedText + `<br></span>
                  <span><b>Datum rođenja:</b> ` + selected_pet[0].pet_birthdate + `</span>

                </div>
                <div class="fs-5 mb-2">
                  <span><b>Opis ljubimca:</b></span>
                </div>
                <p class="lead">` + selected_pet[0].pets_description + `</p>
                <div class="d-grid gap-2 d-md-block">
                  <button class="btn btn-outline-success flex-shrink-0" type="button" onclick="UserService.showUserContact(` + selected_pet[0].owner_id + `)">Udomi!</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        `;
      
      document.getElementById("loading-spinner").style.display = "none";
      $("#individual-pet").html(html);
    }
}