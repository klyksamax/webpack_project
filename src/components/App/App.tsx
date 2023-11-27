import React, { Component, useState } from 'react'
import {Link, Outlet} from "react-router-dom"
import classes from './App.module.scss'
import About from '@/pages/About/About'
import JPG from '@/assets/PNG.png'
import SVG from '@/assets/SVG.svg'

export const App = () => {
    const [count, setCount] = useState<number>(0)
    const increment = () => setCount(prev => prev + 1)

    // if(__PLATFORM__ === 'desktop'){
    //     return <div>ISDESKTOPPLATFORM</div>
    // }

    // if(__PLATFORM__ === 'mobile'){
    //     return <div>ISMOBIULEPLATFORM</div>
    // }

 return (
    <div>
        <h1>PLATFORM={__PLATFORM__}</h1>
        <div>
            <img width={100} src={JPG}/>
        </div>
        <div>
            <SVG width={100} fill={'red'}/>
        </div>
        <Link to={'/about'}>about</Link>
        <br/>
        <Link to={'/shop'}>shop</Link>
        <h1>{count}</h1>
        <button className={classes.button} onClick={increment}>
            <span>
                GGG
            </span>
        </button>
        <Outlet/>
    </div>
 )
}

