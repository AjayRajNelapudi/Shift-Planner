

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
    var currentShiftIndex = (parseInt(weeksCount) + shiftOrder.indexOf(currentShift)) % 3;
    var shift = shiftOrder[currentShiftIndex] + " Shift";

    var day = "Week Day";
    if (end.getDay() == weeklyOffDay) {
        shift = "Next: " + shift;
        day = "Weekly Off Day";
    }

    return {"shift": shift, "day": day};
}

function renderOnScreen(shiftObject) {
    // alert(shiftObject.shift + "\n" + shiftObject.day);
    alert = document.createElement("div");
    alert.setAttribute("class", "alert alert-success text-center");

    shiftContent = document.createTextNode(shiftObject.shift);
    shiftDayContent = document.createTextNode(shiftObject.day);
    br = document.createElement("br");

    alert.appendChild(shiftContent);
    alert.appendChild(br);
    alert.appendChild(shiftDayContent);

    document.body.appendChild(alert);
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

    renderOnScreen(shiftObject);
}