import React from 'react'
import './App.css';
import Header from './components/header'
import Footer from './components/footer'

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Home } from './routes/home';
import { Payments, Payment } from './routes/payments';
import { MerchantsPayments, Merchants, MerchantsHome, RegisterMerchant, ViewMerchant, EditMerchant } from './routes/merchants';
import { TradersHome,Traders, ViewTrader, TraderTrades } from './routes/traders';
import { Buyers } from './routes/buyers';
import SignIn from '../src/routes/signIn'
import ChangePassword from './routes/changePassword';
import NewUser  from './routes/newUser';
import EditUser from './routes/editUser';


import { SignOutContext, UserContext } from './providers/contexts'
import { withLocation } from './components/hocs';

import { caseAuthentication } from './services/index'
import SignFailedImage from './imgs/dialog_images/signin-failed.svg'
import { withNavigate} from './components/hocs'
import {Trades} from './routes/trades';
import Profile from './routes/profile';
import { UsersLayout, UsersWithLoadedData as Users } from './routes/users';
import { DeepSet } from './helpers/helpers';

let routes = [
  {title: "Home", to:"/", allowed:['basicEmployee','csaEmployee']},
  {title: "Payments", to:"/payments", allowed:['basicEmployee','csaEmployee']},
  {title: "Payment", to:"/payment", allowed:['basicEmployee','csaEmployee'], excludeFromMenu:true},
  {title: "Merchants", to:"/merchants", allowed:['basicEmployee','csaEmployee']},
  {title: "Buyers", to:"/buyers", allowed:['basicEmployee','csaEmployee']},
  {title: "Traders", to:"/traders", allowed:['csaEmployee']},
  {title: "Trades", to:"/trades", allowed:['csaEmployee']},
  {title: "Users", to:"/users", allowed:['']},
  {title: "New Users", to:"/users/:id", allowed:[''], excludeFromMenu:true},
  {title: "Profile", to:"/profile", allowed:['basicEmployee','csaEmployee']},
  {title: "Change Password", to:"/changePassword", allowed:['basicEmployee','csaEmployee'], excludeFromMenu:true},
  {title: "Edit User", to:"/users/:id", allowed:[], excludeFromMenu:true},

]

let links = routes.filter(route => !route.excludeFromMenu)

let signInLink = {title: "Sign In", to:"/signin"}
let signOutLink = {title: "Sign Out", to:"/signin"}

function RequireAuth({ children }) {
  // let user = caseAuthentication.getUserData();
  let location = useLocation()
  
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // than dropping them off on the home page.
    // along to that page after they login, which is a nicer user experience
  return(
    <UserContext.Consumer>
        {user => (
          <div>
              {!user.email ? <Navigate to="/signIn" state={{ from: location }} replace={true}/> : children}
          </div>
     )}
     </UserContext.Consumer>
  )
}

function withAuthorizationCheck(WrappedComponent) {

  // let location = useLocation()
  
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
  return withLocation(class extends React.Component{
    constructor(props){
      super(props)

      this.isAuthorized = this.isAuthorized.bind(this)
      this.path = this.props.location.pathname
    }

    isAuthorized (user) {
      let result = false
      
      console.log(`path is:`)
      console.log(this.path)
      
      this.foundRoute = routes.find(route => route.to === this.path)
      
      console.log(this.foundRoute)
      if(!this.foundRoute && !user.isAdmin) return
      
      if(user.isAdmin) return true

      this.foundRoute.allowed.forEach(al => {
        let authorized = user.roles.find(role => role === al)
  
        if(authorized) {
          result = true
        }
      })
      console.log(result)

      return result
    }

    render() {

      return(
        <UserContext.Consumer>
            {user => (
              <div>
                  {!this.isAuthorized(user) ?
                  <Navigate to="/" replace={true}/> : 
                  <WrappedComponent {...this.props}></WrappedComponent>
                }
              </div>
         )}
         </UserContext.Consumer>
      )
    }
    
  })
}

let UsersLayoutWithAuthorizationCheck = withAuthorizationCheck(UsersLayout)
let UsersWithAuthorizationCheck = withAuthorizationCheck(Users)
let PaymentsWithAuthorizationCheck = withAuthorizationCheck(Payments)
let NewUserWithAuthorizationCheck = withAuthorizationCheck(NewUser)
let ChangePasswordWithAuthorizationCheck = withAuthorizationCheck(ChangePassword)
let EditUserWithAuthorizationCheck = withAuthorizationCheck(EditUser)


