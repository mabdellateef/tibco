function formValidation() {
    var email = document.registration.email;
    var password = document.registration.password;
    var repassword = document.registration.repassword;
    if (email_validation(email)) {
        password_validation(password, email, repassword);
    }
    return false;
}

function email_validation(email) {
    var email_len = email.value.length;
    var err = "";
    if (email_len == 0) {
        err = "Enter your email";
    } else if (!validateEmailForm(email.value)) {
        err = "Enter a valid email";
    }
    if (err) {
        document.getElementById('repassworderrid').textContent = "";
        document.getElementById('passworderrid').textContent = "";
        document.getElementById('emailerrid').textContent = err;
        email.focus();
        return false;
    }
    return true;
}

function validateEmailForm(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function password_validation(password, email, repassword) {
    var password_len = password.value.length;
    var err = "";
    var mn_value = 8;
    document.getElementById('emailerrid').textContent = "";
    if (password_len == 0) {
        document.getElementById('emailerrid').textContent = "";
        document.getElementById('repassworderrid').textContent = "";
        document.getElementById('passworderrid').textContent = "Enter your password";
        password.focus();
    } else if (password_len < mn_value) {
        document.getElementById('emailerrid').textContent = "";
        document.getElementById('repassworderrid').textContent = "";
        document.getElementById('passworderrid').textContent = "Password must > 8";
        password.focus();
    } else if (password.value != repassword.value) {
        document.getElementById('emailerrid').textContent = "";
        document.getElementById('passworderrid').textContent = "";
        document.getElementById('repassworderrid').textContent = "Passwords don't match";
        repassword.focus();
    } else {
        showLoader();
        validateEmailAndPasswordExist(password.value, email.value);
    }
}

function validateEmailAndPasswordExist(mypassword, myemail) {
    xhr = new XMLHttpRequest();
    var url = "http://aymanmostafa:8000/signuprest";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var rrr = xhr.responseText;
            if (rrr == "true") {
                //successful signup
                window.location.replace('welcomeHTML.html');
            } else {
                hideLoader();
                document.getElementById('repassworderrid').textContent = "";
                document.getElementById('passworderrid').textContent = "";
                var str = "Email already exists, Log in here!";
                var result = str.link("loginHTML.html");
                document.getElementById('emailerrid').innerHTML = result;
                email.focus();
            }
        }
    }
    var data = JSON.stringify({
        "email": myemail,
        "password": mypassword
    });
    xhr.send(data);
}

function showLoader() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("myDiv").style.display = "none";

}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}