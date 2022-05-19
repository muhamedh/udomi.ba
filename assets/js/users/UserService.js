var UserService = {
    init: function(){
        console.log('user service called');
        UserService.showUserPage();
    },
    showUserPage: function(){
        $("#pets-list").attr('hidden', true);
        $("#user-page").attr('hidden', false);
        $.get("api/users/1", function (data) {
            console.log(data);
            html = `<p>"`+ data.username +`"</p>`;
            $("#user-page").html(html);
        });
        
    }
}