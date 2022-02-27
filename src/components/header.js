import React from 'react'
import cbLogo from '../images/logo2.png'
import hamburger from '../images/hamburger.png'

import { NavLink } from 'react-router-dom'
import { SignOutContext, UserContext } from '../providers/contexts'

const links = [
    {title: "Home", to:"/", allowed:['basicEmployee','csaEmployee']},
    {title: "Payments", to:"/payments", allowed:['basicEmployee','csaEmployee']},
    {title: "Merchants", to:"/merchants", allowed:['basicEmployee','csaEmployee']},
    {title: "Buyers", to:"/buyers", allowed:['basicEmployee','csaEmployee']},
    {title: "Sign In", to:"/signin"}
]

function NavBarLinks(props) {
    
    return (
        <UserContext.Consumer>
            {user => (
                <div className="lg:flex lg:flex-row">
                    {props.links.map((link, index) => 
                        <NavLink key={index} to={link.to} 
                            className={isActive => isActive ? "active-link" : "inactive-link"}
                            
                            // isActive={(match, location) => {
                            //     //alert(match ? "match path: " + match.path + ", \n location path:" + location.pathname : "location path: " + location.pathname)
                            //     //if(match) {alert(`substring: ${match.path.substring(1)}`)}
                            //     if (!match ){
                            //       return false;
                            //     } else if(match.path.substring(1) === location.pathname)
                            //     {
                            //       return true
                            //     }
                            //     return false
                            //   }}
                            >
                            <li className="py-2 lg:px-6 text-sm hover:text-primary">{link.title}</li>
                        </NavLink>
                    )}
                    {/* <p>user keys are {Object.keys(user)}</p>
                    <p>email is: {user.email}</p> */}
                    <SignOutContext.Consumer>
                        {signOut => (
                            user.email ? 
                                <button className='flex flex-row text-sm text-blue-800 tracking-wide items-center font-light hover:bg-blue-300 bg-blue-200 py-1 px-4 rounded-lg' onClick={signOut}>Sign out</button> :
                                <NavLink to='/signIn'><button className='flex flex-row text-sm text-blue-800 tracking-wide items-center font-light hover:bg-blue-300 bg-blue-200 py-1 px-4 rounded-lg' >Sign in</button> </NavLink>
                        )}
                    </SignOutContext.Consumer>
                </div>
            )}
        </UserContext.Consumer>
    );
}

function DesktopNavBar(props) {
    return (
        <ul className="flex flex-row mx-2">
            {props.navBarlinks}
        </ul>
    );
}

function MobileNavBar(props) {
    return (
        <ul className="flex flex-col mx-2">
            {props.navBarlinks}
        </ul>
    );
}

class Header extends React.Component {

    constructor (props) {
        super(props)
        this.toggleNavBar = this.toggleNavBar.bind(this)
        this.state = {
            navBarVisible: false
        }
    }

    toggleNavBar() {
        this.setState((state) => ({
            navBarVisible: !state.navBarVisible
        }))
    }

    render () {

        let navBarlinks =  <NavBarLinks links={this.props.links}/>

        return (
            <div>
                <div className="flex flex-row justify-between items-center m-4">
                    <div className="flex flex-row items-center"> 
                        <img className="w-12 mr-2" src={cbLogo} alt="CryptoBank Logo"/>
                        <h1 className="text-xl lg:text-xl font-semibold">CryptoBank Payments</h1>
                    </div>
                    <div className="hidden md:inline-flex">
                        <DesktopNavBar navBarlinks={navBarlinks}/>
                    </div>
                    <img className="w-6 md:hidden" src={hamburger} alt="Menu" onClick={this.toggleNavBar}/>
                </div>
                {this.state.navBarVisible &&  <MobileNavBar navBarlinks={navBarlinks}/>}
                
            </div>
        );
    }
}

export default Header