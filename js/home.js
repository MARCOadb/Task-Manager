/* no login e signup criar variáveis
que virem TRUE quando der sucesso
(isLoggedIn) ou algo assim. Quando entrar em qualquer
página que não seja o signuo ou login, vai perguntar
se (isLoggedIn === true) se sim, continua tudo certo,
se não, ele redireciona pro login com
window.location.href = '' */

const localStorageUsers = JSON.parse(localStorage.getItem('localStorageUsers'))
var users = localStorage.getItem('localStorageUsers') !== null ? localStorageUsers : []


function goToTasks() {
    window.location.href = "../pages/tasks.html"
}

function goToCreate() {
    window.location.href = "../pages/create.html"
}

function goToNotifications() {
    window.location.href = "../pages/notifications.html"
}

function goToProfile() {
    window.location.href = "../pages/profile.html"
}