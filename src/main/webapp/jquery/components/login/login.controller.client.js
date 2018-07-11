(function () {
    var $username,
        $password,
        $loginBtn;
        var userService = new UserServiceClient();
    function init() {
        $username = $('#username');
        $password = $('#password');
        $loginBtn = $('#loginBtn');

        $loginBtn.click(login);
    }
    init();

    function login() {
        $(".alert").hide()
        var user = {
            'username': $username.val(),
            "password": $password.val()
        };
        userService.login(user).then(navigateToProfile,loginFailed);
    }

    function navigateToProfile() {
        window.location.href = '../profile/profile.template.client.html';
    }

    function loginFailed() {
        $(".alert").show("slow")
        // alert('Username and password does not match!');
    }
})();