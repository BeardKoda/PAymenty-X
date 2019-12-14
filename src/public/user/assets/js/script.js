const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateUsername = username => {
    format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return format.test(String(username));
};

const validate = (e, formName) => {
    const form = document.forms[formName];

    !form.checkValidity() ? e.preventDefault() : true;

};

const checkEmailField = (formName) => {
    const form = document.forms[formName];
    const email = form["email"];
    const emailErrorText = document.querySelector("#email_error");

    if (!validateEmail(email.value)) {
        email.setCustomValidity('Invalid');
        email.classList.add("error");
        emailErrorText.classList.add("d_show");
        return false;
    } else {
        email.setCustomValidity('');
        email.classList.remove("error");
        emailErrorText.classList.remove("d_show");
        return true;
    }
};

const checkUsernameField = (formName) => {
    const form = document.forms[formName];
    const username = form["username"];
    const usernameErrorText = document.querySelector("#username_error");

    switch (true) {
        case username.value.length === 0:
            usernameErrorText.textContent = "Please input a username";
            username.classList.add("error");
            usernameErrorText.classList.add("d_show");
            break;

        case validateUsername(username.value) ||
            (username.value.length < 3 && validateUsername(username.value)):
            usernameErrorText.textContent =
                "Please input only letters and numbers";
            username.classList.add("error");
            usernameErrorText.classList.add("d_show");
            break;

        case username.value.length < 3:
            usernameErrorText.textContent =
                "Username cannot be less than 3 characters";
            username.classList.add("error");
            usernameErrorText.classList.add("d_show");
            break;

        default:
            usernameErrorText.textContent = "";
            username.classList.remove("error");
            usernameErrorText.classList.remove("d_show");
            break;
    }
};

const checkPasswordField = (formName) => {
    const form = document.forms[formName];
    const passwrd = form["passwrd"];
    const passwordErrorText = document.querySelector("#password_error");

    if (passwrd.value.length < 8) {
        passwrd.classList.add("error");
        passwordErrorText.classList.add("d_show");
    } else {
        passwrd.classList.remove("error");
        passwordErrorText.classList.remove("d_show");
        return true;
    }
};
