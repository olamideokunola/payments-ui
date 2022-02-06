import React from 'react'
import SignInAndRegAlternateText from '../components/SignInAndRegAlternateText'
import { TextInput, FormattedInputSubmit } from '../components/FormComponents';
import {Container} from '../components/container';
import { throwServerError } from '@apollo/client';

import { useLocation , Link} from 'react-router-dom'

import {caseAuthentication} from '../services/index'

function withLocation(Component){
    return props => <Component {...props} location={useLocation()}/>
}

class SignIn extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: ''
        }

        this.handleSignInClicked = this.handleSignInClicked.bind(this)
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this)
        this.handleEmailChanged = this.handleEmailChanged.bind(this)

        
    }

    async handleSignInClicked(event){
        // console.log(`Sign in button clicked`)
        // event.preventDefault()

        // let loggedOnUser = await caseAuthentication.signIn({
        //     email: this.state.email,
        //     password: this.state.password,
        //     twoFaCode: ''
        // })

        // console.log(`user is logged on`)
        // console.log(loggedOnUser)
        console.log(`about to call onSignIn`)
        let from = this.props.location.state?.from?.pathname || "/";
        this.props.onSignIn(event, this.state.email, this.state.password, from)
    }

    handlePasswordChanged(event){
        this.setState({password: event.target.value});
        console.log(`password changed to ${event.target.value}`)
    }

    handleEmailChanged(event){
        this.setState({email: event.target.value});
        console.log(`email changed to ${event.target.value}`)
    }

    render() {

        let location = this.props.location ? this.props.location : null
        // let from = this.props.location.state ? this.props.location.state.from : null

        let from = this.props.location.state?.from?.pathname || "/";

        let formMembers =  <form className='flex flex-col gap-6' onSubmit={this.handleSignInClicked}>
            <div className='lg:w-96'>
                <TextInput 
                    placeholder='Enter email or phone number' 
                    label='Email/Phone number' 
                    onChange={this.handleEmailChanged}
                    value={this.state.email}
                    />
            </div>

            <div className='lg:w-96'>
                <TextInput placeholder='Enter password'  
                    label='Password' 
                    type='password' 
                    onChange={this.handlePasswordChanged}
                    value={this.state.password}
                    />
                <Link to="/resetPassword"><p className='text-center pt-4 lg:text-left font-bold text-blue-600'>Forgot password?</p></Link>
            </div>

            <div className='lg:w-96'>
                <FormattedInputSubmit>
                    <input type='submit' value='Sign In'/>
                </FormattedInputSubmit>
            </div>
        </form>

        return(
            <Container
                title='Sign In'
                bottomText={<SignInAndRegAlternateText 
                    msg='Do not have an account?'
                    linkText='Register'
                    to='/registerTrader'
                ></SignInAndRegAlternateText>}
            >
                {<div className='mt-16 lg:mt-6 lg:container grid grid-cols-1 gap-8'>{formMembers}</div>}
            </Container>
        );
    }
}




export default withLocation(SignIn)