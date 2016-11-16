if (readCookie()) {
    window.location.replace('welcomeLoginHTML.html');
}

function formValidation() {
    var email = document.registration.email;
    var password = document.registration.password;
    var remember = document.registration.remember;
    hideserverErr();
    if (email_validation(email)) {
        password_validation(password, email, remember.checked)
    }
    return false;
}

function email_validation(email) {
    var email_len = email.value.length;
    var err = "";
    hideserverErr();
    if (email_len == 0) {
        err = "Enter your email";
    } else if (!validateEmailForm(email.value)) {
        err = "Enter a valid email";
    }
    if (err) {
        document.getElementById('emailerrid').textContent = err;
        document.getElementById('passworderrid').textContent = "";
        return false;
    }
    return true;
}

function validateEmailForm(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function password_validation(password, email, rememberMe) {
    var password_len = password.value.length;
    var err = "";
    hideserverErr();
    document.getElementById('emailerrid').textContent = "";
    if (password_len == 0) {
        document.getElementById('passworderrid').textContent = "Enter your password";
    } else {
        showLoader();
        validateEmailAndPasswordExist(password.value, email.value, rememberMe);
    }
}
//return -1 if email not found
//return -2 if password is wrong
//return -3 if email and password are correct but need confirmation
//return auth if email and password are correct
function validateEmailAndPasswordExist(password, email, rememberMe) {
    xhr = new XMLHttpRequest();
    xhr.open("POST", url_login, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var rrr = xhr.responseText;
            hideLoader();
            hideserverErr();
            if (rrr == "-1") {
                var str = "Email not found, Sign Up here!";
                var result = str.link("signupHTML.html");
                document.getElementById('passworderrid').textContent = "";
                document.getElementById('emailerrid').innerHTML = result;
            } else if (rrr == "-2") {
                document.getElementById('emailerrid').textContent = "";
                document.getElementById('passworderrid').textContent = "Wrong password";
            } else if (rrr == "-3") {
                document.getElementById('passworderrid').textContent = "";
                var str = "Email need confirmation, check your email! or Resend it here!";
                var result = str.link("resentEmailHTML.html");
                document.getElementById('emailerrid').innerHTML = result;
            } else {
                /*if(rememberMe) {
					setCookieForMonth(rrr);
				}
				setCookie(rrr);*/
				window.location.replace('welcomeLoginHTML.html');
            
            }
        } else {
            serverErr();
        }
    }
    var data = "password=" + password + "&email=" + email;
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

function serverErr() {
    hideLoader();
    document.getElementById('servererrid').textContent = "Oooops! An unexpected error has occurred. try again!";
}

function hideserverErr() {
    document.getElementById('servererrid').textContent = "";
}

function setCookieForMonth(id) {
    var d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "user_id=" + id + ";" + expires + ";path=/";
}

function setCookie(id) {
    document.cookie = "user_id=" + id + ";path=/";
}

function deleteCookie() {
    var now = new Date();
    now.setMonth(now.getMonth() - 1);
    var cookievalue = "user_id;"
    document.cookie = "name=" + cookievalue;
    document.cookie = "expires=" + now.toUTCString() + ";"
}

function readCookie() {
    var allcookies = document.cookie;
    return allcookies.split('=')[1];
    return false;
}