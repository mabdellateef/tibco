var t = window.location.search;
var user_id = t.split("?", 2)[1];
if (!user_id) user_id = 1; // from session
getData();

function getData() {
    xhr = new XMLHttpRequest();
    xhr.open("POST", url_dailyCheck_get, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        hideLoader();
        hideserverErr();
        if (xhr.readyState == 4 && xhr.status == 200) {
            var res = JSON.parse(xhr.responseText);
            document.getElementById('heartRateid').value = res[0].heart_rate;
            var bloodPre = res[0].blood_pressure.split("/");
            document.getElementById('bloodPreXid').value = bloodPre[0];
            document.getElementById('bloodPreYid').value = bloodPre[1];
            document.getElementById('tempid').value = res[0].temperature;
            document.getElementById('glucoseid').value = res[0].glucose;
            document.getElementById('spo2id').value = res[0].oxygen;
            document.getElementById('inrid').value = res[0].INR;
            document.getElementById('weightid').value = res[0].weight;
            document.getElementById('heightid').value = res[0].height;
            document.getElementById('bmiid').textContent = res[0].BMI;
            if (res[0].gender == "female") {
                var preStart = res[0].period_start;
                var preEnd = res[0].period_end;
                if (preStart == "1111-11-11") preStart = "";
                if (preEnd == "1111-11-11") preEnd = "";
                document.getElementById("periodDivid").style.display = "inline";
                document.getElementById('periodStartid').value = preStart;
                document.getElementById('periodEndid').value = preEnd;
            }
            var today = new Date();
            var birthDate = res[0].birthday;
            var age = 0;
            if (birthDate != "1111-11-11") {
                age = today.getFullYear() - (new Date(birthDate)).getFullYear();
            }
            if (age <= 2) {
                document.getElementById('childDivid').style.display = "inline";
                document.getElementById('feedingid').value = res[0].feeding_type;
                var res14 = new Date(res[0].last_fed);
                if (res14.getFullYear() != "1111") {
                    var fedDate = res14;
                    var days = today.getDate() - fedDate.getDate();
                    var min = "";
                    var hr = "";
                    if (fedDate.getHours() < 10) hr = "0";
                    if (fedDate.getMinutes() < 10) min = "0";
                    hr += fedDate.getHours();
                    min += fedDate.getMinutes();
                    document.getElementById('last_fedid').value = hr + ":" + min;
                    if (fedDate.getFullYear() == today.getFullYear() && fedDate.getMonth() == today.getMonth() && days <= 1) {
                        if (days == 1) document.getElementById('last_fed_dayid').value = "yesterday";
                        else document.getElementById('last_fed_dayid').value = "today";
                    } else {
                        document.getElementById('last_federrid').textContent = "More than one day!";
                    }
                }
                document.getElementById('gestationid').value = res[0].gestation_period;
                document.getElementById('birth_orderid').value = res[0].birth_order;
            }

        } else {
            document.getElementById("errorloading").style.display = "block";
            document.getElementById("loader").style.display = "none";
            document.getElementById("myDiv").style.display = "none";
        }
    }
    var data = "user_id=" + user_id;
    xhr.send(data);
}

