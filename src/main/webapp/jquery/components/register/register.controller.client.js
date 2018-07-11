(function () {
    var $usernameFld, $passwordFld, $verifyPasswordFld;
    var $registerBtn;

    var userService = new UserServiceClient();
    $(main);

    function main() {
        $usernameFld = $('#usernameFld');
        $passwordFld = $('#passwordFld');
        $verifyPasswordFld = $('#verifyPasswordFld');
        $registerBtn = $('#registerBtn');
        $registerBtn.click(registerHandler);
    }

    function registerHandler() {
        $("#alert1").hide();
        $("#alert2").hide();

        var usernameStr = $usernameFld.val();
        var passwordStr = $passwordFld.val();
        var verifyPasswordStr = $verifyPasswordFld.val();

        userService.findByUsername(usernameStr).then(uniqueUsername);

        function uniqueUsername(users) {
            if(users.length ===0){
                if (passwordStr===verifyPasswordStr){
                    var user = new User(usernameStr,passwordStr,null,null,null,null,null,null);
                    return userService
                        .register(user)
                        .then(registrationSuccessful, registrationFailed);
                }
                else {
                    // alert('Passwords do not match!')
                    $("#alert1").show("slow");
                }
            }
            else {
                // alert('Username already exists, pick another!');
                $("#alert2").show("slow");
            }
        }

        function registrationSuccessful() {
            window.location.href = '../profile/profile.template.client.html';
        }

        function registrationFailed() {
            alert('Unable to register, please try again in sometime.')
        }
    }
}) ();