class App extends React.Component {

  constructor(props){
    super(props)

    this.loggedOnUser =  {...caseAuthentication.getUserData()}

    this.state = {
      userIsSignedIn: false,
      user: this.loggedOnUser,
      navLinks: this.loggedOnUser && this.loggedOnUser.roles ? [...this.getAuthenticatedUserLinks(this.loggedOnUser, links)] : [],
      showIncorrectCredentialsDialog: false,
      showPasswordResetEmailSent: false,
      showPasswordsMismatchDialog: false,
      showPasswordsChangeFailedDialog: false,
      showPasswordsChangeSuccessfulDialog: false,
      showErrorOnCreateMerchantDialogue: false,
      createMerchantErrorMessage: '',
      showDialog: false,
      dialogMessage: ''
    }

    this.handleSignInClicked = this.handleSignInClicked.bind(this)
    this.handleSignOutClicked = this.handleSignOutClicked.bind(this)

    this.handleResetDialog = this.handleResetDialog.bind(this)

    this.handleTriggerErrorMessageDialog = this.handleTriggerErrorMessageDialog.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    
  }

  getLinks(){
    
  }

  getAuthenticatedUserLinks(loggedOnUser, links){
    if(!loggedOnUser.roles) return
    let newLinks = []
    links.forEach(link => {
      link.allowed.forEach(al => {
        let roleAuthorized = loggedOnUser.roles.find(role => role.localeCompare(al) === 0)
        if(roleAuthorized || loggedOnUser.isAdmin) newLinks.push(link)

      })
    })

    return new DeepSet().addList(newLinks)
  }

  async handleSignInClicked(event, email, password, from){
    console.log(`Sign in button clicked`)
    event.preventDefault()

    let loggedOnUser = await caseAuthentication.signIn({
        email: email,
        password: password,
        twoFaCode: ''
    })

    console.log(`user is logged on`)  
    console.log(loggedOnUser)

    if(loggedOnUser) {
      console.log(loggedOnUser)

      this.setState({
        userIsSignedIn: true,
        user: loggedOnUser,
        navLinks: loggedOnUser ? [...this.getAuthenticatedUserLinks(loggedOnUser, links)] : []
      })

      console.log(`change password is ${loggedOnUser.changePassword}`)

      if(loggedOnUser.changePassword) {
        this.props.navigate('/changePassword', {state: {email: loggedOnUser.email}, replace: true})
      } else if(!loggedOnUser.changePassword) {
        this.props.navigate('/', {replace: true})
      } else if(from) {
        this.props.navigate(from, {replace: true})
      } else {
        this.props.navigate('/', {replace: true})
      }
    
    } else {
      this.setState({
        showIncorrectCredentialsDialog: true
      })
    }
  }

  handleSignOutClicked () {
    console.log('Sign out clicked')
    caseAuthentication.signOut()

    this.loggedOnUser =  {...caseAuthentication.getUserData()}

    this.setState({
      userIsSignedIn: false,
      user: this.loggedOnUser,
      navLinks: this.loggedOnUser && this.loggedOnUser.roles ? [...this.getAuthenticatedUserLinks(this.loggedOnUser, links)] : [],
    })
  }

  handleTriggerErrorMessageDialog(msg){
    this.setState({
      showDialog: true,
      dialogMessage: msg
    })
  }

  handleResetDialog(){
    console.log('about to reset dialog')
    this.setState({
      showIncorrectCredentialsDialog: false,
      showDialog: false
    })
  }

  async handleChangePassword(email, password, passwordConfirmation, from ){
    console.log(`about to change password, old is ${password} new is ${passwordConfirmation}`)
    
    if(password.localeCompare(passwordConfirmation) !== 0){
      console.log(`password mismatch`)

      this.setState({
        showDialog: true,
        dialogMessage: "Password mismatch!"
      })

      return
    }

    let changed = await caseAuthentication.changeNewPassword(email, password)

    if(!changed) {
      this.setState(state=>({
        showDialog: true,
        dialogMessage: 'Password Change Failed!'
      }))
    } else {
      this.setState(state=>({
        showDialog: true,
        dialogMessage: 'Password Change Successful!'
      }))

      if(!from ) {
        this.props.navigate('/', {replace: true})
      } else {
        this.props.navigate(from, {replace: true})
      }
      
    }
  }

