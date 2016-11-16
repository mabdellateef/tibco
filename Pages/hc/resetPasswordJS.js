var t = window.location.search;
var temp = t.split("&", 2);
var token = temp[1];
temp = temp[0].split("?", 2);
var email = temp[1];
xhr = new XMLHttpRequest();
xhr.open("POST", url_resetPassword_validation, true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function() {
    if ((xhr.readyState == 4 && xhr.status == 200)) {
        var rrr = xhr.responseText;
        document.getElementById('errid').textContent = "";
        if (rrr == "true") {
            showForm();
        } else if (rrr == "false") {
            hideLoader();
            document.getElementById('errid').textContent = "The url is invalid or expired!";
        } else {
            hideLoader();
            document.getElementById('errid').textContent = "Oooops! An unexpected error has occurred. try again!";
        }
    } else {
        hideLoader();
        document.getElementById('errid').textContent = "Oooops! An unexpected error has occurred. try again!";
    }
}
var data = "email=" + email + "&token=" + token;
xhr.send(data);

function hideLoader() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}

function showForm() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "none";
    document.getElementById("FormDiv").style.display = "block";
}

function formValidation() {
    var password = document.registration.password;
    var repassword = document.registration.repassword;
    password_validation(password, repassword);
    return false;
}

function password_validation(password, repassword) {
    var password_len = password.value.length;
    var err = "";
    var mn_value = 8;
    if (password_len == 0) {
        document.getElementById('repassworderrid').textContent = "";
        document.getElementById('passworderrid').textContent = "Enter your password";
        password.focus();
    } else if (password_len < mn_value) {
        document.getElementById('repassworderrid').textContent = "";
        document.getElementById('passworderrid').textContent = "Password must > 8";
        password.focus();
    } else if (password.value != repassword.value) {
        document.getElementById('passworderrid').textContent = "";
        document.getElementById('repassworderrid').textContent = "Passwords don't match";
        repassword.focus();
    } else {
        showLoader();
        xhr = new XMLHttpRequest();
        xhr.open("POST", url_resetPassword_send, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var rrr = xhr.responseText;
                if (rrr == "true") {
                    hideLoader();
                    document.getElementById('errid').textContent = "";
                    document.getElementById('sucessid').textContent = "Congratulations! you will redirected to login";
                    window.setTimeout(function() {
                        window.location.href = "loginHTML.html";
                    }, 1000);
                    document.getElementById("sucessloading").style.display = "block";
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("myDiv").style.display = "none";
                } else if (rrr == "false") {
                    hideLoader();
                    document.getElementById('errid').textContent = "Oooops! An unexpected error has occurred. try again!";
                } else {
                    hideLoader();
                    document.getElementById('errid').textContent = "Oooops! An unexpected error has occurred. try again!";
                }
            } else {
                hideLoader();
                document.getElementById('errid').textContent = "Oooops! An unexpected error has occurred. try again!";
            }
        }
        var data = "email=" + email + "&password=" + password.value;
        xhr.send(data);
    }
}

function showLoader() {
    document.getElementById("myDiv").style.display = "none";
    document.getElementById("FormDiv").style.display = "none";
    document.getElementById("loader").style.display = "block";
}