var PetService = {
  init: function () {
    /*
    $('#addPet').validate({
      submitHandler: function(form) {
        var todo = Object.fromEntries((new FormData(form)).entries());
        PetService.add(todo);
      }
    });*/
    //document.getElementById("loading-spinner").style.display = "none";
    //PetService.showPet(1);
    //PetService.editPet(1);
    PetService.list(); 
    
  },

  list: function () {
    $.get("api/pets", function (data) {

      $("#pets-list").html("");
      var html = "";
      for (let i = 0; i < data.length; i++) {
        html += `
          <div class="col">
            <div class="card h-100">
              <img src="` + data[i].photos_url + `" class="card-img-top" alt="A picture of cat">
            <div class="card-body">
              <h5 class="card-title fw-bold">` + data[i].petname + `</h5>
              <p class="card-text">` + data[i].pets_description + `</p>
              <button type="button" class="btn btn-success float-end vise-detalja" onclick="PetService.showPet(` + data[i].pets_id + `)">Više detalja</button> 
            </div>
          </div>
        </div>
      `
      }
      //spinner gets hidden
      document.getElementById("loading-spinner").style.display = "none";
      $("#pets-list").html(html);
      console.log(data);
    });
  },

  showPet: function (id) {
    // moguca optimizacija -> ne treba nam jos jedan ajax call
    // kada bi mogli iskoristiti -> objekat iz show all pets-a
    // showPet(data[i]) perhaps?
    $.get("api/pets/" + id, function (data) {
      $("#pets-list").attr('hidden', true);
      $("#individual-pet").html("");
      var genderText;
      var vaccinatedText;

      data.pet_gender ? genderText = "Ženka" : genderText = "Mužjak";
      if(genderText == "Ženka"){
        vaccinatedText = "Vakcinisana";
      }else{
        vaccinatedText = "Vakcinisan";
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
                  <button class="btn btn-outline-success flex-shrink-0" type="button">Kontaktirajte vlasnika</button>
                  <button class="btn btn-danger flex-shrink-0" type="button" onclick="PetService.editPet()" >Uredi ljubimca</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        `;
      
      document.getElementById("loading-spinner").style.display = "none";
      $("#individual-pet").html(html);
      console.log(data);
      //PetService.editPet(data);
    });
  },

  editPet: function (data) {
    console.log(data);
    /*
    $("#individual-pet").attr('hidden', true);
    
    var html = `
    <div class="container">
    <div class = "row justify-content-md-center">
       <h3>Uredi ljubimca:</h3>
    </div>
    <div class = "row justify-content-md-center">
       <div class = "col-md-6">
          <img class="card-img-top mb-5 mb-md-0" src="` + data.photos_url + `" alt="...">
       </div>
       <div class = "col-md-6">
          <form>

             <div class="md-3">
                <label class="form-label" for="inputPetName">Ime ljubimca: </label>
                <input type="text" class="form-control" id="inputPetName" placeholder="Ime Vašeg ljubimca" value="`+ data.petname +`">
             </div>

             <div class="md-3" style="margin-top:10px">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="gender" id="genderMale" value="" checked>
                  <label class="form-check-label" for="genderMale">Muzjak</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="gender" id="genderFemale" value="" >
                  <label class="form-check-label" for="genderFemale">Zenka</label>
                </div>
             </div>
             <div class="md-3" style="margin-top:10px">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="vaccinated" id="vaccinatedYes" value="option1">
                  <label class="form-check-label" for="vaccinatedYes">Vakcinisan</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="vaccinated" id="vaccinatedNo" value="option2">
                  <label class="form-check-label" for="vaccinatedNo">Nije vakcinisan</label>
                </div>
             </div>
             <button type="submit" class="btn btn-primary">Sign in</button>
       </div>

       </form>
    </div>
    </div>
    </div>`;
    
    $("#edit-pet").html(html);*/
  },

}
