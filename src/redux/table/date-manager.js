export function parseDate(string) {
    return new Date(Date.parse(string));
}

export function resetDateTime(date) {
    date.setHours(4);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

export function addDaysToDate(date, days) {
    return new Date(date.setDate(date.getDate() + days));
}

export function formatDateToString(date) {
    date = parseDate(date);
    let curr_date = date.getDate();
    let curr_month = date.getMonth() + 1;
    let curr_year = date.getFullYear();
    return curr_date + "." + curr_month + "." + curr_year;
}
