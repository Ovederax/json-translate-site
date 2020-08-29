import React, {useCallback} from 'react';
import {SupportedLanguages} from '../intl/translate';

interface Props {
    loadTranslate: (lang: SupportedLanguages) => void
}
export const Header: React.FC<Props> = (props) => {
    const loadTr = useCallback((event: React.MouseEvent, lang: SupportedLanguages) => {
        event.preventDefault();
        props.loadTranslate(lang)
    }, [props])
    return <div className={'header'}>
        <div className={'lang_tab'}>
            <a href="/" onClick={(e)=>loadTr(e, 'en')}>en</a>
            <a href="/" onClick={(e)=>loadTr(e, 'ru')}>ru</a>
        </div>
        <div>
            <a href="https://github.com/Ovederax/json-translate-site">to repository</a>
        </div>
    </div>
}
