export interface IAlertsRow {
	name: string;
	brand: string;
	containing: Array<string>;
	language: string;

}

export interface ICardAlerts{
	rows: Array<IAlertsRow>
}