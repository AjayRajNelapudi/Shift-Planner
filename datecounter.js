

function countDays(begin, end) {
    var beginDate = new Date(begin);
    var endDate = new Date(end);
    var difference = Math.abs(beginDate.getTime() - endDate.getTime());
    var days = Math.ceil(difference / (1000 * 3600 * 25));

    return days;
}

function getDayValue(day) {
    var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    day = day.toLowerCase();
    var dayValue = days.indexOf(day);
    if (dayValue < 0 || dayValue > 7) {
        throw new Error("'day' does not belong to " + days.join(", "));
    }

    return dayValue;
}