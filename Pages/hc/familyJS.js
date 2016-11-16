var user_id = 1;
getData();

function getData() {
    xhr = new XMLHttpRequest();
    xhr.open("POST", url_family_get, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        hideLoader();
        hideserverErr();
        if (xhr.readyState == 4 && xhr.status == 200) {
            //select re.member_id ,users_info.f_name from re inner join users_info on re.user_id=1 AND re.member_id = users_info.user_id;
            var res = JSON.parse(xhr.responseText);
            if (res.length > 0) {
                for (i = 0; i < res.length; i++) {
                    var button = document.createElement("input");
                    button.type = "button";
                    button.value = res[i].f_name + "'s daily";
                    button.onclick = (function(opt) {
                        return function() {
                            window.location.replace('dailyCheckHTML.html?' + opt);
                        };
                    })(res[i].member_id);
                    document.getElementById('myDiv').appendChild(button)
                }
                for (i = 0; i < res.length; i++) {
                    var button = document.createElement("input");
                    button.type = "button";
                    button.value = res[i].f_name + "'s profile";
                    button.onclick = (function(opt) {
                        return function() {
                            window.location.replace('profileUpdateHTML.html?' + opt);
                        };
                    })(res[i].member_id);
                    document.getElementById('myDiv2').appendChild(button)
                }
                for (i = 0; i < res.length; i++) {
                    var button = document.createElement("input");
                    button.type = "button";
                    button.value = "remove " + res[i].f_name;
                    button.onclick = (function(opt) {
                        return function() {
                            showLoader();
                            removeUser(opt);
                        };
                    })(res[i].member_id);
                    document.getElementById('myDiv3').appendChild(button);
                }
            }

        } else {

            document.getElementById("errorloading").style.display = "block";
            document.getElementById("loader").style.display = "none";
            document.getElementById("myDiv").style.display = "none";
            document.getElementById("myDiv2").style.display = "none";
            document.getElementById("myDiv3").style.display = "none";
        }
    }
    var data = "user_id=" + user_id;
    xhr.send(data);
}
//webservice return 1 if email not found and the child will added.(Hamo add user to tables) **
//webservice return 0 if email found and the child will added with confirmation from his parent.(hamo send email)**
//webservice return -1 if email found and the user will added with user confirmation.(hamo send email) **
//webservice return -2 already friend. **
//webservice return -3 if it's user email. **
function formValidation() {
    var email = document.registration.email;
    if (email_validation(email)) {
        showLoader();
        xhr = new XMLHttpRequest();
        xhr.open("POST", url_family_add, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var rrr = xhr.responseText;
                if (rrr == "1") {
                    hideLoader();
                    hideserverErr();
                    alert("Your member added succesfully");
                    window.location.replace('familyHTML.html');
                } else if (rrr == "0") {
                    hideLoader();
                    hideserverErr();
                    document.getElementById('servererrid').textContent = "Invitaion sent,Wait for parent acceptance!";
                } else if (rrr == "-1") {
                    hideLoader();
                    hideserverErr();
                    document.getElementById('servererrid').textContent = "Invitaion sent,Wait for user acceptance!";
                } else if (rrr == "-2") {
                    hideLoader();
                    hideserverErr();
                    document.getElementById('servererrid').textContent = "User already a member!";
                } else if (rrr == "-3") {
                    hideLoader();
                    hideserverErr();
                    document.getElementById('servererrid').textContent = "It's your mail!";
                } else {
                    serverErr();
                    addBtn();
                }

            } else {
                serverErr();
                addBtn();
            }
        }
        var data = "email=" + email.value + "&user_id=" + user_id;
        xhr.send(data);
    }
    return false;
}

function removeUser(member_id) {
    xhr = new XMLHttpRequest();
    xhr.open("POST", url_removemember, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        hideLoader();
        hideserverErr();
        if (xhr.readyState == 4 && xhr.status == 200) {
            var rrr = xhr.responseText;
            alert("Done");
            window.location.replace('familyHTML.html');
        } else {
            document.getElementById("errorloading").style.display = "block";
            document.getElementById("loader").style.display = "none";
            document.getElementById("myDiv").style.display = "none";
            document.getElementById("myDiv2").style.display = "none";
            document.getElementById("myDiv3").style.display = "none";
        }
    }
    var data = "user_id=" + user_id + "&member_id=" + member_id;
    xhr.send(data);
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
        hideserverErr();
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

function showLoader() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("myDiv").style.display = "none";
    document.getElementById("myDiv2").style.display = "none";
    document.getElementById("myDiv3").style.display = "none";
    document.getElementById("formDiv").style.display = "none";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("errorloading").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
    document.getElementById("myDiv2").style.display = "block";
    document.getElementById("myDiv3").style.display = "block";
}

function serverErr() {
    hideLoader();
    document.getElementById('servererrid').textContent = "Oooops! An unexpected error has occurred. try again!";
}

function addBtn() {
    document.getElementById("formDiv").style.display = "block";
}

function hideserverErr() {
    document.getElementById('servererrid').textContent = "";
}