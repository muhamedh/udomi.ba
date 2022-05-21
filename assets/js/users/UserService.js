var UserService = {
    init: function(){
        console.log("hi");
        UserService.showUserPage();
    },
    showUserPage: function(){
        $("#pets-list").attr('hidden', true);
        $("#user-page").attr('hidden', false);
        
        $.get("api/users/12", function (data) {
        
            console.log("hi");
            html = `<p>"`+ data.username +`"</p>`;
            $("#user-page").html(html);
        });
    }
}