(function () {
    var $usernameFld, $passwordFld, $roleFld;
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
        $('.wbdv-update').click(updateUser);
        findAllUsers();
    }

    function createUser() {
        var username = $('#usernameFld').val();
        var password = $('#passwordFld').val();
        var firstName = $('#firstNameFld').val();
        var lastName = $('#lastNameFld').val();
        var role = $('#roleFld').val();

        var user = new User(username,password,null,firstName,lastName,null,role,null);

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
            null,
            $firstNameFld.val(),
            $lastNameFld.val(),
            null,
            $roleFld.val(),
            null);
        userService
            .updateUser(updateUserId,user)
            .then(alert('Success')).then(findAllUsers);
    }
    function renderUser(user) {
        $usernameFld.val(user.username);
        $firstNameFld.val(user.firstName);
        $lastNameFld.val(user.lastName);
        $roleFld.val(user.role);
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
            clone.find('.wbdv-role').html(user.role);
            clone.find('.wbdv-remove').click(deleteUser);
            clone.find('.wbdv-edit').click(selectUser);
            $tbody.append(clone);
        }
    }
})();
