import React from 'react'
import c from './Filter.module.css'

export function Filter({ value, handler }) {
    const inputRef = React.useRef()
    return <div className={c.wrapper}>
        <input
            ref={inputRef}
            onChange={() => handler(inputRef.current.value)}
            value={value}
            className={c.input}
            type="text"
            placeholder="Filter" />
    </div>
}