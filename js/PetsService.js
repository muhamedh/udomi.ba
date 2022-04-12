var PetsService = {
    init: function(){
      /*
      $('#addPet').validate({
        submitHandler: function(form) {
          var todo = Object.fromEntries((new FormData(form)).entries());
          PetService.add(todo);
        }
      });*/
      PetsService.list();
    },

    list: function(){
      $.get("api/pets", function (data) {

        $("#pets-list").html("");
        var html = "";
        for (let i = 0; i < data.length; i++) {
          html += `
          <div class="col">
            <div class="card h-100">
              <img src="img/cat1.jpg" class="card-img-top" alt="A picture of cat">
            <div class="card-body">
              <h5 class="card-title fw-bold">` + data[i].petname + `</h5>
              <p class="card-text">` + data[i].pets_description + `</p>
              <button type="button" class="btn btn-success float-end">Više detalja</button>
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

    edit: function(pet_id){
      $.get('api/pets/' + pet_id, function(data){
        console.log(data);
        document.getElementById("dog-logo").style.display = "none";
        html = "";

        $("#edit-pet").html(html);
      });
    },

    get: function(id){
      $('.todo-button').attr('disabled', true);
      $.get('rest/todos/'+id, function(data){
        $("#description").val(data.description);
        $("#id").val(data.id);
        $("#created").val(data.created);
        $("#exampleModal").modal("show");
        $('.todo-button').attr('disabled', false);
      })
    },

    add: function(todo){
      $.ajax({
        url: 'rest/todos',
        type: 'POST',
        data: JSON.stringify(todo),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            $("#todo-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            PetService.list(); // perf optimization
            $("#addToDoModal").modal("hide");
        }
      });
    },

    update: function(){
      $('.save-todo-button').attr('disabled', true);
      var todo = {};

      todo.description = $('#description').val();
      todo.created = $('#created').val();

      $.ajax({
        url: 'rest/todos/'+$('#id').val(),
        type: 'PUT',
        data: JSON.stringify(todo),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            $("#exampleModal").modal("hide");
            $('.save-todo-button').attr('disabled', false);
            $("#todo-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            PetService.list(); // perf optimization
        }
      });
    },

    delete: function(id){
      $('.todo-button').attr('disabled', true);
      $.ajax({
        url: 'rest/todos/'+id,
        type: 'DELETE',
        success: function(result) {
            $("#todo-list").html('<div class="spinner-border" role="status"> <span class="sr-only"></span>  </div>');
            PetService.list();
        }
      });
    },
}
