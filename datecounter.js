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
    var shift = shiftOrder[shiftIndex];

    var day = "week day";
    if (end.getDay() == weeklyOffDay) {
        day = "weekly off";
    }

    return {"shift": shift, "day": day};
}

//var shift = getShift(3, 'C', ['B', 'A', 'C'], "05/18/2019");
//console.log(shift);