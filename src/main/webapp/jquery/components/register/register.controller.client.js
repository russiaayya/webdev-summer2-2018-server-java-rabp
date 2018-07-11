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
        var usernameStr = $usernameFld.val();
        var passwordStr = $passwordFld.val();
        var verifyPasswordStr = $verifyPasswordFld.val();

        if (passwordStr===verifyPasswordStr){
            var user = new User(usernameStr,passwordStr,null,null,null,null,null,null);
            return userService
                .register(user)
                .then(registrationSuccessful, registrationFailed);
        }
        else {
            alert('Passwords do not match!')
        }

        function registrationSuccessful() {
            window.location.href = '../profile/profile.template.client.html';
        }

        function registrationFailed() {
            alert('oops')
        }



        // var userObj = {
        //     username: usernameStr,
        //     password: passwordStr
        // };

        // var userObjStr = JSON.stringify(userObj);



        // fetch('/api/register', {
        //     method: 'post',
        //     body: userObjStr,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });

    }
}) ();