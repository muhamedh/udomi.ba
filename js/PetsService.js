var PetsService = {
  init: function () {
    /*
    $('#addPet').validate({
      submitHandler: function(form) {
        var todo = Object.fromEntries((new FormData(form)).entries());
        PetService.add(todo);
      }
    });*/
    PetsService.list();
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
              <button type="button" class="btn btn-success float-end vise-detalja" onclick="PetsService.showPet(` + data[i].pets_id + `)">Više detalja</button> 
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
    $.get("api/pets/" + id, function (data) {
      $("#pets-list").attr('hidden', true);
      $("#individual-pet").html("");
      var html = "";
      for (let i = 0; i < data.length; i++) {
        html += `
        <section>
          <div class="container px-4 px-lg-5 my-5">
            <div class="row gx-4 gx-lg-5 align-items-center">
              <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="` + data[i].photos_url + `" alt="..."></div>
              <div class="col-md-6">
                <h1 class="display-5 fw-bolder">` + data[i].petname + `</h1>
                <div class="fs-5 mb-2">
                  <span>` + data[i].pets_gender + `</span>
                  <span>` + data[i].pet_birthdate + `</span>
                  <span>` + data[i].vaccinated + `</span>
                </div>
                <div class="fs-5 mb-2">
                  <span>ako budemo još info dodavali</span>
                </div>
                <p class="lead">` + data[i].pets_description + `</p>
                <div class="d-flex">
                  <button class="btn btn-outline-success flex-shrink-0" type="button">Kontaktirajte vlasnika</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        `
      }
      document.getElementById("loading-spinner").style.display = "none";
      $("#individual-pet").html(html);
      console.log(data);
    })
  },

  get: function (id) {
    $('.todo-button').attr('disabled', true);
    $.get('rest/todos/' + id, function (data) {
      $("#description").val(data.description);
      $("#id").val(data.id);
      $("#created").val(data.created);
      $("#exampleModal").modal("show");
      $('.todo-button').attr('disabled', false);
    })
  },

  add: function (todo) {
    $.ajax({
      url: 'rest/todos',
      type: 'POST',
      data: JSON.stringify(todo),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        $("#todo-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
        PetService.list(); // perf optimization
        $("#addToDoModal").modal("hide");
      }
    });
  },

  update: function () {
    $('.save-todo-button').attr('disabled', true);
    var todo = {};

    todo.description = $('#description').val();
    todo.created = $('#created').val();

    $.ajax({
      url: 'rest/todos/' + $('#id').val(),
      type: 'PUT',
      data: JSON.stringify(todo),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        $("#exampleModal").modal("hide");
        $('.save-todo-button').attr('disabled', false);
        $("#todo-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
        PetService.list(); // perf optimization
      }
    });
  },

  delete: function (id) {
    $('.todo-button').attr('disabled', true);
    $.ajax({
      url: 'rest/todos/' + id,
      type: 'DELETE',
      success: function (result) {
        $("#todo-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
        PetService.list();
      }
    });
  },
}
