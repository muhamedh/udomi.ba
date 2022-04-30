var PetService = {
  init: function () {
    /*
    $('#addPet').validate({
      submitHandler: function(form) {
        var todo = Object.fromEntries((new FormData(form)).entries());
        PetService.add(todo);
      }
    });*/
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
                <div class="d-flex">
                  <button class="btn btn-outline-success flex-shrink-0" type="button">Kontaktirajte vlasnika</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        `
      
      document.getElementById("loading-spinner").style.display = "none";
      $("#individual-pet").html(html);
      console.log(data);
    });
  },
}
