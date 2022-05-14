
var uploadPicture = {
    handleUpload: function () {
        //change visibility of elements
        $("#confirmPicture").attr('hidden', true);
        $("#loadingButton").attr('hidden', false);
        // disable save form button
        $("#saveAdd").attr("disabled", true);

        /* Stop form from submitting normally   
           TODO: find a non depricated version*/
        event.preventDefault();

        //get from elements values

        var formData = new FormData($('#uploadPictureForm')[0]);
        formData.append('file', $('input[type=file]')[0].files[0]);


        var ajaxRequest = $.ajax({
            url: "api/upload.php",
            type: "post",
            data: formData,
            processData: false,
            contentType: false
        });
        //on success of ajax call + on failure of php server side errors
        ajaxRequest.done(function (response, textStatus, jqXHR) {

            toastr.options.preventDuplicates = true;
            if (response === "1") {
                toastr.error('Molim Vas dodajte sliku.', 'Greška!');
            } else if (response === "2") {
                toastr.error("Vaša slika je prevelika.", "Greška!");

            } else if (response === "3") {
                toastr.warning("Dozvoljeni formati slike su: *.png i *.jpg", "Upozerenje:");
            } else if (response === "4") {
                toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
            } else {
                toastr.success("Slika uspješno dodana.", "Info:");
                $('#petPicture').attr('src', jQuery.parseJSON(response).secure_url);
            }

            $("#confirmPicture").attr('hidden', false);
            $("#loadingButton").attr('hidden', true);
            $("#saveAdd").attr("disabled", false);

        });
        // on failure of ajax call
        ajaxRequest.fail(function () {
            toastr.error("Molim Vas pokušajte ponovno.", "Greška!");
            $("#confirmPicture").attr('hidden', false);
            $("#loadingButton").attr('hidden', true);
            $("#saveAdd").attr("disabled", false);
        });

    }
}
