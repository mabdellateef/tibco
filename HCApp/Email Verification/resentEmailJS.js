function formValidation() {
    var email = document.registration.email;
    if (email_validation(email)) {
        showLoader();
        validateEmailExist(email.value);
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
        email.focus();
        return false;
    }
    return true;
}

function validateEmailForm(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
//return true if email exists
//return false if email doesn't exist
function validateEmailExist(email) {
    xhr = new XMLHttpRequest();
    var url = "http://A-Ibrahim:8080/resendemailverification";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var rrr = xhr.responseText;
            hideLoader();
			hideserverErr();
            if (rrr == "false") {
                document.getElementById('emailerrid').textContent = "Email is already verified or not found";
                email.focus();
            } else if (rrr == "true") {
                document.getElementById("sucessloading").style.display = "block";
                document.getElementById("loader").style.display = "none";
                document.getElementById("myDiv").style.display = "none";
            }
			else {
				serverErr();
			}
        }
		else{
			serverErr();
		}
    }
    var data = JSON.stringify({
        "email": email
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

function serverErr(){
	hideLoader();
	document.getElementById('servererrid').textContent = "Oooops! An unexpected error has occurred. try again!";
}

function hideserverErr(){
	document.getElementById('servererrid').textContent = "";
}