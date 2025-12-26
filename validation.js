// Валидация форм
document.addEventListener('DOMContentLoaded', function() {
    // Регистрационная форма
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateRegisterForm()) {
                // В реальном проекте здесь будет отправка на сервер
                alert('Регистрация успешна! Перенаправление в личный кабинет...');
                window.location.href = 'lk.html';
            }
        });
        
     
        registerForm.addEventListener('input', function(e) {
            validateField(e.target);
        });
    }
    
   
    const loginInput = document.getElementById('login');
    if (loginInput) {
        loginInput.addEventListener('blur', function() {
            checkLoginAvailability(this.value);
        });
    }
});

function validateRegisterForm() {
    let isValid = true;
    const form = document.getElementById('registerForm');
    
    // ФИО
    const fio = form.querySelector('#fio');
    if (!validateFIO(fio.value)) {
        showError(fio, 'ФИО должно содержать только кириллицу, пробелы и дефис');
        isValid = false;
    }
    

    const login = form.querySelector('#login');
    if (!validateLogin(login.value)) {
        showError(login, 'Логин должен содержать только латинские буквы');
        isValid = false;
    }
    
    // Email
    const email = form.querySelector('#email');
    if (!validateEmail(email.value)) {
        showError(email, 'Введите корректный email');
        isValid = false;
    }
    

    const password = form.querySelector('#password');
    const passwordRepeat = form.querySelector('#password_repeat');
    if (password.value.length < 6) {
        showError(password, 'Пароль должен быть не менее 6 символов');
        isValid = false;
    }
    if (password.value !== passwordRepeat.value) {
        showError(passwordRepeat, 'Пароли не совпадают');
        isValid = false;
    }
    

    const agree = form.querySelector('#agree');
    if (!agree.checked) {
        showError(agree, 'Необходимо согласие');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value;
    const errorElement = field.parentElement.querySelector('.error-message');
    
    switch(field.name) {
        case 'fio':
            if (value && !validateFIO(value)) {
                showError(field, 'Только кириллица, пробелы и дефис');
            } else {
                clearError(field);
            }
            break;
            
        case 'login':
            if (value && !validateLogin(value)) {
                showError(field, 'Только латинские буквы');
            } else {
                clearError(field);
            }
            break;
            
        case 'email':
            if (value && !validateEmail(value)) {
                showError(field, 'Неверный формат email');
            } else {
                clearError(field);
            }
            break;
    }
}

function validateFIO(fio) {
    return /^[А-Яа-яЁё\s\-]+$/.test(fio);
}

function validateLogin(login) {
    return /^[a-zA-Z]+$/.test(login);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkLoginAvailability(login) {
    if (!validateLogin(login)) return;
    
 
    setTimeout(() => {
        const takenLogins = ['admin', 'user', 'test']; // Эмулируем занятые логины
        const field = document.getElementById('login');
        
        if (takenLogins.includes(login)) {
            showError(field, 'Этот логин уже занят');
        } else {
            clearError(field);
     
            const success = document.createElement('div');
            success.className = 'success-message';
            success.innerHTML = '<i class="fas fa-check"></i> Логин доступен';
            success.style.cssText = 'color: #10b981; margin-top: 5px; font-size: 0.875rem;';
            field.parentElement.appendChild(success);
            setTimeout(() => success.remove(), 3000);
        }
    }, 500);
}

function showError(field, message) {
    clearError(field);
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorDiv.style.animation = 'fadeIn 0.3s ease';
    
    field.parentElement.appendChild(errorDiv);
}

function clearError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}