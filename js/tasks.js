const toDo = document.getElementById('tab-to-do')
const inProgress = document.getElementById('tab-progress')
const completed = document.getElementById('tab-completed')
const boxInner = document.querySelector('.day-tasks')
const cardContent = document.querySelectorAll('.card-content')
const headerText = document.getElementById('header-text')
var sliderPos = 0

const slider = document.getElementById('container-slider')
const cards = document.querySelectorAll('#container-slider .card')
let positionX = 0

var currentDate = getDate()
var currentTime = getTime()
const ano = getYear()

// updateLocalStorage()
for (let i = 0; i < localStorageUsersPC.length; i++) {
    if (localStorageUsersPC[i].isActive === true) {
        activeUser = localStorageUsersPC[i]
    }
}

//changeSlide()

var selectedDay = currentDate
var currentSlide = parseInt(cards[3].id)

tabToDo()

var currentSlideColor = cards[currentSlide - 1]
currentSlideColor.classList.add('slide-active')

var date = new Date()
var day = date.getDate()
var monthNum = (date.getMonth() + 1)

setDays()
setTitle()


//Define dias do slider
function setDays() {
    for (let i = 0; i < cards.length; i++) {
        var monthInner = cardContent[i].querySelector(':first-child')
        var dayInner = cardContent[i].querySelector(':last-child')
        var monthInnerNum
        monthInner.innerHTML = handleMonth(monthNum)
        monthInnerNum = monthNum.toString().padStart(2, "0")
        dayInner.innerHTML = (day + (i - 3))
        var dataInner = `${ano}-${monthInnerNum}-${dayInner.innerHTML}`
        cards[i].dataset.date = dataInner
    }
}


function handleMonth(month) {
    var meses = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    var indiceMes = month - 1;

    if (indiceMes >= 0 && indiceMes < meses.length) {
        return meses[indiceMes];
    } else {
        return 'Número de mês inválido';
    }
}

//Mudar abas
function changeTab() {
    boxInner.innerHTML = ''

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].user === activeUser.email) {
            if (tasks[i].task.date === selectedDay && tasks[i].task.state === activeTab) {
                category = tasks[i].task.category
                title = tasks[i].task.title
                start = tasks[i].task.start
                end = tasks[i].task.end

                boxInner.innerHTML += "<div class='task-box txt-purple'> <p class='txt-small-italic text-category'>" + category +
                    "</p><h6>" + title + "</h6><img src='../assets/icons/Clock-details.svg'><p class='txt-small-2 text-time'>"
                    + start + " - " + end + "</p></div>"
            }
        }
    }
}



var slidesToChange
var containerWidth = 50

//Slider
function changeSlide(card) {
    targetSlide = parseInt(card.id)
    selectedDay = cards[targetSlide - 1].dataset.date
    changeTab()
    setDays()

    if (currentSlide > targetSlide) {
        if (targetSlide === 1 || targetSlide === 2 || targetSlide === 3 || targetSlide === 4) {
            slidesToChange = currentSlide - 4
        } else if (currentSlide === 9 || currentSlide === 10 || currentSlide === 11) {
            slidesToChange = 9 - targetSlide
        } else {
            slidesToChange = currentSlide - targetSlide
        }
        prevSlide()

    } else if (currentSlide < targetSlide) {
        if (currentSlide === 1 || currentSlide === 2 || currentSlide === 3 || currentSlide === 4) {
            slidesToChange = targetSlide - 4
        } else if (targetSlide === 9 || targetSlide === 10 || targetSlide === 11) {
            slidesToChange = 9 - currentSlide
        } else {
            slidesToChange = targetSlide - currentSlide
        }
        nextSlide()
    }
    setTitle()
    currentSlideColor.classList.add('slide-active')
}

function setTitle() {
    var dataText = cards[currentSlide - 1].dataset.date.split('-')

    if (selectedDay === currentDate) {
        headerText.innerHTML = "Today's tasks"
    } else {
        headerText.innerHTML = handleMonth(dataText[1]) + ', ' + (dataText[2])
        switch (dataText[2]) {
            case 1:
                headerText.innerHTML += 'st - tasks'
                break
            case 2:
                headerText.innerHTML += 'nd - tasks'
                break
            case 3:
                headerText.innerHTML += 'rd - tasks'
                break
            default:
                headerText.innerHTML += 'th - tasks'
                break
        }
    }
}

function nextSlide() {
    currentSlide = targetSlide
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('slide-active')
    }
    currentSlideColor = cards[currentSlide - 1]

    if (currentSlide !== 1 && currentSlide !== 2 && currentSlide !== 3 && currentSlide !== 4) {
        if (currentSlide !== 9 || currentSlide !== 10 || currentSlide !== 11) {
            if (currentSlide > 10 || targetSlide !== 10 || targetSlide !== 11) {
                if (slidesToChange < 0) {
                    return
                }
                sliderPos -= containerWidth * slidesToChange

                anime({
                    targets: slider,
                    duration: 1000,
                    translateX: sliderPos,
                    easing: 'easeInOutQuad',
                });
            }
        }
    }
}

function prevSlide() {
    currentSlide = targetSlide
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('slide-active')
    }
    currentSlideColor = cards[currentSlide - 1]

    if (sliderPos === 0) {
        return;
    }

    if (currentSlide !== 9 && currentSlide !== 10 && currentSlide !== 11) {
        sliderPos += containerWidth * slidesToChange

        anime({
            targets: slider,
            duration: 1000,
            translateX: sliderPos,
            easing: 'easeInOutQuad',
        });
    }
}

//Funções de mudar tab
function tabToDo() {
    activeTab = 'to do'
    toDo.classList.add('tabs-active')
    inProgress.classList.remove('tabs-active')
    completed.classList.remove('tabs-active')
    changeTab()
}

function tabInProgress() {
    activeTab = 'in progress'
    toDo.classList.remove('tabs-active')
    inProgress.classList.add('tabs-active')
    completed.classList.remove('tabs-active')
    changeTab()
}

function tabCompleted() {
    activeTab = 'completed'
    toDo.classList.remove('tabs-active')
    inProgress.classList.remove('tabs-active')
    completed.classList.add('tabs-active')
    changeTab()
}

//Funções de data/tempo
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

function getYear() {
    var defineYear = new Date()
    var year = defineYear.getFullYear()
    return year
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

function updateLocalStorage() {
    localStorage.localStorageTasks = JSON.stringify(tasks)
}

//Funções de indexacção do footer
function goToHome() {
    window.location.href = "../pages/home.html"
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