function UserServiceClient() {
    this.register = register;
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.profile = profile;
    this.login = login;
    this.updateProfile = updateProfile;
    this.logout = logout;
    this.url = '/api/user';
    this.registerAPI = '/api/register';
    var self = this;

    function register(user) {
        return fetch(self.registerAPI, {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            'credentials': 'include'
        });
    }

    function profile() {
        return fetch('/api/profile', {
            'credentials': 'include'
        })
            .then(function (response) {
                return response.json();
            });
    }

    function updateProfile(currentUser, updatedUser) {
        return fetch("/api/user/" + currentUser.id, {
            method: 'put',
            body: JSON.stringify(updatedUser),
            'credentials': 'include',
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    function login(user) {
        return fetch('/api/login', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user),
            'credentials': 'include'
        }).then(function(response) {
            return response.json();
        });
    }

    function logout(user) {
        return fetch('/api/logout', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user),
            'credentials': 'include'
        })
    }

    function createUser(user) {
        return fetch(self.url, {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    function findAllUsers() {
        return fetch(self.url)
            .then(function (response) {
                return response.json();
            });
    }
    function findUserById(userId) {
        return fetch(self.url + '/' + userId)
            .then(function (response) {
                return response.json();
            });
    }
    function updateUser(userId, user) {
        return fetch(self.url + '/' + userId, {
            method: 'put',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                if(response.bodyUsed){
                    return response.json();
                } else {
                    return null;
                }

            });
    }
    function deleteUser(userId) {
        return fetch(self.url + '/' + userId,{
            method: 'delete'
        });
    }
}
