
import { reactive } from "vue";
import AuthService from '@/services/auth.services';
import { IResLogin, ILoginForm } from '@/services/interfaces/IAuth'
import tokenService from '@/services/storageServices/token.services'
import ApiService from "@/services/api.services";

import {IProfile} from "@/models/user/IUser"
import i18n from "@/plugins/i18n/i18n";

export default class User {
	m_name: string | null = null;
	m_password: string | null = null;
	// m_accessToken: string | null = null;

	m_profile: IProfile | null = null;

	// Services
	m_apiService = new AuthService();

	constructor(){
		// this.m_accessToken = tokenService.getToken()
	}

	/********************
	 * Getters / Setters
	 ********************/

	get name(): string | null{
		return this.m_name;
	}
	set name(p_value: string | null){
		this.m_name = p_value;
	}

	get password(): string | null{
		return this.m_password;
	}
	set password(p_value: string | null){
		this.m_password = p_value;
	}

	public getAccessToken(): string | null{
		return tokenService.getToken();
	}

	get profile(): IProfile | null {
		return this.m_profile;
	}
	set profile(p_value: IProfile | null){
		this.m_profile = p_value;
	}

	getIsAuthenticated(): boolean{
		return tokenService.getToken() != null && tokenService.getToken() !== "";
	}

	/**********
	 * Methods
	 **********/
	async doLogin(p_loginForm: ILoginForm): Promise<boolean> {
		const rsLogin: IResLogin | null = await this.m_apiService.doLogin({
			email: p_loginForm.email,
			password: p_loginForm.password,
		})
		if (rsLogin !== null){
			this.m_password = null;
			tokenService.saveToken(rsLogin.access_token)
            // this.m_tokenService.saveRefreshToken(rsLogin.access_token)
			this.m_apiService.setHeader()
            // ApiService.setHeader(rsLogin.access_token)
			
			await this.getProfile();
			return true
		}
	
		return false
	}

	/**
     * Refresh the access token.
    **/
	/*
	refreshToken: async function() {
        const refreshToken = TokenService.getRefreshToken()

        const requestData = {
            method: 'post',
            url: "/o/token/",
            data: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            },
            auth: {
                username: process.env.VUE_APP_CLIENT_ID,
                password: process.env.VUE_APP_CLIENT_SECRET
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)

            TokenService.saveToken(response.data.access_token)
            TokenService.saveRefreshToken(response.data.refresh_token)
            // Update the header in ApiService
            ApiService.setHeader()

            return response.data.access_token
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }

    },
	*/

    /**
     * Logout the current user by removing the token from storage. 
     * 
     * Will also remove `Authorization Bearer <token>` header from future requests.
    **/
	async logout(): Promise<void> {
        // Remove the token and remove Authorization header from Api Service as well 
        tokenService.removeToken()
        // this.m_tokenService.removeRefreshToken()
        // ApiService.removeHeader()
        
        // NOTE: Again, we'll cover the 401 Interceptor a bit later. 
        // ApiService.unmount401Interceptor()
    }

	async getProfile(): Promise<void>{
		this.m_profile = await this.m_apiService.getProfile()
		//NOTE: change local idiom when getting profile
		i18n.global.locale.value = this.m_profile.language
	}
	
}