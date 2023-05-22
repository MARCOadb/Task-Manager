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

setTaskState()
updateLocalStorage()

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
                } else if (tasks[i].task.end <= currentTime) {
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