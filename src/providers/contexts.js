import React from 'react';
import {caseAuthentication} from '../services/index'

function handleSignOutClicked () {
    console.log('Sign out clicked')
    caseAuthentication.signOut()
}
  
let SignOutContext = React.createContext(handleSignOutClicked)

console.log('in contexts')
console.log(caseAuthentication.getUserData())
let user = caseAuthentication.getUserData()

let UserContext = React.createContext({...user})

export { SignOutContext, UserContext }