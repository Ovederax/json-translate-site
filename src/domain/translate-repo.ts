import basic, {AxiosRequestConfig} from 'axios';

const TIMEOUT = 100000

const httpClient = basic.create({
    timeout: TIMEOUT,
    timeoutErrorMessage: 'Request timeout, please try again later',
})

const url = 'https://script.google.com/macros/s/AKfycbyqQy1QZK3zafaETAegLUDx1KbCgcQuphyu-UAQUI2uDyeqQKWI/exec'

export const getTranslate = async (request: TransitedRequest) => {
    try {
        const config: AxiosRequestConfig = {
            withCredentials: false,
            headers: {
                "Content-Type": 'text/plain'
            }
        }
        const result = await httpClient.post<TransitedResponse>(url, request, config)
        return result.data
    } catch (e) {
        alert(`Error: ${e}`)
        console.error(e)
    }
}

interface TransitedRequest {
    fromLang: string,
    toLang: string[],

    data: object // example { 'keyOne': 'text', 'keyTwo': ['keyIn': 'text']}
}
interface TransitedResponse {
    translates: TransitedItem[]
}
interface TransitedItem {
    lang: string,
    data: object
}
