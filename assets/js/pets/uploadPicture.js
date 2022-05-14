
var uploadPicture = {
    handleUpload: function () {
        console.log('initilized');
            $("#confirmPicture").attr('hidden',true);
            $("#loadingButton").attr('hidden', false);
            $("#saveAdd").attr("disabled", true);
            var ajaxRequest;    
            
            /* Stop form from submitting normally   */
            event.preventDefault();

            /* Get from elements values */
            
            var formData = new FormData($('#uploadPictureForm')[0]);
            formData.append('file', $('input[type=file]')[0].files[0]);
            
            
            ajaxRequest = $.ajax({
                url: "api/upload.php",
                type: "post",
                data: formData,
                processData: false,
                contentType: false
            });

            /*  Request can be aborted by ajaxRequest.abort() */

            ajaxRequest.done(function (response, textStatus, jqXHR) {

                // Show successfully for submit message TODO
                console.log(jqXHR);
                $('#petPicture').attr('src',jQuery.parseJSON(response).secure_url);
                $("#confirmPicture").attr('hidden',false);
                $("#loadingButton").attr('hidden', true);
                $("#saveAdd").attr("disabled", false);
                //photo_url = jQuery.parseJSON(response).secure_url;
                
                //return response
            });

            /* On failure of request this function will be called  */
            ajaxRequest.fail(function () {
                console.log(response);
                $('#petPicture').attr('src',jQuery.parseJSON(response).secure_url);
                $("#confirmPicture").attr('hidden',false);
                $("#loadingButton").attr('hidden', true);
                $("#saveAdd").attr("disabled", false);
                // Show  toaster error TODO
                //return response
            });
            
    }
}
