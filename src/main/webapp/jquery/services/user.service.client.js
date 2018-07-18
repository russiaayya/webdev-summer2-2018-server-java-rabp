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
    // this.usernameCount = usernameCount;
    this.findByUsername = findByUsername;
    this.sendEmail = sendEmail;
    this.url = '/api/user';
    this.registerAPI = '/api/register';
    this.profileAPI = '/api/profile';
    this.loginAPI = '/api/login';
    this.logoutAPI = '/api/logout';
    this.usernameAPI = '/api/users';
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
        return fetch(self.profileAPI, {
            'credentials': 'include'
        })
            .then(function (response) {
                return response.json();
            });
    }

    function updateProfile(currentUser, updatedUser) {
        return fetch(self.url + '/' + currentUser.id, {
            method: 'put',
            body: JSON.stringify(updatedUser),
            'credentials': 'include',
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    function login(user) {
        return fetch(self.loginAPI, {
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
        return fetch(self.logoutAPI, {
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

    function findByUsername(username) {
        return fetch(self.usernameAPI+ username)
            .then(function (response) {
                return response.json();
            });
    }

    function sendEmail(username) {
        return fetch(self.usernameAPI, {
            method: 'post',
            body: username,
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    // function usernameCount(username) {
    //     return fetch('/api/usercount/'+ username, {
    //         method: 'get'
    //     });
    // }
}
