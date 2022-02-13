import { throwServerError } from '@apollo/client';
import { gql } from '@urql/core';
import axios from 'axios';
import { typeFromAST } from 'graphql';
import jwt_decode from "jwt-decode"
import { getToken } from './tokenAccess';

const ADD_USER_MUTATION = gql`
    mutation addUser ($email: String!, $password: String!, $country: String! ) {
        addUser(email: $email, password: $password, country: $country ){
            id
            email
            country
        }
    }
`

const RESET_PASSWORD = gql`
    mutation resetPassword ($email: String!) {
        resetPassword(email: $email){
            email
            msg
        }
    }
`

const CHANGE_PASSWORD = gql`
    mutation changePassword ($passwordResetToken: String, $email: String, $password: String) {
        changePassword(passwordResetToken: $passwordResetToken, email: $email, password: $password){
            email
            successful
            msg
        }
    }
`

const CHANGE_NEW_PASSWORD = gql`
    mutation changeNewPassword ($email: String, $password: String) {
        changeNewPassword(email: $email, password: $password){
            email
            successful
            msg
        }
    }
`
class AuthService {
    constructor(client){
        this.client = client
    }

    setToken(userToken) {
        sessionStorage.setItem('token', JSON.stringify(userToken));
    }

    getUserData(){
        try {
            console.log('in getUserData, token is')
            console.log(this.getToken())
            let decoded = this.decodeToken(this.getToken())

            console.log(`decoded is`)
            console.log(decoded)

            return {
                id: decoded.id,
                email: decoded.email,
                country: decoded.country,
                isAdmin: decoded.isAdmin,
                roles: decoded.roles,
                changePassword: decoded.changePassword 
            }

        } catch (e) {
            console.error(e)
        }
    }
    
    getToken() {
        // const tokenString = sessionStorage.getItem('token');
        // console.log(`token in storage is ${tokenString}`)
        // const userToken = JSON.parse(tokenString);
        return getToken()
    }

    decodeToken(token){
        let decoded = jwt_decode(token);
        // console.log('decode: ')
        // console.log(decoded)
        return decoded
    }

    deleteToken(){
        sessionStorage.removeItem('token');
    }

    async signIn({email, password, twoFaCode}){
        try {
            console.log(`about to sign in`)
            
            const credentials = new URLSearchParams({ username: email, password });
            
            let result = await axios.post(`http://${process.env.REACT_APP_AUTHENTICATION_HOST}:4000/login`, credentials.toString())
            
            let token = result.data.accessToken
            console.log(`token is ${token}`)

            if(token) {this.setToken(token)}

            return this.getUserData()
        } catch (e) {
            console.error(e)
            return null
        }
    }

    signOut(){
        this.deleteToken()
    }

    async registerUser({email, phone, password, country}){
        try {
            console.log(`in registerUser of auth service`)
            console.log({ email, password, country })
            const result = await this.client
                .mutation(ADD_USER_MUTATION, { email, password, country })
                .toPromise()
                // .then(result => {
                // console.log(result); // { data: ... }
                // });
            console.log(`user added`)
            console.log(result)
            return result.data.addUser
        } catch(e){
            console.error(e)
            return null
        }
        
    }

    async resetPassword(email){
        try {
            console.log(`in resetPassword of auth service`)
            console.log(email)

            const result = await this.client
                .mutation(RESET_PASSWORD, { email })
                .toPromise()
                // .then(result => {
                // console.log(result); // { data: ... }
                // });

            if(!result)return

            console.log(`password reset`)
            console.log(result)
            return result.data.resetPassword.msg
        } catch(e) {
            console.error(e)
            return null
        }
    }

    async verifyPasswordResetToken(token) {
        try {
            let decoded = this.decodeToken(token);

            console.log(decoded)

            let now = Number(new Date())/1000

            return { expired: now < decoded.exp, valid: true, email: decoded.email}
        } catch (e) {
            console.log(e)
            return
        }
    }

    async changePassword(passwordResetToken, email, password){
        try {
            console.log(`in changePassword of auth service`)
            console.log(email)

            const result = await this.client
                .mutation(CHANGE_PASSWORD, { passwordResetToken, email, password })
                .toPromise()
                // .then(result => {
                // console.log(result); // { data: ... }
                // });

            console.log(result)
            if(!result || !result.data.changePassword.successful)return

            return true
        } catch (error) {
            console.log(error)
            return
        }
    }

    async changeNewPassword(email, password){
        try {
            console.log(`in changePassword of auth service`)
            console.log(email)

            const result = await this.client
                .mutation(CHANGE_NEW_PASSWORD, { email, password })
                .toPromise()
                // .then(result => {
                // console.log(result); // { data: ... }
                // });

            console.log(result)
            if(!result || !result.data.changeNewPassword.successful)return

            return true
        } catch (error) {
            console.log(error)
            return
        }
    }
}

export { AuthService }