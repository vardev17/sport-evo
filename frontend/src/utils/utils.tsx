export const oneDayTS = 86400000;
export const oneSecondTS = 1000;
export const oneMinuteTS = 60 * oneSecondTS;
export const oneHourTS = 60 * oneMinuteTS;
export const hoursInDay = 24;
export const hoursInWeek = 7 * hoursInDay;
export const hoursInMonth = 4 * hoursInWeek;

export function getTimeString(dateInput: Date | number) {
    // console.log("getTimeString", date);
    const date = new Date(dateInput);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

export function getDateString(date:Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}-${month}`;
}
export function getDateWithYeadString(date:Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
}
export function getMonthString(date: Date) {
    const month = date.toLocaleString('default', { month: 'long' });
    return month;
}

export function toDayOnly(date: Date){
    const result = new Date(date);
    
    result.setHours(0)
    result.setMinutes(0);
    result.setSeconds(0);
    result.setMilliseconds(0);

    return result;
}
