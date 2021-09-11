import React from 'react'
import c from './Filter.module.css'

export function Filter({ value, handler,allStates,selectedState,}) {
    const inputRef = React.useRef()
    const selectRef = React.useRef()
    return <div className={c.wrapper}>
        <input
            ref={inputRef}
            onChange={() => handler(inputRef.current.value, selectRef.current.value)}
            value={value}
            className={c.input}
            type="text"
            placeholder="Filter" />
        <select
            className ={c.select} 
            value={selectedState}
            ref={selectRef}
            onChange={() => handler(inputRef.current.value,selectRef.current.value)}
        >
            <option  value={''}>All states</option>
            {allStates.map(a=><option key={a} value={a}>{a}</option>)}
        </select>
    </div>
}