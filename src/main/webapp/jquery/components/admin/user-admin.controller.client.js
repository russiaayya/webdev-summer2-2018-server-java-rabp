(function () {
    var $usernameFld, $passwordFld, $roleFld, $emailFld, $phoneFld, $dateofBirthFld;
    var $removeBtn, $editBtn, $createBtn;
    var $firstNameFld, $lastNameFld;
    var $userRowTemplate, $tbody;
    var updateUserId;
    var userService = new UserServiceClient();
    $(main);

    function main() {
        $tbody = $('tbody');
        $userRowTemplate = $('.wbdv-template');
        $createBtn = $('.wbdv-create');
        $createBtn.click(createUser);
        $usernameFld = $('#usernameFld');
        $passwordFld = $('#passwordFld');
        $firstNameFld = $('#firstNameFld');
        $lastNameFld = $('#lastNameFld');
        $roleFld = $('#roleFld');
        $emailFld = $('#emailFld');
        $phoneFld = $('#phoneFld');
        $dateofBirthFld = ('#dobFld');
        $('.wbdv-update').click(updateUser);
        findAllUsers();
    }

    function createUser() {
        var username = $('#usernameFld').val();
        var password = $('#passwordFld').val();
        var firstName = $('#firstNameFld').val();
        var lastName = $('#lastNameFld').val();
        var role = $('#roleFld').val();
        var email = $('#emailFld').val();
        var phone = $('#phoneFld').val();
        var dateOfBirth = $('#dobFld').val();

        var user = new User(username,password,email,firstName,lastName,phone,role,dateOfBirth);

        userService
            .createUser(user)
            .then(findAllUsers);
    }
    function findAllUsers() {
        userService
            .findAllUsers()
            .then(renderUsers);
    }
    function findUserById(userId) {
        userService
            .findUserById(userId)
            .then(renderUser);
    }
    function deleteUser(event) {
        $removeBtn = $(event.currentTarget);
        var userId = $removeBtn
            .parent()
            .parent()
            .parent()
            .attr('id');
        userService
            .deleteUser(userId)
            .then(findAllUsers);
    }
    function selectUser(event) {
        $editBtn =  $(event.currentTarget);
        var userId = $editBtn
            .parent()
            .parent()
            .parent()
            .attr('id');
        findUserById(userId);
        updateUserId = userId;
    }
    function updateUser(event) {
        var user = new User($usernameFld.val(),
            $passwordFld.val(),
            $emailFld.val(),
            $firstNameFld.val(),
            $lastNameFld.val(),
            $phoneFld.val(),
            $roleFld.val(),
            $('#dobFld').val());
        userService
            .updateUser(updateUserId,user)
            .then(alert('Success')).then(findAllUsers);
    }
    function renderUser(user) {
        $usernameFld.val(user.username);
        $emailFld.val(user.email);
        $firstNameFld.val(user.firstName);
        $lastNameFld.val(user.lastName);
        $phoneFld.val(user.phone);
        $roleFld.val(user.role);
        if(!user.dateOfBirth){
            date = null;
        }
        else{
            var date = user.dateOfBirth.substring(0, user.dateOfBirth.indexOf('T'));
        }
        $('#dobFld').val(date);
        // $dateofBirthFld.val(user.dateOfBirth);
    }
    function renderUsers(users) {
        $tbody.empty();
        for(var i=0;i<users.length;i++){
            var user = users[i];
            var clone = $userRowTemplate.clone();
            clone.attr('id', user.id);
            clone.find('.wbdv-username').html(user.username);
            clone.find('.wbdv-first-name').html(user.firstName);
            clone.find('.wbdv-last-name').html(user.lastName);
            clone.find('.wbdv-email').html(user.email);
            clone.find('.wbdv-phone').html(user.phone);
            clone.find('.wbdv-role').html(user.role);
            if(!user.dateOfBirth){
                date = null;
            }
            else{
                var date = user.dateOfBirth.substring(0, user.dateOfBirth.indexOf('T'));
            }
            clone.find('.wbdv-dob').html(date);
            clone.find('.wbdv-remove').click(deleteUser);
            clone.find('.wbdv-edit').click(selectUser);
            $tbody.append(clone);
        }
    }
})();
