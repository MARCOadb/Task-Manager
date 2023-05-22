const profileImg = document.querySelector('.profile-picture-img')
const profileInput = document.querySelector('.profile-picture-input')
const btnSave = document.querySelector('.btn-save')
const nome = document.querySelector('.field-name')
const occupation = document.querySelector('.field-occupation')
const password = document.querySelector('.field-password')
const passwordType = document.querySelector('.show-password')
const showPassword = document.querySelector('.show')
const hidePassword = document.querySelector('.hide')
const passwordErrorMsg = document.querySelector('.password-error-msg')
const passwordErrorMsg2 = document.querySelector('.password-error-msg-2')
const fieldErrorMsg = document.querySelector('.field-error-msg')
const successMsg = document.querySelector('.success')

//Define Foto de perfil
profileInput.addEventListener('change', (e) => {
    const file = e.target.files[0]

    if (file) {
        const reader = new FileReader();

        reader.onload = function () {
            profileImg.src = reader.result
        }
        reader.readAsDataURL(file)
    }
})

//Carrega informações do localStorage
const localStorageUsersPC = JSON.parse(localStorage.getItem('localStorageUsers'))
var users = localStorage.getItem('localStorageUsers') !== null ? localStorageUsersPC : []

for (let i = 0; i < localStorageUsersPC.length; i++) {
    if (localStorageUsersPC[i].isActive === true) {
        activeUser = localStorageUsersPC[i]
    }
}

profileImg.src = activeUser.picture

//Botao Save
btnSave.addEventListener('click', () => {
    //Confere se senha é usável
    let senhaValida = validarSenha(password.value)

    if (senhaValida) {
        //Atualiza informações de usuário
        if (nome.value) {
            activeUser.name = nome.value
        }
        if (occupation.value) {
            activeUser.occupation = occupation.value
        }
        if (password.value) {
            activeUser.password = password.value
        }
        activeUser.picture = profileImg.src
        localStorage.localStorageUsers = JSON.stringify(users)
        success()
    } else {
        console.log('oi')
        showPasswordError()
        password.value = ""
    }
})

function validarSenha(senha) {
    if (password.value === activeUser.password) {
        showPasswordError2()
        password.value = ''
    } else {
        if (password.value === '') {
            return true
        } else {
            const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
            return senhaRegex.test(senha)
        }
    }
}

function showPasswordError() {
    passwordErrorMsg.classList.remove('hidden')
    passwordErrorMsg.classList.add('animate__shakeX')
    setTimeout(function () {
        passwordErrorMsg.classList.add('hidden')
    }, 5000)
}

function showPasswordError2() {
    passwordErrorMsg2.classList.remove('hidden')
    passwordErrorMsg2.classList.add('animate__shakeX')
    setTimeout(function () {
        passwordErrorMsg2.classList.add('hidden')
    }, 5000)
}

function success() {
    successMsg.classList.remove('hidden')
    successMsg.classList.add('animate__bounceIn')
    setTimeout(function () {
        successMsg.classList.add('hidden')
        window.location.href = "../pages/profile.html"
    }, 4000)
}

//Função esconde e mostra senha
passwordType.addEventListener('click', (e) => {
    e.preventDefault()
    if (password.type === 'password') {
        password.type = 'text'
        hidePassword.classList.remove('hidden')
        showPassword.classList.add('hidden')
    } else {
        password.type = 'password'
        showPassword.classList.remove('hidden')
        hidePassword.classList.add('hidden')
    }
})