  render(){
    return (
      <div className="flex flex-col content-between">
        <UserContext.Provider value={this.state.user}>
          <SignOutContext.Provider value={this.handleSignOutClicked}>
            <Header links={this.state.navLinks}/>
              <div className="flex flex-col h-full bg-gray-100">
                
                {this.state.user.email && <p className='px-6 pt-2'>Current user: {this.state.user.email}</p>}
              
                  <Routes>
                    <Route path="/payments/:id" element={<RequireAuth><Payment/></RequireAuth>}/>
                    <Route path="/payments" element={<RequireAuth><PaymentsWithAuthorizationCheck/></RequireAuth>}/>
                    <Route path="/merchants" element={<RequireAuth><MerchantsHome/></RequireAuth>}>
                      <Route path="" element={<RequireAuth><Merchants/></RequireAuth>}/>
                      <Route path="merchant-payments" element={<RequireAuth><MerchantsPayments/></RequireAuth>}/>
                      <Route path="new" element={<RequireAuth><RegisterMerchant/></RequireAuth>}/>
                      <Route path=":id" element={<RequireAuth><ViewMerchant/></RequireAuth>}/>
                      <Route path="edit/:id" element={<RequireAuth><EditMerchant/></RequireAuth>}/>
                    </Route>
                    <Route path="/buyers" element={<RequireAuth><Buyers/></RequireAuth>}/>
                    <Route path="/traders" element={<RequireAuth><TradersHome/></RequireAuth>}>
                      <Route path="" element={<RequireAuth><Traders/></RequireAuth>}/>
                      <Route path=":id" element={<RequireAuth><ViewTrader/></RequireAuth>}/>
                      <Route path="trader-trades" element={<RequireAuth><TraderTrades/></RequireAuth>}/>
                    </Route>
                    <Route path="/trades" element={<RequireAuth><Trades/></RequireAuth>}/>
                    <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>}/>
                    <Route path="/users" element={<RequireAuth><UsersLayoutWithAuthorizationCheck/></RequireAuth>}>
                      <Route path="" element={<RequireAuth><UsersWithAuthorizationCheck/></RequireAuth>}/>
                      <Route path="new" element={<NewUserWithAuthorizationCheck onTriggerErrorMessageDialog={this.handleTriggerErrorMessageDialog}/>} />
                      <Route path=":id" element={<EditUserWithAuthorizationCheck onTriggerErrorMessageDialog={this.handleTriggerErrorMessageDialog}/>} />
                    </Route>
                    <Route path="/signIn" element={<SignIn onSignIn={this.handleSignInClicked}/>}/>
                    <Route path="/changePassword" element={<RequireAuth><ChangePasswordWithAuthorizationCheck onChangePasswordClicked={this.handleChangePassword}/></RequireAuth>}></Route>
                    <Route path="/" element={<RequireAuth><Home/></RequireAuth>}/>
                  </Routes>
            </div>
            <Footer />
          </SignOutContext.Provider>
        </UserContext.Provider>

        {this.state.showIncorrectCredentialsDialog && <ModalDialog msg='Incorrect username or password' img={SignFailedImage} onResetDialog={this.handleResetDialog}></ModalDialog>}
        {this.state.showDialog && <ModalDialog msg={this.state.dialogMessage} img={SignFailedImage} onResetDialog={this.handleResetDialog}></ModalDialog>}

      </div>
    );
  }
}

function ModalDialog(props) {
  return(
    <div className='z-100 fixed left-0 top-0 w-screen h-screen bg-black/50'>
      <div className='flex flex-col gap-4 p-8 justify-between items-center z-120 w-1/3 h-1/3 top-[33%] left-[33%] opacity-100 fixed rounded-lg bg-white'>
        <img className='h-3/8' src={props.img}/> 
        <h1 className='text-gray-600'>{props.msg}</h1>
        <button className='bg-blue-600 text-white rounded px-8 py-1' onClick={props.onResetDialog}>OK</button>
      </div>
    </div>
  );
}

export default withNavigate(App);
