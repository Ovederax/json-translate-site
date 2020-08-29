import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './toggle-btn.css'

interface Props {
    className?: string
    onToggle: (toggle: boolean) => void
    toggle?: boolean
    isDisable?: boolean
}

export const ToggleButton: React.FC<Props> = (props) => {
    const [toggle, setToggle] = useState(props.toggle)

    useEffect(() => {
        setToggle(props.toggle);
    }, [props.toggle])

    const onClick = useCallback(() => {
        if(props.isDisable && toggle) {
            return
        }
        props.onToggle(!toggle)
        setToggle(!toggle)
    }, [props, toggle])

    const classes = useMemo(() => {
        const _classes = []
        if(props.className !== undefined) {
            _classes.push(props.className)
        }
        if(toggle) {
            _classes.push('toggled');
        }
        if(props.isDisable) {
            _classes.push('disable')
        }
        return _classes
    }, [props.className, props.isDisable, toggle])

    return <button onClick={onClick} className={classes.join(' ')}>
        {props.children}
    </button>
}
