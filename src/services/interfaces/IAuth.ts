export interface ILoginForm {
	email: string;
	password: string;
}

export interface IResLogin {
	access_token: string;
}

/**
 * Profile Interfaces
 */
export interface IResProfile {
	_id: string;
	email: string;
	user_name: string;
	first_name: string;
	last_name: string;
	language: string;
    country: string;
	password: string;
	photo_url: string | null;
	__v: number;
	client: {
		sub_hashtags: Array<any>;	// TODO: any??
		active: boolean;
		_id: string;
		name: string;
		sector: string;
		description: string;
		ig_likesToBeInfluencer: number;
		ig_official_profile: string;
		ig_official_hashtag: string;
		ig_official_id: number;
		createdAt: string;	//Date, created date in UTC
		updatedAt: string;	//Date, created date in UTC
		photo_url: string //enterprise image
	}
}
