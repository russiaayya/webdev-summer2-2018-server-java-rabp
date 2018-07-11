(function () {

    var $username, $phone, $email, $role, $dateOfBirth,
        $updateBtn, $logoutBtn;
    var currentUserId;
    var currentUser = null;
    var userService = new UserServiceClient();

    function init() {

        $username = $("#usernameFld");
        $phone = $("#phoneFld");
        $email = $("#emailFld");
        $role = $("#roleFld");
        $dateOfBirth = $("#dobFld");
        $updateBtn = $("#updateBtn");
        $logoutBtn = $("#logoutBtn");

        $updateBtn.click(updateUser);
        // $logoutBtn.click(logoutUser);

        // findUserById(7)
        //   .then(renderUser)

        userService
            .profile()
            .then(renderUser);
    }
    $(init);

    function updateUser() {
        // var user = {
        //     firstName: $firstName.val(),
        //     lastName: $lastName.val()
        // };

        var updatedUser = new User(currentUser.username,currentUser.password,$email.val(),
            currentUser.firstName,currentUser.lastName, $phone.val(), $role.val(), $('#dobFld').val())

        fetch("/api/user/" + currentUser.id, {
            method: 'put',
            body: JSON.stringify(updatedUser),
            'credentials': 'include',
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    function renderUser(user) {
        currentUser = user;
        $username.val(user.username);
        $phone.val(user.phone);
        $email.val(user.email);
        $role.val(user.role);
        if(!user.dateOfBirth){
            date = null;
        }
        else{
            var date = user.dateOfBirth.substring(0, user.dateOfBirth.indexOf('T'));
        }
        $('#dobFld').val(date);

    }
    
    // function logoutUser() {
    //
    // }

    // function profile() {
    //     return fetch('/api/profile', {
    //         'credentials': 'include'
    //     })
    //         .then(function (response) {
    //             return response.json();
    //         });
    // }

    // function findUserById(userId) {
    //     return fetch('/api/user/' + userId)
    //         .then(function (response) {
    //             return response.json();
    //         });
    // }

})();