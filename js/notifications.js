const boxInner = document.querySelector('.day-tasks-content')
const prevBoxInner = document.querySelector('.yesterday-tasks-content')
const notBox = document.querySelector('.notification-box')


for (let i = 0; i < localStorageUsersPC.length; i++) {
    if (localStorageUsersPC[i].isActive === true) {
        activeUser = localStorageUsersPC[i]
    }
}

for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].user === activeUser.email) {
        if (tasks[i].task.date === currentDate) {
            title = tasks[i].task.title
            if (tasks[i].task.start <= currentTime) {
                var startTimeText = tasks[i].task.start.split(':')
                var endTimeText = tasks[i].task.end.split(':')
                var currentTimeText = currentTime.split(':')
                if (tasks[i].task.state === 'in progress') {
                    if (startTimeText[1] > currentTimeText[1]) {
                        var difMin = startTimeText[1] - currentTimeText[1]
                    } else if (startTimeText[1] < currentTimeText[1]) {
                        var difMin = currentTimeText[1] - startTimeText[1]
                    }
                    if (startTimeText[0] === currentTimeText[0] || difMin > 60) {
                        var timeDif = parseInt(currentTimeText[1]) - parseInt(startTimeText[1])
                        var timeDifText = timeDif + ' min ago'
                    } else {
                        var timeDif = parseInt(currentTimeText[0]) - parseInt(startTimeText[0])
                        var timeDifText = timeDif + ' hours ago'
                    }
                    //clearNotifications()
                    boxInner.innerHTML = "<div class='notification-box latest-notification txt-purple'>" +
                        "<p class='txt-small-italic text-time'>" + timeDifText + "</p><p class='txt-small'>" +
                        activeUser.name + ", your <span class='txt-bold'>" + tasks[i].task.title + "</span> task should start right now </p></div>" + boxInner.innerHTML

                }
                if (tasks[i].task.state === 'completed') {
                    if (endTimeText[0] === currentTimeText[0]) {
                        var timeDif = parseInt(currentTimeText[1]) - parseInt(endTimeText[1])
                        var timeDifText = timeDif + ' min ago'
                    } else {
                        var timeDif = parseInt(currentTimeText[0]) - parseInt(endTimeText[0])
                        var timeDifText = timeDif + ' hours ago'
                    }
                    //clearNotifications()
                    boxInner.innerHTML = "<div class='notification-box latest-notification txt-purple'>" +
                        "<p class='txt-small-italic text-time'>" + timeDifText + "</p><p class='txt-small'>" +
                        "Congrats, your <span class='txt-bold'>" + tasks[i].task.title + "</span> task is now completed </p></div>" + boxInner.innerHTML
                }
            }

        } else if (tasks[i].task.date === changeDate(currentDate)) {
            title = tasks[i].task.title
            if (tasks[i].task.start <= currentTime) {
                var startTimeText = tasks[i].task.start.split(':')
                var endTimeText = tasks[i].task.end.split(':')
                var currentTimeText = currentTime.split(':')
                if (tasks[i].task.state === 'in progress') {
                    if (startTimeText[0] === currentTimeText[0]) {
                        var timeDif = parseInt(currentTimeText[1]) - parseInt(startTimeText[1])
                        var timeDifText = timeDif + ' min ago'
                    } else {
                        var timeDif = parseInt(currentTimeText[0]) - parseInt(startTimeText[0])
                        var timeDifText = timeDif + ' hours ago'
                    }
                    //clearNotifications()
                    prevBoxInner.innerHTML = "<div class='notification-box txt-purple'>" +
                        "<p class='txt-small-italic text-time'>" + tasks[i].task.start + "</p><p class='txt-small'>" +
                        activeUser.name + ", your <span class='txt-bold'>" + tasks[i].task.title + "</span> task should start right now </p></div>" + prevBoxInner.innerHTML

                }
                if (tasks[i].task.state === 'completed') {
                    if (endTimeText[0] === currentTimeText[0]) {
                        var timeDif = parseInt(currentTimeText[1]) - parseInt(endTimeText[1])
                        var timeDifText = timeDif + ' min ago'
                    } else {
                        var timeDif = parseInt(currentTimeText[0]) - parseInt(endTimeText[0])
                        var timeDifText = timeDif + ' hours ago'
                    }
                    //clearNotifications()
                    prevBoxInner.innerHTML = "<div class='notification-box txt-purple'>" +
                        "<p class='txt-small-italic text-time'>" + tasks[i].task.end + "</p><p class='txt-small'>" +
                        "Congrats, your <span class='txt-bold'>" + tasks[i].task.title + "</span> task is now completed </p></div>" + prevBoxInner.innerHTML
                }
            }
        }
    }
}

function changeDate(date) {
    dia = date.split('-')
    if (dia[2] === 1) {
        newDia = 31
    }
    yesterday = parseInt(dia[2]) - 1
    return `${dia[0]}-${dia[1]}-${yesterday}`
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

function goToProfile() {
    window.location.href = "../pages/profile.html"
}