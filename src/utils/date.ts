export const EPeriod = {
    TODAY: 1,
    WEEK : 2,
    MONTH : 3,
    MONTH3 : 4,
    MONTH6 : 5,
    YEAR : 6
}

export const PeriodList = [
    {label: "calendar-today", value: EPeriod.TODAY},
    {label: "calendar-week", value: EPeriod.WEEK},
    {label: "calendar-month", value: EPeriod.MONTH},
    {label: "calendar-3months", value: EPeriod.MONTH3},
    {label: "calendar-6months", value: EPeriod.MONTH6},
    {label: "calendar-year", value: EPeriod.YEAR}
  ]


/**
 * By default make the change in-place
 * @param {number} day 
 * @param {number} month 
 * @param {number} year 
 * @param {} config 
 * @returns {Date}
 */
export function getDateOffSet(day: number, month: number, year: number, config?: {date?: Date, inPlace?: boolean, mode?: string}): Date {
	let inPlace: boolean = true;
	let date: Date = new Date();

	if (config){
		date = config.date || new Date()
		// TODO: check if this inPlace mode it is necessary or it can remove
		inPlace = config.inPlace === undefined ? true : config.inPlace

		// Start mode it set the hours at the beginning of the day
		if (config.mode === "start")
			date.setHours(0,0,0,0)
		else if (config.mode === "end")
			// End mode it set the minutes at the end of the day
			date.setHours(23,59,59,999)
	}

    const _today: Date = inPlace? date : cloneDate(date);
    const _targetDate: Date = inPlace? date : cloneDate(date);
    if (day != 0)
        _targetDate.setDate(_today.getDate() + day);
    if (month != 0)
        _targetDate.setMonth(_today.getMonth() + month);
    if (year != 0)
        _targetDate.setFullYear(_today.getFullYear() + year);
	return _targetDate;
}


// Mask returned "YYYY-MM-DD"
export function getDateFormatted(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

// Mask returned "YYYY-MM-DD HH:mm:ss"
export function getDateTimeFormatted(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

const weekdaysLabel: string[] = ["calendar-sunday", "calendar-monday", "calendar-tuesday", "calendar-wednesday", "calendar-thursday", "calendar-friday", "calendar-saturday"];
const monthsLabel: string[] = ["calendar-january", "calendar-february", "calendar-march", "calendar-april", "calendar-may",
                    "calendar-june", "calendar-july", "calendar-august", "calendar-september",
                    "calendar-october", "calendar-november", "calendar-december"];

const weekdaysAbbrLabel: string[] = ["calendar-abbr-sunday", "calendar-abbr-monday", "calendar-abbr-tuesday", "calendar-abbr-wednesday", "calendar-abbr-thursday", "calendar-abbr-friday", "calendar-abbr-saturday"];
const monthsAbbrLabel: string[] = ["calendar-abbr-january", "calendar-abbr-february", "calendar-abbr-march", "calendar-abbr-april", "calendar-abbr-may",
                    "calendar-abbr-june", "calendar-abbr-july", "calendar-abbr-august", "calendar-abbr-september",
                    "calendar-abbr-october", "calendar-abbr-november", "calendar-abbr-december"];

export function getWeekday(date: Date | number, fullLabel: boolean = false): string {
    if (fullLabel)
        return weekdaysLabel[ typeof date == "number" ? date : new Date(date).getDay()];
    return weekdaysAbbrLabel[ typeof date == "number" ? date : new Date(date).getDay()];
}

export function getMonth(date: Date): string {
    return monthsAbbrLabel[new Date(date).getMonth()];
}

export function cloneDate(p_date: Date): Date {
    // TODO: Try this
    // Date.prototype.clone = function () {
    //     return new Date(this.getTime());
    // }
    const copiedDate = new Date(p_date.getTime());
    return copiedDate
}