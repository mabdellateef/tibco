    var t = window.location.search;
    var temp = t.split("&", 3);
    var token = temp[1];
    var member_id = temp[2];
    temp = temp[0].split("?", 2);
    var user_id = temp[1];
    xhr = new XMLHttpRequest();
    xhr.open("POST", url_followVerfiy, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var rrr = xhr.responseText;
            hideLoader();
            document.getElementById('errid').textContent = "";
            if (rrr == "true") {
                document.getElementById('sucessid').textContent = "Congratulations!";
            } else if (rrr == "false") {
                document.getElementById('errid').innerHTML = "The url is either invalid or you already follow him!";

            } else {
                document.getElementById('errid').textContent = "Oooops! An unexpected error has occurred. try again!";
            }
        } else {

            hideLoader();
            document.getElementById('errid').textContent = "Oooops! An unexpected error has occurred. try again!";
        }
    }
    var data = "user_id=" + user_id + "&token=" + token + "&member_id="+member_id;
    xhr.send(data);

    function hideLoader() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("myDiv").style.display = "block";
    }