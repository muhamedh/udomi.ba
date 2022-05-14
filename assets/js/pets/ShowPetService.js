var ShowPetService = {
    // moguca optimizacija -> ne treba nam jos jedan ajax call
    // kada bi mogli iskoristiti -> objekat iz show all pets-a
    // showPet(data[i]) perhaps?
    showPet : function(id){
        $.get("api/pets/" + id, function (data) {
            $("#pets-list").attr('hidden', true);
            $("#edit-pet").attr('hidden', true);
            $("#individual-pet").attr('hidden', false);
            $("#individual-pet").html("");
            var genderText;
            var vaccinatedText;
      
            data.pet_gender ? genderText = "Ženka" : genderText = "Mužjak";
            if(genderText == "Ženka"){
              if(data.vaccinated == 1){
                vaccinatedText = "Vakcinisana";
              }else{
                vaccinatedText = "Nije vakcinisana";
              }
            }else{
              if(data.vaccinated == 1){
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
                    <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="` + data.photos_url + `" alt="..."></div>
                    <div class="col-md-6">
                      <h1 class="display-5 fw-bolder">` + data.petname + `</h1>
                      <div class="fs-5 mb-2">
                        <span><b>Spol:</b> ` + genderText + `<br></span>
                        <span><b>Vakcinacija:</b> ` + vaccinatedText + `<br></span>
                        <span><b>Datum rođenja:</b> ` + data.pet_birthdate + `</span>
      
                      </div>
                      <div class="fs-5 mb-2">
                        <span><b>Opis ljubimca:</b></span>
                      </div>
                      <p class="lead">` + data.pets_description + `</p>
                      <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-outline-success flex-shrink-0" type="button">Udomi!</button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              `;
            
            document.getElementById("loading-spinner").style.display = "none";
            $("#individual-pet").html(html);
          });
    }
}