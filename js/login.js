var passwordType = document.querySelector('.show-password')
var senha = document.querySelector('.field-password')
var email = document.querySelector('.field-email')
var showPassword = document.querySelector('.show')
var hidePassword = document.querySelector('.hide')
var btnLogin = document.querySelector('.btn-login')
var emailErrorMsg = document.querySelector('.email-error-msg')
var passwordErrorMsg = document.querySelector('.password-error-msg')
var emailErrorMsg2 = document.querySelector('.email-error-msg-2')

//Carrega informações do localStorage
const localStorageUsersPC = JSON.parse(localStorage.getItem('localStorageUsers'))
var users = localStorage.getItem('localStorageUsers') !== null ? localStorageUsersPC : []

//confere informações de login
btnLogin.addEventListener('click', () => {

    const validEmail = testEmail()

    if (validEmail) {
        validPassword = testPassword()
    }

    if (validEmail && validPassword) {
        console.log('entrou no valid')
        for (let i = 0; i < users.length; i++) {
            console.log('entrou no loop')
            if (users[i].email === email.value) {
                users[i].isActive = true
                console.log('BINGOOOO')
            } else {
                users[i].isActive = false
            }
        }
        updateLocalStorage()
        window.location.href = "../pages/home.html"
    }
})

const updateLocalStorage = () => {
    localStorage.localStorageUsers = JSON.stringify(users)
}

function testEmail() {
    //confere se email é válido
    let emailValido = validarEmail(email.value)

    if (emailValido) {
        console.log('email válido')
    } else {
        console.log('email inválido')
        showEmailError()
        email.value = ""
    }
    //confere se email está presente na lista de users
    var usuarioEncontrado = false;
    for (var i = 0; i < users.length; i++) {
        if (email.value === users[i].email) {
            console.log('Usuário Encontrado!')
            usuarioEncontrado = true
            return usuarioEncontrado
            break
        }
    }
    if (!usuarioEncontrado && emailValido) {
        console.log('Usuário não encontrado')
        showEmailError2()
        return usuarioEncontrado
    }
}

function testPassword() {
    //confere se a senha é válida
    let senhaValida = validarSenha(senha.value)
    if (senhaValida) {
        console.log('senha válida')
    } else {
        console.log('senha inválida')
        showPasswordError()
        senha.value = ""
    }

    //confere se a senha está correta
    let senhaCorreta = false;
    for (var i = 0; i < users.length; i++) {
        if (senha.value === users[i].password) {
            console.log('Senha Correta!!')
            senhaCorreta = true
            return senhaCorreta
        }
    }
    if (!senhaCorreta) {
        console.log('Senha incorreta')
        showPasswordError()
        senha.value = ""
        return senhaCorreta
    }
}

function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validarSenha(senha) {
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return senhaRegex.test(senha)
}

function showEmailError() {
    emailErrorMsg.classList.remove('hidden')
    emailErrorMsg.classList.add('animate__shakeX')
    setTimeout(function () {
        emailErrorMsg.classList.add('hidden')
    }, 3000)
}

function showEmailError2() {
    emailErrorMsg2.classList.remove('hidden')
    emailErrorMsg2.classList.add('animate__shakeX')
    setTimeout(function () {
        emailErrorMsg2.classList.add('hidden')
    }, 3000)
}

function showPasswordError() {
    passwordErrorMsg.classList.remove('hidden')
    passwordErrorMsg.classList.add('animate__shakeX')
    setTimeout(function () {
        passwordErrorMsg.classList.add('hidden')
    }, 3000)
}

passwordType.addEventListener('click', (e) => {
    e.preventDefault()
    if (senha.type === 'password') {
        senha.type = 'text'
        hidePassword.classList.remove('hidden')
        showPassword.classList.add('hidden')
    } else {
        senha.type = 'password'
        showPassword.classList.remove('hidden')
        hidePassword.classList.add('hidden')
    }
})