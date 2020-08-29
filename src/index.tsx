import React, {useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import App from './comp/App';
import * as serviceWorker from './serviceWorker';
import {loadIntl, LocaleMessages, SupportedLanguages} from './intl/translate';
import { IntlProvider as ReactIntlProvider } from 'react-intl'

const IntlProvider: React.FC = () => {
    const [lang, setLang] = useState('en' as SupportedLanguages)
    const [messages, setMessages] = useState(undefined as LocaleMessages | undefined)

    const loadTranslate = useCallback(async () => {
        const messages = await loadIntl(lang)
        setLang(lang)
        setMessages(messages)
    }, [lang, setMessages, setLang])

    useEffect(() => {
        const ignore = loadTranslate();
    }, [setMessages, loadTranslate])

    const setNewTranslate = (lang: SupportedLanguages) => {
        setLang(lang)
    }

    const intlProviderClasses = ['ghost']
    if(messages) {
        intlProviderClasses.push('ghost-show')
    }

    return <div className={intlProviderClasses.join(' ')}>
        {
            messages?
                ( <ReactIntlProvider messages={messages} locale={lang}>
                        <App loadTranslate={setNewTranslate}/>
                    </ReactIntlProvider>
                ) : ''
        }
    </div>


}

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
