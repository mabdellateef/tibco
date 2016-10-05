window.onload = getData;

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
            if (choose_validation(gender, "gendererrid")) {
                document.getElementById('gendererrid').textContent = "";
                if (choose_validation(ethn, "ethnerrid")) {
                    document.getElementById('ethnerrid').textContent = "";
                    if (name_validation(city, "cityerrid")) {
                        document.getElementById('cityerrid').textContent = "";
                        if (choose_validation(country, "countryerrid")) {
                            document.getElementById('countryerrid').textContent = "";
                            if (date_validation(day.value, month.value, year.value)) {
                                document.getElementById('dateerrid').textContent = "";
                                if (choose_validation(marital, "maritalerrid")) {
                                    document.getElementById('maritalerrid').textContent = "";
                                    if (kidsNo_validation(kidsNo)) {
                                        document.getElementById('kidserrid').textContent = "";
                                        if (name_validation(profession, "professionerrid")) {
                                            document.getElementById('professionerrid').textContent = "";
                                            var res = [fname.value, lname.value, gender.value, ethn.value, city.value, country.value, day.value, month.value, year.value, marital.value, kidsNo.value, profession.value];
                                            if (sendData(res)) {
                                                return true;
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

function name_validation(name, errid) {
    var err = "";
    if (!(/^[A-Za-z]+$/.test(name.value))) {
        err = "Enter a valid name";
    }
    if (err) {
        document.getElementById(errid).textContent = err;
        name.focus();
        return false;
    }
    return true;
}

function kidsNo_validation(kidsNo) {
    var err = "";
    if (kidsNo.value < 0 || kidsNo.value.length == 0) {
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

    if ((year == "Default") || (month == "Default") || (day == "Default") || (year > nowyear) || (year == nowyear && month > nowmonth) || (year == nowyear && month == nowmonth && day > nowday) || (day > monthLength[month - 1])) {
        err = "Enter a valid date";
    }

    if (err) {
        document.getElementById('dateerrid').textContent = err;
        return false;
    }
    return true;
}

function choose_validation(name, errid) {
    var err = "";
    if (name.value == "Default") {
        err = "Enter a valid value";
    }
    if (err) {
        document.getElementById(errid).textContent = err;
        name.focus();
        return false;
    }
    return true;
}

function sendData(params) {
    //send data to web service
    /*for (i=0; i<params.length; i++) {
                     
            }*/
    return true;
}

function getData() {
    //get data from web service and set the field
    /*document.getElementById('fname').value = ;
	document.getElementById('lname').value = ;
	document.getElementById('gender').value = ;
	document.getElementById('ethn').value = ;
	document.getElementById('city').value = ;
	document.getElementById('country').value = ;
	document.getElementById('day').value = ;
	document.getElementById('month').value = ;
	document.getElementById('year').value = ;
	document.getElementById('marital').value = ;
	document.getElementById('kidsNo').value = ;
	document.getElementById('profession').value = ;
	*/
    return true;
}