function formValidation() {
    var heartRate = document.registration.heartRate;
    var temp = document.registration.temp;
    var bloodPreX = document.registration.bloodPreX;
    var bloodPreY = document.registration.bloodPreY;
    var glucose = document.registration.glucose;
    var inr = document.registration.inr;
    var weight = document.registration.weight;
    var height = document.registration.height;
    var spo2 = document.registration.spo2;
    var periodStart = document.registration.periodStart;
    var periodEnd = document.registration.periodEnd;
    var feeding = document.registration.feeding;
    var last_fed = document.registration.last_fed;
    var last_fed_day = document.registration.last_fed_day;
    var gestation = document.registration.gestation;
    var birth_order = document.registration.birth_order;
    if (heartRate_validation(heartRate)) {
        document.getElementById('heartRateerrid').textContent = "";
        if (temp_validation(temp)) {
            document.getElementById('temperatureerrid').textContent = "";
            if (bloodPre_validation(bloodPreX, bloodPreY)) {
                document.getElementById('bloodPreerrid').textContent = "";
                if (glucose_validation(glucose)) {
                    document.getElementById('glucoseerrid').textContent = "";
                    if (inr_validation(inr)) {
                        document.getElementById('inrerrid').textContent = "";
                        if (weight_validation(weight)) {
                            document.getElementById('weighterrid').textContent = "";
                            if (height_validation(height)) {
                                document.getElementById('heighterrid').textContent = "";
                                if (spo2_validation(spo2)) {
                                    document.getElementById('spo2errid').textContent = "";
                                    if (period_date_validation(periodStart, periodEnd)) {
                                        document.getElementById('perioderrid').textContent = "";
                                        if (feeding_validation(feeding)) {
                                            document.getElementById('feedingerrid').textContent = "";
                                            if (feedingTime_validation(last_fed, last_fed_day)) {
                                                document.getElementById('feedingerrid').textContent = "";
                                                if (gestation_validation(gestation)) {
                                                    document.getElementById('gestationerrid').textContent = "";
                                                    if (birth_order_validation(birth_order)) {
                                                        document.getElementById('birth_ordererrid').textContent = "";
                                                        var bmi;
                                                        if (weight.value && height.value && height.value > 0) {
                                                            bmi = (weight.value * 0.45) / ((height.value * 0.025) * (height.value * 0.025));
                                                        } else bmi = "";
                                                        var preStart = periodStart.value;
                                                        var preEnd = periodEnd.value;
                                                        if (preStart == "") preStart = "1111-11-11";
                                                        if (preEnd == "") preEnd = "1111-11-11";
                                                        var fedFinalTime = "11:11:11";
                                                        var fedFinalDate = "1111-11-11";
                                                        if (last_fed.value) fedFinalTime = last_fed.value;
                                                        if (last_fed_day.value != "Default") {
                                                            var date = new Date();
                                                            if (last_fed_day.value == "yesterday")
                                                                date.setDate(date.getDate() - 1);
                                                            fedFinalDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                                                        }
                                                        var fedFinal = fedFinalDate + " " + fedFinalTime;
                                                        var res = [heartRate.value, bloodPreX.value + "/" + bloodPreY.value, temp.value, glucose.value, spo2.value, inr.value, weight.value, height.value, bmi.toPrecision(5), preStart, preEnd, feeding.value, fedFinal, gestation.value, birth_order.value];
                                                        showLoader();
                                                        sendData(res);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

function getTimeNow() {
    var d = new Date();
    var min = "";
    var hr = "";
    var tempHr = d.getHours();
    var tempMin = d.getMinutes();
    if (tempHr < 10) hr = "0";
    if (tempMin < 10) min = "0";
    hr += tempHr;
    min += tempMin;
    document.getElementById('last_fedid').value = hr + ":" + min;
    document.getElementById('last_fed_dayid').value = "today";
}

function heartRate_validation(heartRate) {
    return true;
}

function temp_validation(temp) {
    return true;
}

function glucose_validation(glucose) {
    return true;
}

function inr_validation(inr) {
    return true;
}

function weight_validation(weight) {
    return true;
}

function height_validation(height) {
    return true;
}

function spo2_validation(spo2) {
    return true;
}

function feeding_validation(feeding) {
    return true;
}

function feedingTime_validation(last_fed, last_fed_day) {
    var err = "";

    if (((last_fed.value && last_fed_day.value == "Default") ||
            (last_fed_day.value != "Default" && last_fed.value == "")) &&
        !(last_fed.value == "" && last_fed_day.value == "Default")) {
        err = "Enter Valid value";
    }
    if (err) {
        document.getElementById('last_federrid').textContent = err;
        return false;
    }
    return true;
}

function gestation_validation(gestation) {
    return true;
}

function birth_order_validation(birth_order) {
    return true;
}

function bloodPre_validation(bloodPreX, bloodPreY) {
    if ((bloodPreX.value.length > 0 && bloodPreY.value.length == 0) ||
        (bloodPreY.value.length > 0 && bloodPreX.value.length == 0)) {
        document.getElementById("bloodPreerrid").textContent = "Enter a valid value";
        return false;
    }
    return true;
}

function period_date_validation(periodStart, periodEnd) {

    if (periodStart.value.length == 0 && periodEnd.value.length > 0) {
        document.getElementById('perioderrid').textContent = "Enter start date";
        return false;
    }
    if (periodStart.value >= periodEnd.value && periodStart.value.length > 0 && periodEnd.value.length > 0) {
        document.getElementById('perioderrid').textContent = "End date can't be greater than start date";
        return false;
    }
    return true;
}

function sendData(params) {
    //send data to web service
    xhr = new XMLHttpRequest();
    xhr.open("POST", url_dailyCheck_send, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var rrr = xhr.responseText;
            if (rrr == 1) {
                hideLoader();
                hideserverErr();
                alert("Done");
                window.location.replace('dailyCheckHTML.html');
            } else {
                serverErr();
            }
        } else {
            serverErr();
        }
    }
    var data = "user_id=" + user_id + "&heart_rate=" + params[0] + "&blood_pressure=" + params[1] + "&temperature=" + params[2] + "&glucose=" + params[3] + "&oxygen=" + params[4] + "&INR=" + params[5] + "&weight=" + params[6] + "&height=" + params[7] + "&BMI=" + params[8] + "&period_start=" + params[9] + "&period_end=" + params[10] + "&feeding_type=" + params[11] + "&last_fed=" + params[12] + "&gestation_period=" + params[13] + "&birth_order=" + params[14];
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