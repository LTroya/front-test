export const formatDate = (date) => new Date(date.split('-'));

export const holidaysToArray = (data) => {
    const holidays = [];

    Object.keys(data).map(holiday => {
        data[holiday].forEach(h => holidays.push(h));
    });

    return holidays;
}
