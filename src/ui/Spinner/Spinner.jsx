import React from 'react';
import spinner from './spinner.gif';
import c from './Spinner.module.css'

export default function Spinner(){
    return(
        <div className={c.blackout} >
            <img src={spinner} alt='loading' className={c.spinner}/>
        </div>
    )
}