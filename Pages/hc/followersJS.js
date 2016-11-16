var user_id = 2;
getData();

function getData() {
    xhr = new XMLHttpRequest();
    xhr.open("POST", url_followers_get, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        hideLoader();
        hideserverErr();
        if (xhr.readyState == 4 && xhr.status == 200) {
            //select re.user_id ,users.email from re inner join users on re.memeber_id=? AND re.user_id = users.user_id AND status = 1;
            var res = JSON.parse(xhr.responseText);
            if (res.length > 0) {
                for (i = 0; i < res.length; i++) {
                    var button = document.createElement("input");
                    button.type = "button";
                    button.value = "Remove " + res[i].email;
                    button.onclick = (function(opt) {
                        return function() {
                            showLoader();
                            removeUser(opt);
                        };
                    })(res[i].user_id);
                    document.getElementById('myDiv').appendChild(button);
                }
            }

        } else {
            document.getElementById("errorloading").style.display = "block";
            document.getElementById("loader").style.display = "none";
            document.getElementById("myDiv").style.display = "none";
        }
    }
    var data = "member_id=" + user_id;
    xhr.send(data);
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
            window.location.replace('followersHTML.html');
        } else {
            document.getElementById("errorloading").style.display = "block";
            document.getElementById("loader").style.display = "none";
            document.getElementById("myDiv").style.display = "none";
        }
    }
    var data = "user_id=" + member_id + "&member_id=" + user_id;
    xhr.send(data);
}

function showLoader() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("myDiv").style.display = "none";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("errorloading").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}

function serverErr() {
    hideLoader();
    document.getElementById('servererrid').textContent = "Oooops! An unexpected error has occurred. try again!";
}

function hideserverErr() {
    document.getElementById('servererrid').textContent = "";
}