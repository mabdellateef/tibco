function formValidation() {
    var email = document.registration.email;
    var password = document.registration.password;
	var remember = document.registration.remember;
    if (email_validation(email)) {
        if (password_validation(password, email)) {
			if(remember.checked) {
				//save login information
			}
            alert(email.value + " " + password.value);
        }
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
        email.focus();
        return false;
    }
    return true;
}

function validateEmailForm(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function password_validation(password, email) {
    var password_len = password.value.length;
    var err = "";
	document.getElementById('emailerrid').textContent="";
    if (password_len == 0) {
        document.getElementById('passworderrid').textContent = "Enter your password";
        password.focus();
    } else {
        var validateEmailAndPasswordExistRes = validateEmailAndPasswordExist(password.value, email.value);
        if (validateEmailAndPasswordExistRes == -1) {
			var str = "Email not found, Sign Up here!";
            var result = str.link("signupHTML.html");
            document.getElementById('emailerrid').innerHTML = result;
            email.focus();
        }
        else if (validateEmailAndPasswordExistRes == 0) {
            document.getElementById('passworderrid').textContent = "Wrong password";
            password.focus();
        }
		else if (validateEmailAndPasswordExistRes == 1) {
			var str = "Email need confirmation, resend?";
            var result = str.link("confirmationEmailHTML.html");
			document.getElementById('emailerrid').innerHTML = result;
            email.focus();
        }
        else if (validateEmailAndPasswordExistRes == 2) {
			document.getElementById('passworderrid').textContent="";
            return true;
        }
    }
	
    return false;
}
//return -1 if email not found
//return 0 if password is wrong
//return 1 if email and password are correct but need confirmation
//return 2 if email and password are correct
function validateEmailAndPasswordExist(password, email) {

    //Waiting for webservices to be implemented to complete the function
    return 2;
}