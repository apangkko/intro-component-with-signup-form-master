const form = document.querySelector(".signup__form");
const firstNameEl = document.querySelector("#firstName");
const lastNameEl = document.querySelector("#lastName");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");

const checkFirstname = () => {

    let valid = false;
    const firstname = firstNameEl.value.trim();

    if (!isRequired(firstname)) {
        showError(firstNameEl, 'First Name cannot be empty');
        firstNameEl.parentElement.classList.add('invalidate');
    } else {
        firstNameEl.parentElement.classList.remove('invalidate');
        valid = true;
    }
    return valid;
};

const checkLastname = () => {

    let valid = false;
    const lastname = lastNameEl.value.trim();

    if (!isRequired(lastname)) {
        showError(lastNameEl, 'Last Name cannot be empty');
        lastNameEl.parentElement.classList.add('invalidate');
    } else {
        lastNameEl.parentElement.classList.remove('invalidate');
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isEmailValid(email)) {
        showError(emailEl, 'Look like this is not an email');
        emailEl.parentElement.classList.add('invalidate');
    } else {
        emailEl.parentElement.classList.remove('invalidate');
        valid = true;
    }
    return valid;
};

const checkPassword = () => {

    let valid = false;
    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be empty');
        passwordEl.parentElement.classList.add('invalidate');
    } else {
        passwordEl.parentElement.classList.remove('invalidate');
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isRequired = value => value === '' ? false : true;

const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    const error = formField.querySelector('small');
    error.textContent = message;
};

form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isFirstnameValid = checkFirstname(),
        isLastnameValid = checkLastname(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();

    let isFormValid = isFirstnameValid &&
        isLastnameValid &&
        isEmailValid &&
        isPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        alert('Thank You! Your submission has been received.');
    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'firstName':
            checkFirstname();
            break;
        case 'lastName':
            checkLastname();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
    }
}));