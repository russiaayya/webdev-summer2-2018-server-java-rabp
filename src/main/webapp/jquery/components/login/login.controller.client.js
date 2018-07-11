(function () {
    var $username,
        $password,
        $loginBtn;
        var userService = new UserServiceClient();

    $(main);

    function main() {
        $username = $('#username');
        $password = $('#password');
        $loginBtn = $('#loginBtn');

        $loginBtn.click(login);
    }

    function login() {
        $(".alert").hide();
        var user = new User($username.val(),$password.val(),null,null,null,null,null,null);
        // var user = {
        //     'username': $username.val(),
        //     "password": $password.val()
        // };
        userService
            .login(user)
            .then(navigateToProfile,loginFailed);
    }

    function navigateToProfile() {
        window.location.href = '../profile/profile.template.client.html';
    }

    function loginFailed() {
        $(".alert").show("slow");
    }
})();