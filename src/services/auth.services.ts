import ApiService from './api.services'
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode} from 'http-status-codes';
import { ILoginForm, IResLogin, IResProfile } from './interfaces/IAuth'

export default class AuthService extends ApiService{

	constructor(){
		super({baseURL: '/auth'})
	}

	/**
	 * Login the user and store the access token to TokenService. 
	 * 
	 * @param p_payload ILoginForm
	 * @returns 
	 */
	async doLogin(p_payload: ILoginForm): Promise<IResLogin | null>{

		const m_data: ILoginForm = p_payload;

		const rs = await this.post('/login', m_data)

		if (rs.status == StatusCodes.CREATED)
			return (rs).data;
		else
			return null;
	}

	async getProfile(): Promise<IResProfile>{
		return (await this.get('/profile')).data
	}

}