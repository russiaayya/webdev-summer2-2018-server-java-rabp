(function () {
    var $username,
        $password,
        $loginBtn,
        $forgotBtn;
        var userService = new UserServiceClient();

    $(main);

    function main() {
        $username = $('#username');
        $password = $('#password');
        $loginBtn = $('#loginBtn');
        $forgotBtn = $('#forgotBtn');

        $loginBtn.click(login);
        $forgotBtn.click(sendEmail);
    }

    function sendEmail() {
        // var user = new User($username.val(),null,null,null,null,null,null,null);
        userService.sendEmail($username.val()).then(alert('ohooo'));
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