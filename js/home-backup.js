
const profilePicture = document.querySelector('.profile-picture')
const userName = document.getElementById('user-name')
const collegeTasks = document.getElementById('college-tasks')
const workTasks = document.getElementById('work-tasks')
const personalTasks = document.getElementById('personal-tasks')
const studyTasks = document.getElementById('study-tasks')
const socialTasks = document.getElementById('social-tasks')
const homeTasks = document.getElementById('home-tasks')
const progressBar = document.querySelector('.progress-bar div')
const progressText = document.querySelector('.first-content p')
const tasksLeft = document.querySelector('.first-content h6')
const localStorageUsersPC = JSON.parse(localStorage.getItem('localStorageUsers'))
var users = localStorage.getItem('localStorageUsers') !== null ? localStorageUsersPC : []
const localStorageTasksPC = JSON.parse(localStorage.getItem('localStorageTasks'))
var tasks = localStorage.getItem('localStorageTasks') !== null ? localStorageTasksPC : []
var currentDate = getDate()
var currentTime = getTime()

for (let i = 0; i < localStorageUsersPC.length; i++) {
    if (localStorageUsersPC[i].isActive === true) {
        activeUser = localStorageUsersPC[i]
    }
}

//Define nome do usuário
userName.innerHTML = activeUser.name

//Define a quantidade de tarefas por área
numberOfTasks()

//Define o estado das tarefas (To do, in progress, completed)
setTaskState()

//Atualiza o localStorage
updateLocalStorage()

//Define as informações das tasks do dia
setDailyTasks()


//Functions
function numberOfTasks() {
    let taskColNum = 0
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].user === activeUser.email) {
            if (tasks[i].task.category === 'college stuff') {
                taskColNum++
            }
        }
        collegeTasks.innerHTML = taskColNum + ' tasks'
    }

    let taskWorkNum = 0
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].user === activeUser.email) {
            if (tasks[i].task.category === 'work') {
                taskWorkNum++
            }
        }
        workTasks.innerHTML = taskWorkNum + ' tasks'
    }

    let taskStudyNum = 0
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].user === activeUser.email) {
            if (tasks[i].task.category === 'study') {
                taskStudyNum++
            }
        }
        studyTasks.innerHTML = taskStudyNum + ' tasks'
    }

    let taskPersNum = 0
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].user === activeUser.email) {
            if (tasks[i].task.category === 'personal project') {
                taskPersNum++
            }
        }
        personalTasks.innerHTML = taskPersNum + ' tasks'
    }

    let taskSocialNum = 0
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].user === activeUser.email) {
            if (tasks[i].task.category === 'social life') {
                taskSocialNum++
            }
        }
        socialTasks.innerHTML = taskSocialNum + ' tasks'
    }

    let taskHomeNum = 0
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].user === activeUser.email) {
            if (tasks[i].task.category === 'home') {
                taskHomeNum++
            }
        }
        homeTasks.innerHTML = taskHomeNum + ' tasks'
    }
}

function setTaskState() {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].user === activeUser.email) {
            if (tasks[i].task.date > currentDate) {
                tasks[i].task.state = 'to do'
            } else if (tasks[i].task.date < currentDate) {
                tasks[i].task.state = 'completed'
            } else {
                if (tasks[i].task.start <= currentTime && tasks[i].task.end > currentTime) {
                    tasks[i].task.state = 'in progress'
                } else if (tasks[i].task.start < currentTime && tasks[i].task.end < currentTime) {
                    tasks[i].task.state = 'completed'
                } else if (tasks[i].task.start > currentTime) {
                    tasks[i].task.state = 'to do'
                }
            }
        }
    }
}

function updateLocalStorage() {
    localStorage.localStorageTasks = JSON.stringify(tasks)
}

function setDailyTasks() {
    var dailyTasks = 0
    var completedDailyTasks = 0
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].user === activeUser.email) {
            if (tasks[i].task.date === currentDate) {
                dailyTasks++
                if (tasks[i].task.state === 'completed') {
                    completedDailyTasks++
                }
            }
        }
    }
    const tasksLeftNum = dailyTasks - completedDailyTasks
    const completedDailyTasksPorcent = (completedDailyTasks * 100) / dailyTasks

    if (tasksLeftNum > 0) {
        tasksLeft.innerHTML = 'You have ' + tasksLeftNum + ' more tasks to do!'
    } else {
        tasksLeft.innerHTML = 'You have no more tasks to do!'
    }

    if ((completedDailyTasksPorcent % 1) === 0) {
        progressText.innerHTML = completedDailyTasksPorcent + '%'
    } else {
        progressText.innerHTML = completedDailyTasksPorcent.toFixed(2) + '%'
    }

    progressBar.setAttribute('style', 'width:' + completedDailyTasksPorcent + '%')
}

function getTime() {
    var currDate = new Date()
    var hour = currDate.getHours()
    var minutes = currDate.getMinutes()
    if (hour < 10) {
        hour = '0' + hour
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    var currentTimeFunction = `${hour}:${minutes}`
    return currentTimeFunction
}

function getDate() {
    var currDate = new Date()
    var year = currDate.getFullYear()
    var month = (currDate.getMonth() + 1).toString().padStart(2, "0")
    var day = currDate.getDate().toString().padStart(2, "0")
    var minDate = `${year}-${month}-${day}`
    var currentDateFunction = minDate
    return currentDateFunction
}

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