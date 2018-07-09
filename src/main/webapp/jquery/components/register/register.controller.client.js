(function () {
    var registerBtn = $('#registerBtn');

    var usernameFld = $('#usernameFld');
    var passwordFld = $('#passwordFld');
    var verifyPasswordFld = $('#verifyPasswordFld');


    registerBtn.click(registerHandler);

    function registerHandler() {
        var usernameStr = usernameFld.val();
        var passwordStr = passwordFld.val();
        var verifyPasswordStr = verifyPasswordFld.val();

        var userObj = {
            username: usernameStr,
            password: passwordStr
        };

        var userObjStr = JSON.stringify(userObj);

        fetch('/register', {
            method: 'post',
            body: userObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }
}) ();