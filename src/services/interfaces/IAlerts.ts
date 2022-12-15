export interface IAlertForm {
    name: string | null;
	brand: string | null;
	containing: Array<string> | null;
	language: string | null;
	viewThreshold: number;
	sendingType: string | null;
	hour: string | null;
	email: string | null;
}

export interface IAlertDb {
    name: string;
	brand: string;
	containing: Array<string>;
	language: string;
	viewThreshold: number;
	sendingType: string;
	hour: string;
	email: string;
}

export interface IAlertsRow {
	name: string;
	brand: string;
	containing: Array<string>;
	language: string;

}