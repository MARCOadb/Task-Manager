const title = document.querySelector('.field-title')
const date = document.querySelector('.field-date')
const start = document.querySelector('.field-start')
const end = document.querySelector('.field-end')
const description = document.querySelector('.field-description')
const college = document.querySelector('.cat-college')
const work = document.querySelector('.cat-work')
const social = document.querySelector('.cat-social')
const study = document.querySelector('.cat-study')
const personal = document.querySelector('.cat-personal')
const home = document.querySelector('.cat-home')
const imgCalendar = document.getElementById('img-calendar')
const imgClock1 = document.getElementById('img-clock-1')
const imgClock2 = document.getElementById('img-clock-2')
const fieldErrorMsg = document.querySelector('.field-error-msg')
const dateErrorMsg = document.querySelector('.date-error-msg')
const timeErrorMsg = document.querySelector('.time-error-msg')
const successMsg = document.querySelector('.success')
var category

//Carrega informações do localStorage
const localStorageUsers = JSON.parse(localStorage.getItem('localStorageUsers'))
var users = localStorage.getItem('localStorageUsers') !== null ? localStorageUsers : []

for (let i = 0; i < localStorageUsersPC.length; i++) {
    if (localStorageUsersPC[i].isActive === true) {
        activeUser = localStorageUsersPC[i].email
    }
}

//Determinando a categoria da task
function catCollege() {
    college.classList.toggle('cat-active')
    work.classList.remove('cat-active')
    social.classList.remove('cat-active')
    study.classList.remove('cat-active')
    personal.classList.remove('cat-active')
    home.classList.remove('cat-active')
    if (category === 'college stuff') {
        category = undefined
    } else {
        category = 'college stuff'
    }
}
function catWork() {
    college.classList.remove('cat-active')
    work.classList.toggle('cat-active')
    social.classList.remove('cat-active')
    study.classList.remove('cat-active')
    personal.classList.remove('cat-active')
    home.classList.remove('cat-active')
    if (category === 'work') {
        category = undefined
    } else {
        category = 'work'
    }
}
function catSocial() {
    college.classList.remove('cat-active')
    work.classList.remove('cat-active')
    social.classList.toggle('cat-active')
    study.classList.remove('cat-active')
    personal.classList.remove('cat-active')
    home.classList.remove('cat-active')
    if (category === 'social life') {
        category = undefined
    } else {
        category = 'social life'
    }
}
function catStudy() {
    college.classList.remove('cat-active')
    work.classList.remove('cat-active')
    social.classList.remove('cat-active')
    study.classList.toggle('cat-active')
    personal.classList.remove('cat-active')
    home.classList.remove('cat-active')
    if (category === 'study') {
        category = undefined
    } else {
        category = 'study'
    }
}
function catPersonal() {
    college.classList.remove('cat-active')
    work.classList.remove('cat-active')
    social.classList.remove('cat-active')
    study.classList.remove('cat-active')
    personal.classList.toggle('cat-active')
    home.classList.remove('cat-active')
    if (category === 'personal project') {
        category = undefined
    } else {
        category = 'personal project'
    }
}
function catHome() {
    college.classList.remove('cat-active')
    work.classList.remove('cat-active')
    social.classList.remove('cat-active')
    study.classList.remove('cat-active')
    personal.classList.remove('cat-active')
    home.classList.toggle('cat-active')
    if (category === 'home') {
        category = undefined
    } else {
        category = 'home'
    }
}

class Task {
    constructor(title, date, start, end, category, description) {
        this.title = title;
        this.date = date;
        this.start = start;
        this.end = end;
        this.category = category;
        this.description = description;
    }
}

class UserTask {
    constructor(user, task) {
        this.user = user;
        this.task = task
    }
}

const localStorageTasksPC = JSON.parse(localStorage.getItem('localStorageTasks'))
var tasks = localStorage.getItem('localStorageTasks') !== null ? localStorageTasksPC : []

function getDateTime() {
    var currDate = new Date()
    var year = currDate.getFullYear()
    var month = (currDate.getMonth() + 1).toString().padStart(2, "0")
    var day = currDate.getDate().toString().padStart(2, "0")
    var hour = currDate.getHours()
    var minutes = currDate.getMinutes()
    var minDate = `${year}-${month}-${day}`
    if (hour < 10) {
        hour = '0' + hour
    }
    var minTime = `${hour}:${minutes}`
    date.min = minDate
    start.min = minTime
}

//Botão Criar Tarefa
function saveTask() {
    getDateTime()
    //Confere se os campos estão preenchidos
    if (!title.value || !date.value || !start.value || !end.value || !category) {
        fieldError()
    } else {
        const timeValid = testTime()
        if (timeValid) {

            var taskDetails = new Task(
                title.value,
                date.value,
                start.value,
                end.value,
                category
            )

            var task = new UserTask(
                activeUser,
                taskDetails
            )

            tasks.push(task)
            localStorage.localStorageTasks = JSON.stringify(tasks)
            success()
        }
    }
}
function goToHome() {
    window.location.href = "../pages/home.html"
}

function deleteTask() {
    title.value = ''
    date.value = ''
    start.value = ''
    end.value = ''
    description.value = ''
    category = undefined
    college.classList.remove('cat-active')
    work.classList.remove('cat-active')
    social.classList.remove('cat-active')
    study.classList.remove('cat-active')
    personal.classList.remove('cat-active')
    home.classList.remove('cat-active')
}

function testTime() {
    if (date.value < date.min) {
        dateError()
    } else {
        if (date.value === date.min) {
            if (start.value <= start.min) {
                timeError()
            } else {
                if (end.value > start.value) {
                    return true
                } else {
                    timeError()
                }
            }
        } else {
            if (end.value > start.value) {
                return true
            } else {
                timeError()
            }
        }
    }
}

function fieldError() {
    fieldErrorMsg.classList.remove('hidden')
    fieldErrorMsg.classList.add('animate__shakeX')
    setTimeout(function () {
        fieldErrorMsg.classList.add('hidden')
    }, 4000)
}

function dateError() {
    dateErrorMsg.classList.remove('hidden')
    dateErrorMsg.classList.add('animate__shakeX')
    date.value = ''
    setTimeout(function () {
        dateErrorMsg.classList.add('hidden')
    }, 4000)
}

function timeError() {
    timeErrorMsg.classList.remove('hidden')
    timeErrorMsg.classList.add('animate__shakeX')
    start.value = ''
    end.value = ''
    setTimeout(function () {
        timeErrorMsg.classList.add('hidden')
    }, 4000)
}

function success() {
    successMsg.classList.remove('hidden')
    successMsg.classList.add('animate__bounceIn')
    setTimeout(function () {
        successMsg.classList.add('hidden')
    }, 4000)
}