const textName = document.querySelector('.info-name')
const textOccupation = document.querySelector('.info-occupation')
const textTasksNum = document.querySelector('.tasks-number')
const img = document.querySelector('.profile-info img')

for (let i = 0; i < localStorageUsersPC.length; i++) {
    if (localStorageUsersPC[i].isActive === true) {
        activeUser = localStorageUsersPC[i]
    }
}

img.src = activeUser.picture
textName.innerHTML = activeUser.name
textOccupation.innerHTML = activeUser.occupation

var completedTasks = 0
for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].user === activeUser.email) {
        if (tasks[i].task.state === 'completed') {
            completedTasks++
        }
    }
}
textTasksNum.innerHTML = 'You have completed ' + completedTasks + ' tasks!'


//Função de log out
function logOut() {
    for (let i = 0; i < users.length; i++) {
        users[i].isActive = false
    }
    updateLocalStorageUsers()
    window.location.href = "../pages/login.html"
}

const updateLocalStorageUsers = () => {
    localStorage.localStorageUsers = JSON.stringify(users)
}

//Funções de indexacção do footer
function goToHome() {
    window.location.href = "../pages/home.html"
}

function goToCreate() {
    window.location.href = "../pages/create.html"
}

function goToTasks() {
    window.location.href = "../pages/tasks.html"
}

function goToNotifications() {
    window.location.href = "../pages/notifications.html"
}