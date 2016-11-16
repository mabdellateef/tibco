    var t = window.location.search;
    var temp = t.split("&", 2);
    var token = temp[1];
    temp = temp[0].split("?", 2);
    var email = temp[1];

    xhr = new XMLHttpRequest();
    xhr.open("POST", url_emailVerfiy, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var rrr = xhr.responseText;
            hideLoader();
            document.getElementById('errid').textContent = "";
            if (rrr == "true") {
                document.getElementById('sucessid').textContent = "Congratulations! you will redirected to login";
                window.setTimeout(function() {
                    window.location.href = "loginHTML.html";
                }, 1000);
            } else if (rrr == "false") {
                var str = "The url is either invalid or you already have activated your account! or Resend it here!";
                var result = str.link("resentEmailHTML.html");
                document.getElementById('errid').innerHTML = result;

            } else {
                document.getElementById('errid').textContent = "Oooops! An unexpected error has occurred. try again!";
            }
        } else {

            hideLoader();
            document.getElementById('errid').textContent = "Oooops! An unexpected error has occurred. try again!";
        }
    }

    var data = "token=" + token + "&email=" + email;
    xhr.send(data);

    function hideLoader() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("myDiv").style.display = "block";
    }