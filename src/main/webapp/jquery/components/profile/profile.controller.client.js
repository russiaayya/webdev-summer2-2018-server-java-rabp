(function () {

    var $username, $phone, $email, $role, $dateOfBirth, $passwordFld, $firstNameFld,
        $lastNameFld, $updateBtn, $logoutBtn;
    var currentUserId;
    var currentUser = null;
    var userService = new UserServiceClient();

    $(main);

    function main() {

        $username = $("#usernameFld");
        $passwordFld = $("#passwordFld");
        $firstNameFld = $("#firstNameFld");
        $lastNameFld = $("#lastNameFld");
        $phone = $("#phoneFld");
        $email = $("#emailFld");
        $role = $("#roleFld");
        $dateOfBirth = $("#dobFld");
        $updateBtn = $("#updateBtn");
        $logoutBtn = $("#logoutBtn");

        $updateBtn.click(updateUser);
        $logoutBtn.click(logoutUser);

        userService
            .profile()
            .then(renderUser);
    }

    function updateUser() {
        $(".alert").hide()

        var updatedUser = new User(currentUser.username,$passwordFld.val(),$email.val(),
            $firstNameFld.val(),$lastNameFld.val(), $phone.val(), $role.val(), $('#dobFld').val())

        userService
            .updateProfile(currentUser, updatedUser)
            .then($(".alert").show("slow"));
    }

    function renderUser(user) {
        currentUser = user;
        $username.val(user.username);
        $passwordFld.val(user.password);
        $firstNameFld.val(user.firstName);
        $lastNameFld.val(user.lastName);
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
    
    function logoutUser() {
        userService
            .logout(currentUser)
            .then(function () {
                window.location.href = '../login/login.template.client.html';
            })
    }

})();