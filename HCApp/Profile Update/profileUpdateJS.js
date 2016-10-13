var user_id = 2;
getData();

function getData() {
    xhr = new XMLHttpRequest();
    var url = "http://A-Ibrahim:8000/profiledata";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        hideLoader();
        hideserverErr();
        if (xhr.readyState == 4 && xhr.status == 200) {
            var res = JSON.parse(xhr.responseText);
            document.getElementById('fname').value = res[0];
            document.getElementById('lname').value = res[1];
            document.getElementById('gender').value = res[2];
            document.getElementById('city').value = res[3];
            document.getElementById('country').value = res[4];
            document.getElementById('ethn').value = res[5];
            document.getElementById('profession').value = res[6];
            document.getElementById('marital').value = res[7];
            document.getElementById('kidsNo').value = res[8];
            document.getElementById('day').value = res[9];
            document.getElementById('month').value = res[10];
            document.getElementById('year').value = res[11];
        } else {
            document.getElementById("errorloading").style.display = "block";
            document.getElementById("loader").style.display = "none";
            document.getElementById("myDiv").style.display = "none";
        }
    }
    var data = JSON.stringify({
        "user_id": user_id
    });
    xhr.send(data);
}

function formValidation() {
    var fname = document.registration.fname;
    var lname = document.registration.lname;
    var gender = document.registration.gender;
    var ethn = document.registration.ethn;
    var city = document.registration.city;
    var country = document.registration.country;
    var day = document.registration.day;
    var month = document.registration.month;
    var year = document.registration.year;
    var marital = document.registration.marital;
    var kidsNo = document.registration.kidsNo;
    var profession = document.registration.profession;

    if (name_validation(fname, "fnameerrid")) {
        document.getElementById('fnameerrid').textContent = "";
        if (name_validation(lname, "lnameerrid")) {
            document.getElementById('lnameerrid').textContent = "";
            if (name_validation(city, "cityerrid")) {
                document.getElementById('cityerrid').textContent = "";
                if (date_validation(day.value, month.value, year.value)) {
                    document.getElementById('dateerrid').textContent = "";
                    if (kidsNo_validation(kidsNo)) {
                        document.getElementById('kidserrid').textContent = "";
                        if (name_validation(profession, "professionerrid")) {
                            document.getElementById('professionerrid').textContent = "";
                            var res = [fname.value, lname.value, gender.value, city.value, country.value, ethn.value, profession.value, marital.value, kidsNo.value, day.value, month.value, year.value];
                            showLoader();
                            sendData(res);
                        }
                    }
                }
            }
        }
    }
    return false;
}

function name_validation(name, errid) {
    var err = "";
    if (!(/^[A-Za-z]+$/.test(name.value))) {
        err = "Enter a valid name";
    }
    if (err && name.value.length > 0) {
        document.getElementById(errid).textContent = err;
        name.focus();
        return false;
    }
    return true;
}

function kidsNo_validation(kidsNo) {
    var err = "";
    if (kidsNo.value < 0) {
        err = "Enter a valid no.";
    }
    if (err) {
        document.getElementById('kidserrid').textContent = err;
        kidsNo.focus();
        return false;
    }
    return true;
}

function date_validation(day, month, year) {
    var err = "";
    var currentTime = new Date();
    var nowday = currentTime.getDate()
    var nowyear = currentTime.getFullYear()
    var nowmonth = currentTime.getMonth() + 1;
    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;
    if ((year == "0") && (month == "0") && (day == "0")) return true;
    if ((year == "0") || (month == "0") || (day == "0") || (year > nowyear) || (year == nowyear && month > nowmonth) || (year == nowyear && month == nowmonth && day > nowday) || (day > monthLength[month - 1])) {
        err = "Enter a valid date";
    }
    if (err) {
        document.getElementById('dateerrid').textContent = err;
        return false;
    }
    return true;
}

function sendData(params) {
    //send data to web service
    xhr = new XMLHttpRequest();
    var url = "http://A-Ibrahim:8080/profileupdate";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            hideLoader();
            hideserverErr();
            alert("Done");
            window.location.replace('profileUpdateHTML.html');
        } else {
            serverErr();
        }
    }
    var data = JSON.stringify({
        "user_id": user_id,
        "first_name": params[0],
        "last_name": params[1],
        "gender": params[2],
        "city": params[3],
        "country": params[4],
        "ethnicity": params[5],
        "profession": params[6],
        "marital_status": params[7],
        "kids_number": params[8],
        "birth_day": params[9],
        "birth_month": params[10],
        "birth_year": params[11]
    });
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