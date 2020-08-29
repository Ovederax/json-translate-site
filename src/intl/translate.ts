import englishTranslate from './en.json'
import {useIntl} from 'react-intl';
export type LocaleMessages = typeof englishTranslate

export type SupportedLanguages = 'en' | 'ru'

export const loadIntl = async (lang: SupportedLanguages): Promise<LocaleMessages> => {
    switch (lang) {
        case 'en':
            return import('./en.json');
        case 'ru':
            return import('./ru.json');
        default:
            return import('./en.json');
    }
}

export const useTranslate = () => {
    const intl = useIntl()
    return (id: string) => {
        return intl.formatMessage({ id: id })
    }
}
