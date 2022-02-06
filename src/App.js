import React from 'react'
import './App.css';
import Header from './components/header'
import Footer from './components/footer'

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Home } from './routes/home';
import { Payments, Payment } from './routes/payments';
import { Merchants } from './routes/merchants';
import { Buyers } from './routes/buyers';
import SignIn from '../src/routes/signIn'
import { SignOutContext, UserContext } from './providers/contexts'

import { caseAuthentication } from './services/index'
import SignFailedImage from './imgs/dialog_images/signin-failed.svg'
import { withNavigate} from './components/hocs'
import Trades from './routes/trades';
import Traders from './routes/traders';
import Profile from './routes/profile';
import Users from './routes/users';
import { DeepSet } from './helpers/helpers';

let links = [
  {title: "Home", to:"/", allowed:['basicEmployee','csaEmployee']},
  {title: "Payments", to:"/payments", allowed:['basicEmployee','csaEmployee']},
  {title: "Merchants", to:"/merchants", allowed:['basicEmployee','csaEmployee']},
  {title: "Buyers", to:"/buyers", allowed:['basicEmployee','csaEmployee']},
  {title: "Traders", to:"/traders", allowed:['csaEmployee']},
  {title: "Trades", to:"/trades", allowed:['csaEmployee']},
  {title: "Users", to:"/users", allowed:['csaEmployee']},
  {title: "Profile", to:"/profile", allowed:['basicEmployee','csaEmployee']},
]

let signInLink = {title: "Sign In", to:"/signin"}
let signOutLink = {title: "Sign Out", to:"/signin"}

function RequireAuth({ children }) {
  // let user = caseAuthentication.getUserData();
  let location = useLocation()
  
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
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

class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      userIsSignedIn: false,
      user: {email: null},
      navLinks: [],
      showIncorrectCredentialsDialog: false,
      showPasswordResetEmailSent: false,
      showPasswordsMismatchDialog: false,
      showPasswordsChangeFailedDialog: false,
      showPasswordsChangeSuccessfulDialog: false,
      showErrorOnCreateMerchantDialogue: false,
      createMerchantErrorMessage: ''
    }

    this.handleSignInClicked = this.handleSignInClicked.bind(this)
    this.handleSignOutClicked = this.handleSignOutClicked.bind(this)

    this.handleResetDialog = this.handleResetDialog.bind(this)
  }

  getAuthenticatedUserLinks(loggedOnUser, links){
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
      
      if(from) {
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
    this.setState({
      userIsSignedIn: false,
      user: {},
    })
  }

  handleResetDialog(){
    console.log('about to reset dialog')
    this.setState({
      showIncorrectCredentialsDialog: false
    })
  }

  render(){
    return (
      <div className="flex flex-col h-screen content-between">
        <UserContext.Provider value={this.state.user}>
          <SignOutContext.Provider value={this.handleSignOutClicked}>
            <Header links={this.state.navLinks}/>
              <div className="flex flex-col h-full bg-gray-100">
                
                <p>In App, user email is: {this.state.user.email}</p>
              
                  <Routes>
                    <Route path="/payments/:id" element={<RequireAuth><Payment/></RequireAuth>}/>
                    <Route path="/payments" element={<RequireAuth><Payments/></RequireAuth>}/>
                    <Route path="/merchants" element={<RequireAuth><Merchants/></RequireAuth>}/>
                    <Route path="/buyers" element={<RequireAuth><Buyers/></RequireAuth>}/>
                    <Route path="/traders" element={<RequireAuth><Traders/></RequireAuth>}/>
                    <Route path="/trades" element={<RequireAuth><Trades/></RequireAuth>}/>
                    <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>}/>
                    <Route path="/users" element={<RequireAuth><Users/></RequireAuth>}/>
                    <Route path="/signIn" element={ <SignIn  onSignIn={this.handleSignInClicked}/>}/>
                    <Route path="/" element={<RequireAuth><Home/></RequireAuth>}/>
                  </Routes>
            </div>
          <Footer />
          </SignOutContext.Provider>
        </UserContext.Provider>

        {this.state.showIncorrectCredentialsDialog && <ModalDialog msg='Incorrect username or password' img={SignFailedImage} onResetDialog={this.handleResetDialog}></ModalDialog>}

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
