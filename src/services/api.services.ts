import { Notify } from 'quasar';
import axios from 'axios'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import tokenService from '@/services/storageServices/token.services'
import { StatusCodes } from 'http-status-codes';
import router from "@/plugins/router/router";
import i18n from "@/plugins/i18n/i18n";
import {API_PREFIX_BASE, API_SOCIAL_BASE} from '@/constants';


// https://medium.com/@zitko/structuring-a-vue-project-authentication-87032e5bfe16
abstract class ApiService {
    _baseUrl: string = '';
	_socialApiBase: string = ''; // services like auth or webFeeds not depend on an specific social media
    _fullApiBase: string = API_PREFIX_BASE
	// m_tokenService = new TokenService()

    constructor(config: {baseURL: string, socialApiBase?: string}) {
		this._baseUrl = config.baseURL;
		this._socialApiBase = config.socialApiBase || '';
        this._fullApiBase = API_PREFIX_BASE + this._socialApiBase + this._baseUrl;
        this.setHeader()
    }
    
	public get socialApiBase(): string{
		return this._socialApiBase;
	}
	public set socialApiBase(p_value: string){
		this._socialApiBase = p_value;
		this._fullApiBase = API_PREFIX_BASE + this._socialApiBase + this._baseUrl;
	}

	/****************
	 * Methods
	 ****************/
    setHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${tokenService.getToken()}`
    }

    removeHeader() {
        axios.defaults.headers.common = {}
    }

    async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        return axios.get(this._fullApiBase + url, config)
                    .then((response: AxiosResponse) => {
                        return response
                    })
                    .catch((error: AxiosError) => {
                        if (error.response?.status == StatusCodes.UNAUTHORIZED){
                            tokenService.removeToken();
                            router.push("/login")
                        }
                        return Promise.reject(error.response)
                        // return error.response
                    })
    }

    async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        return axios.post(this._fullApiBase + url, data, config)
                    .then((response: AxiosResponse) => {
                        return response
                    })
                    .catch((error: AxiosError) => {
                        if (error.response?.status == StatusCodes.UNAUTHORIZED){
                            tokenService.removeToken();
                            Notify.create({
                                message: i18n.global.t('global-bad-credentials'),
                                color: 'red'
                            })
                            router.push("/login")
                        }
                        return Promise.reject(error.response)
                        // return error.response
                    })
    }

    async patch(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>{
        return axios.patch(this._fullApiBase + url,data,config)
            .then((response: AxiosResponse) => {
                return response
            })
            .catch((error: AxiosError) => {
                if (error.response?.status == StatusCodes.UNAUTHORIZED){
                    tokenService.removeToken();
                    router.push("/login")
                }
                return Promise.reject(error.response)
            })
    }


    async head(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {

        return axios.head(this._fullApiBase + url, config)
                    .then((response: AxiosResponse) => {
                        return response
                    })
                    .catch((error: AxiosError) => {
                        if (error.response?.status == StatusCodes.UNAUTHORIZED){
                            tokenService.removeToken();
                            router.push("/login")
                        }
                        return Promise.reject(error.response)
                        // return error
                    })
    }

    // put(resource, data) {
    //     return axios.put(resource, data)
    // }

    // delete(resource) {
    //     return axios.delete(resource)
    // }

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
    **/
    // customRequest(data) {
    //     return axios(data)
    // }
}

export default ApiService