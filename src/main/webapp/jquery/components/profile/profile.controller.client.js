(function () {

    var $username, $phone, $email, $role, $dateOfBirth,
        $updateBtn, $logoutBtn;
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

        // findUserById(7)
        //   .then(renderUser)

        userService
            .profile()
            .then(renderUser);
    }
    init();

    function updateUser() {
        var user = {
            firstName: $firstName.val(),
            lastName: $lastName.val()
        };

        fetch("/api/user/" + currentUser.id, {
            method: 'put',
            body: JSON.stringify(user),
            'credentials': 'include',
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    function renderUser(user) {
        $username.val(user.username);
        $phone.val(user.phone);
        $email.val(user.email);
        $role.val(user.role);
        $dateOfBirth.val(user.dateOfBirth);

    }

    // function profile() {
    //     return fetch('/api/profile', {
    //         'credentials': 'include'
    //     })
    //         .then(function (response) {
    //             return response.json();
    //         });
    // }

    function findUserById(userId) {
        return fetch('/api/user/' + userId)
            .then(function (response) {
                return response.json();
            });
    }

    function handleResponse() {

    }
})();