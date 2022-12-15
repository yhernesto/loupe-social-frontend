import ApiService from "@/services/api.services";

export default class SettingsService extends ApiService{
    constructor() {
        super({baseURL: '/auth'});
    }

    async postSelectedImage(formData: FormData, p_email: string){
        return (await this.patch('/upload/'+p_email,formData)).data
    }

    async changeUserLang(newLang: string, p_email: string){
        const dataInJson = {
            "language": newLang
        }
        return (await this.patch('/'+p_email,dataInJson))
    }
}