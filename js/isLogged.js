var isLoggedIn = false
const authenticationErrorMsg = document.querySelector('.authentication-error-msg')

if (localStorage.localStorageUsers) {
    localStorageUsersPC = JSON.parse(localStorage.getItem('localStorageUsers'))
}

for (let i = 0; i < localStorageUsersPC.length; i++) {
    if (localStorageUsersPC[i].isActive === true) {
        isLoggedIn = true
        break
    } else {
        isLoggedIn = false
    }
}

if (!isLoggedIn) {
    authenticationError()
}

function authenticationError() {
    authenticationErrorMsg.classList.remove('hidden')
    authenticationErrorMsg.classList.add('animate__shakeX')
    setTimeout(function () {
        authenticationErrorMsg.classList.add('hidden')
        window.location.href = "../pages/login.html"
    }, 3000)
}