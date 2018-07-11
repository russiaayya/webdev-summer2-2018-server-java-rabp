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
        var user = {
            'username': $username.val(),
            "password": $password.val()
        };
       userService.login(user)
           .then(navigateToProfile);
    }

    function navigateToProfile() {
        alert('hihiiiiii');
        window.location.href = '../profile/profile.template.client.html';
    }
})();