import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import {SupportedLanguages, useTranslate} from '../intl/translate';
import {autoDetect, supportLanguages} from '../domain/support-lang';
import {ToggleButton} from './toggle-btn';
import {getTranslate} from '../domain/translate-repo';
import {Header} from './header';
import {Example} from './example';

function downloadJsonBeautiful(file: File) {
    const element = document.createElement('a');
    const reader = new FileReader()
    reader.onload = () => {
        element.setAttribute('target', '_blank')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reader.result as string));
        element.setAttribute('download', file.name);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    reader.readAsText(file)
}

const selectFile = async () => {
    const input = (document.createElement('input')) as HTMLInputElement
    input.type = 'file'
    const promise = new Promise<File[]>(((resolve, reject) => {
        input.onchange = (event: any) => {
            if(event !== undefined) {
                resolve(event?.target?.files)
            }
            reject()
        }
    }))

    input.click();
    return await promise
}

interface Props {
    loadTranslate: (lang: SupportedLanguages) => void
}

const App: React.FC<Props> = (props) => {
    const [toggledFromCode, setToggledFromCode] = useState('')
    const [toggledToCodes, setToggledToCodes] = useState([] as string[])
    const tr = useTranslate()

    useEffect(() => {
        setToggledFromCode('')
    }, [])

    const onToggleFromLanguage = (toggled: boolean, code: string) => {
        if (toggled) {
            setToggledFromCode(code)
        }
    }

    const onToggleToLanguage = (toggled: boolean, code: string) => {
        if (toggled) {
            toggledToCodes.push(code)
            setToggledToCodes(toggledToCodes.slice())
        } else {
            setToggledToCodes(toggledToCodes.filter(it => it !== code))
        }
    }

    const fromButtons = useMemo(() => {
        const buttons = supportLanguages.map((it) => {
            return <ToggleButton toggle={it.code === toggledFromCode} key={it.code} onToggle={(toggled) => {
                onToggleFromLanguage(toggled, it.code)
            }} className={'big-button'} isDisable={it.code === toggledFromCode}>
                {it.name}
            </ToggleButton>
        })
        buttons.unshift(
            <ToggleButton key={autoDetect.code} onToggle={(toggled) => {
                onToggleFromLanguage(toggled, autoDetect.code)
            }} className={'big-button'} toggle={autoDetect.code === toggledFromCode}
            isDisable={autoDetect.code === toggledFromCode}>
                {autoDetect.name}
            </ToggleButton>
        )
        return buttons
    }, [toggledFromCode])


    const toButtons = supportLanguages.map((it) => {
        return <ToggleButton key={it.code} onToggle={(toggled) => {
            onToggleToLanguage(toggled, it.code)
        }} className={'big-button'}>
            {it.name}
        </ToggleButton>
    })

    const onClickSend = useCallback(async (event: React.MouseEvent) => {
        event.preventDefault()
        if (toggledToCodes.length === 0) {
            return;
        }
        const files = await selectFile()
        if (files === undefined || files.length < 1) {
            return
        }
        const promise = new Promise<File>(((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(files[0]);
            reader.onload = async function () {
                if (typeof reader.result == 'string') {
                    try {
                        const jsonFromLang = JSON.parse(reader.result)
                        const translationResponse = await getTranslate({
                            fromLang: toggledFromCode,
                            toLang: toggledToCodes,
                            data: jsonFromLang
                        })
                        if(translationResponse === undefined) {
                            reject()
                            return;
                        }

                        let translation: undefined | object
                        if(toggledToCodes.length === 1) {
                            translation = translationResponse.translates[0].data
                        } else {
                            translation = translationResponse.translates
                        }

                        const jsonBeautiful = JSON.stringify(translation, null, 4)
                        const file = new File([jsonBeautiful], 'out.json')
                        resolve(file)
                    } catch (e) {
                        reject()
                        console.log(e)
                        alert('Wrong file format')
                    }
                }
            };
            reader.onerror = function () {
                reject(reader.error)
            };
        }))

        promise.then((result: File) => {
            downloadJsonBeautiful(result)
        }).catch((reason => {
            console.log(reason);
        }))
    }, [toggledFromCode, toggledToCodes]);

    const onClickSendClasses = useMemo(() => {
        const classes = ['btn big-button']
        if(toggledToCodes.length === 0) {
            classes.push('disable')
        }
        return classes
    }, [toggledToCodes]);

    return (
        <div className='container'>
            <Header loadTranslate={props.loadTranslate} />
            <div className='intro'>
                <h1>
                    {tr('Translate your JSON')}
                </h1>
            </div>

            <div className="options">
                <div className={'options__item'}>
                    <h2>{tr('Chose language from')}</h2>
                    <div className="toggled_buttons">
                        {fromButtons}
                    </div>
                </div>

                <div className={'options__item'}>
                    <h2>{tr('Chose language to')}</h2>
                    <div className="toggled_buttons">
                        {toButtons}
                    </div>
                </div>
            </div>
            <Example />
            <div className={'submit'}>
                <button className={onClickSendClasses.join(' ')} onClick={onClickSend}>{tr('Chose & Send')}</button>
            </div>
        </div>);
}

export default App;
