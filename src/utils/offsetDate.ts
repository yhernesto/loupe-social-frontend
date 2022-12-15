export async function getOffsetDifferenceInMinutes(date: Date) {
    console.log(" sadasd:  "+date);
    return date.getTimezoneOffset()!;
}

//https://qastack.mx/programming/1197928/how-to-add-30-minutes-to-a-javascript-date-object
export async function getCurrentDate(date: Date, difference: number){
    console.log("sdsd: "+ date);
    return new Date(date.getTime() + difference*60000);
}

//TODO: utilizar DATE_REGEX cuando sea seguro que el back retorne siempre en el mismo formato
//https://medium.com/@LoretoVaquero/validar-fechas-con-javascript-fe1b1c7b6524

export  function getDateCalculatingOffsetDifference(date: Date | string){
    const dateShown = new Date(date);
    if(!isDate(date)){
        return null;
    }
    return dateShown;
}

//https://www.techonthenet.com/js/number_isnan.php
function isDateWellFormatted(date: Date | string): Boolean{
    const dateTransformed = new Date(date);
    const dateParsed = Date.parse(dateTransformed.toDateString());
    return !Number.isNaN(dateParsed);
}

export function isDate(date: Date | string): Boolean {
    if (date == null){
        return false;
    }
    if (!isDateWellFormatted(date)){
        return false;
    }
    return !(typeof date == "string" && date.length === 0);
}