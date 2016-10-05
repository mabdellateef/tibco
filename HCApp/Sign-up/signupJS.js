function formValidation() {
	
	
    var email = document.registration.email;
    var password = document.registration.password;
    var repassword = document.registration.repassword;
    if (email_validation(email)) {
        if (password_validation(password, email, repassword)) {
            alert("Done");
			//generateUniqueID(email.value); //generate unique id for email verfication
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
        var validateEmailAndPasswordExistRes = validateEmailAndPasswordExist(password.value, email.value);
        if (!validateEmailAndPasswordExistRes) {
			document.getElementById('repassworderrid').textContent = "";
			document.getElementById('passworderrid').textContent = "";
			var str = "Email already exists, Log in here!";
            var result = str.link("loginHTML.html");
            document.getElementById('emailerrid').innerHTML = result;
            email.focus();
        }
        else if (validateEmailAndPasswordExistRes) {
            document.getElementById('repassworderrid').textContent = "";
            return true;
        }
    }

    return false;
}
//return false if email already exists
//return true if email and password are correct
function validateEmailAndPasswordExist(mypassword, myemail) {
	
xhr = new XMLHttpRequest();
var url = "http://A-Ibrahim:8080/signuprest";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json");
xhr.onreadystatechange = function () { 
    if (xhr.readyState == 4 && xhr.status == 200) {
			alert(JSON.stringify(xhr.responseText, null, 2));
    }
}
var data = JSON.stringify({"email":myemail,"password":mypassword});
xhr.send(data);
    return true;
}
