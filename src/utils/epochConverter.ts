import {isDate} from "@/utils/offsetDate";

export function convertDateToEpoch(date: any) {
    const dateConverted = new Date(date);
    if (!isDate(dateConverted)){
        return null;
    }
    return (dateConverted.getTime()*0.001);
}

