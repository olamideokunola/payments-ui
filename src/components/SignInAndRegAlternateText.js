import React from 'react'
import { Link } from "react-router-dom"

function SignInAndRegAlternateText(props) {
    return<p className='text-center'>
        {props.msg}  
        <Link to={props.to}>
            <span className='text-blue-600 font-bold'> {props.linkText}</span>
        </Link>
    </p>
}

export default SignInAndRegAlternateText
