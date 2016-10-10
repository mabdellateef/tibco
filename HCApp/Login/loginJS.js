function formValidation() {
    var email = document.registration.email;
    var password = document.registration.password;
    var remember = document.registration.remember;
    if (email_validation(email)) {
        password_validation(password, email, remember.checked)
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
        document.getElementById('emailerrid').textContent = err;
		document.getElementById('passworderrid').textContent = "";
        email.focus();
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
    document.getElementById('emailerrid').textContent = "";
    if (password_len == 0) {
        document.getElementById('passworderrid').textContent = "Enter your password";
        password.focus();
    } else {
        showLoader();
        validateEmailAndPasswordExist(password.value, email.value, rememberMe);
    }
}
//return -1 if email not found
//return -2 if password is wrong
//return -3 if email and password are correct but need confirmation
//return user_id if email and password are correct
function validateEmailAndPasswordExist(password, email, rememberMe) {
    xhr = new XMLHttpRequest();
    var url = "http://aymanmostafa:8000/login";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var rrr = xhr.responseText;
			hideLoader();
            if (rrr == "-1") {
                var str = "Email not found, Sign Up here!";
                var result = str.link("signupHTML.html");
				document.getElementById('passworderrid').textContent = "";
                document.getElementById('emailerrid').innerHTML = result;
                email.focus();
            } else if (rrr == "-2") {
				 document.getElementById('emailerrid').textContent = "";
                document.getElementById('passworderrid').textContent = "Wrong password";
                password.focus();
            } else if (rrr == "-3") {
				document.getElementById('passworderrid').textContent = "";
                document.getElementById('emailerrid').textContent = "Email need confirmation, check your email";
                email.focus();
            } else {
                if(rememberMe) {
					//cookies codes
				}
				window.location.replace('welcomeLoginHTML.html');
            }
        }
    }
    var data = JSON.stringify({
        "email": email,
        "password": password
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