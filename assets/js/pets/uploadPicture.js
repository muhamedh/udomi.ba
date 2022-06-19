
var uploadPicture = {
    handleUpload: function (entity) {
        //change visibility of elements

        /* Stop form from submitting normally   
           TODO: find a non depricated version*/
        event.preventDefault();

        //TODO vratiti u true
        $("#saveAdd").attr("disabled", false);

        var myFiles = $('#addPhoto').prop('files');
        var formData = new FormData();
        
        for( let i = 0; i < myFiles.length;i++){
            formData.append(''.concat('file[]'), myFiles[i]);
        }

        
        var ajaxRequest = $.ajax({
            url: "api/upload.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false
        });
        //on success of ajax call + on failure of php server side errors
        ajaxRequest.done(function (response, textStatus, jqXHR) {
            //console.log(jQuery.parseJSON(response));

            
            toastr.options.preventDuplicates = true;
            if (response === "1") {
                toastr.error('Molim Vas dodajte sliku.', 'Greška!');
            } else if (response === "2") {
                toastr.error("Vaša slika je prevelika.", "Greška!");

            } else if (response === "3") {
                toastr.warning("Dozvoljeni formati slike su: *.png i *.jpg", "Upozerenje:");
            } else if (response === "4") {
                toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
            } else if (response === "5"){
                toastr.error("Maksimalan broj slika je 5", "Greška!");
            }else {
                AddPetHandler.addPet(entity,  jQuery.parseJSON(response));
            }

            $("#saveAdd").attr("disabled", false);
            
        });
        // on failure of ajax call
        ajaxRequest.fail(function () {
            toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
            $("#saveAdd").attr("disabled", false);
        });
        
    }   
}
