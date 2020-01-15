function countDays(beginDate, endDate) {
    var difference = Math.abs(beginDate.getTime() - endDate.getTime());
    var days = Math.ceil(difference / (1000 * 3600 * 24));

    return days;
}

function daysToLastWeeklyOff(weeklyOffDay) {
    var todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    var today = todayDate.getDay();

    var dayCounter = 0;
    while (today != weeklyOffDay) {
        weeklyOffDay = (weeklyOffDay + 1) % 7;
        dayCounter++;
    }

    return dayCounter;
}

function getShift(weeklyOffDay, currentShift, shiftOrder, requiredDate) {
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - daysToLastWeeklyOff(weeklyOffDay));
    var end = new Date(requiredDate);
    end.setHours(0, 0, 0, 0);
    var daysCount = countDays(start, end);
    var weeksCount = daysCount / 7;
    var shiftIndex = (parseInt(weeksCount) + shiftOrder.indexOf(currentShift)) % 3;
    var shift = shiftOrder[shiftIndex] + " Shift";

    var day = "week day";
    if (end.getDay() == weeklyOffDay) {
        shift = "Next is " + shift;
        day = "weekly off day";
    }

    return {"shift": shift, "day": day};
}

function renderOnScreen(shiftObject) {
    // document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">');
    // document.write('<body>');
    // document.write('<div class="jumbotron text - center">');
    // document.write('<h1>' + shiftObject.shift + '</h1>');
    // document.write('<h2>' + shiftObject.day + '</h2>');
    // document.write('</div> </body>');

    // shiftLabel = document.getElementById("shift");
    // var shift = document.createTextNode(shiftObject.shift + " " + shiftObject.day);
    // shiftLabel.appendChild(shift);

    alert(shiftObject.shift + " " + shiftObject.day);
}

function readAndFind() {
    var weeklyOffDay = parseInt(document.getElementById("off-day-select").value);
    var currentShift = document.getElementById("current-shift-select").value;
    var shiftOrder;
    var shiftOrderSelect = document.getElementById("shift-order-select").value;
    if (shiftOrderSelect == 0) {
        shiftOrder = ['A', 'B', 'C'];
    } else {
        shiftOrder = ['A', 'C', 'B'];
    }
    var requiredDate = document.getElementById("requiredDate").value;
    var dateParts = requiredDate.split("-");
    requiredDate = dateParts[1] + "/" + dateParts[2] + "/" + dateParts[0];

    var shiftObject = getShift(weeklyOffDay, currentShift, shiftOrder, requiredDate);
    //document.write(shift.shift, " ", shift.day);

    renderOnScreen(shiftObject);
}