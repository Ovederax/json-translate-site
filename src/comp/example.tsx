import React from 'react';
import './example.css'
import {useTranslate} from '../intl/translate';
import {FormattedMessage} from 'react-intl';

const exampleCodeFrom = `{
    "Translate your JSON": "Translate your JSON",
    "Chose language from": "Chose language from",
    "homePage": {
        "Chose language to": "Chose language to",
        "Send": "Send",
        "Download": "Download",
        "Chose & Send": "Chose & Send"
    }
}`
const exampleCodeTo = `{
    "Translate your JSON": "Переведите ваш JSON",
    "Chose language from": "Выберите язык из",
    "homePage": {
        "Chose language to": "Выберите язык для",
        "Send": "Послать",
        "Download": "Скачать",
        "Chose & Send": "Выбрать и отправить"
    }
}`
export const Example: React.FC = () => {
    return (
        <div className={'example'}>
            <div className={'example__left'}>
                <h2>
                    <FormattedMessage id="Example in Json file:" />
                </h2>
                <pre>
                    {exampleCodeFrom}
                </pre>
            </div>
            <div className={'example__right'}>
                <h2>
                    <FormattedMessage id="Example out Json file:" />
                </h2>
                <pre>
                    {exampleCodeTo}
                </pre>
            </div>
        </div>
    )
}
