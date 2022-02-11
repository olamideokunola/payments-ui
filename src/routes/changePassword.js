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

class ChangePassword extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: '',
            passwordConfirmation: ''
        }

        this.handlePasswordChangedClicked = this.handlePasswordChangedClicked.bind(this)
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this)
        this.handlePasswordConfirmationChanged = this.handlePasswordConfirmationChanged.bind(this)
    }

    async handlePasswordChangedClicked(event){
        event.preventDefault()
        console.log(`about to call onPasswordChanged`)
        let from = this.props.location.state?.from?.pathname || "/";
        let email = this.props.location.state?.email || "";

        this.props.onChangePasswordClicked(email, this.state.password,this.state.passwordConfirmation, from)
    }

    handlePasswordChanged(event){
        this.setState({password: event.target.value});
        console.log(`password changed to ${event.target.value}`)
    }

    handlePasswordConfirmationChanged(event){
        this.setState({passwordConfirmation: event.target.value});
        console.log(`password changed to ${event.target.value}`)
    }

    render() {

        let location = this.props.location ? this.props.location : null
        // let from = this.props.location.state ? this.props.location.state.from : null

        let email = this.props.location.state?.email || "";

        let formMembers =  <form className='flex flex-col gap-6' onSubmit={this.handlePasswordChangedClicked}>
            <div className='lg:w-96'>
                <p>Email</p>
                <p className='text-xl font-bold mt-2'>{email}</p>
            </div>

            <div className='lg:w-96'>
                <TextInput placeholder='Enter password'  
                    label='Password' 
                    type='password' 
                    onChange={this.handlePasswordChanged}
                    value={this.state.password}
                    />
            </div>

            <div className='lg:w-96'>
                <TextInput placeholder='Confirm password'  
                    label='Confirm Password' 
                    type='password' 
                    onChange={this.handlePasswordConfirmationChanged}
                    value={this.state.passwordConfirmation}
                    />
            </div>

            <div className='lg:w-96'>
                {this.state.password === '' || this.state.passwordConfirmation === ''? 
                    (<p>{" "}</p>) :
                        (this.state.password.localeCompare(this.state.passwordConfirmation) ? 
                            <p className='text-center text-red-600'>Passwords don't match</p> :
                            <p className='text-center'>Perfect match!</p>)
                }
            </div>

            <div className='lg:w-96'>
                <FormattedInputSubmit>
                    <input type='submit' value='Change password'/>
                </FormattedInputSubmit>
            </div>
        </form>

        return(
            <Container
                title='Change Password'
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

export default withLocation(ChangePassword)