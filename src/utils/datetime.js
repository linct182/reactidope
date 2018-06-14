export const dateTimeConverter = (dateString, withTime = false) => {

    var wMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    var date = new Date(dateString);
    var day = parseInt(date.getUTCDate(), 10);
    var month = parseInt(date.getUTCMonth(), 10);
    var year = date.getUTCFullYear().toString();

    const formattedDate = `${wMonths[month]} ${day}, ${year} `;
    const formattedDateTime = `${formattedDate}  ${date.getUTCHours()}:${date.getUTCMinutes()}`;

    return  withTime ? formattedDateTime : formattedDate;
}