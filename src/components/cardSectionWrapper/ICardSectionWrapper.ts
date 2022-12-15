
export interface IButtonToggle {
	label: string;
	value: string;
	selected: boolean
}

export interface ICardSectionWrapper {
    title?: string;
    loading?: boolean;
    toggles?: Array<IButtonToggle>;
}