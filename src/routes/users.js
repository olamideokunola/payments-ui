import React from "react";
import { Container } from "../components/container";
import { ListView } from "../components/FormComponents";
import { Link, Outlet } from "react-router-dom";

import { caseAuthentication, caseManageUsers } from "../services";
import { FormattedInputSubmit } from "../components/FormComponents"
import { withLoadedData } from '../components/hocs'

class Users extends React.Component {

    constructor(props){
        super(props)

        // this.state = {
        //     users: []
        // }
    }

    render() {
        let displayHeader = () => {
            return <div>
                <div className="hidden text-blue-600 text-sm lg:grid grid-cols-12 gap-6 font-normal items-center pt-2 pb-2 border-blue-200 border-b-2">
                    <p className="">ID</p>
                    <p className="col-span-3">Email</p>
                    <p className="col-span-2">First name</p>
                    <p className="col-span-2">Last name</p>
                    <p className="col-span-3">Roles</p>
                    <p className="">Action</p>
                </div> 
            </div>
        }
        let displayRow = (user, index) => {
            return <div>
                {/* Small Screen */}
                {/* <div className="lg:hidden">
                    <DataContainer key={index}>
                        <p className="text-xs font-light text-right">Trade: {trade.id}</p>
                        <div>
                            <p className="text-sm font-thin">Price</p>
                            <p className="text-3xl font-light"> 
                                {trade.price.toLocaleString()} 
                                {getAmountElement(trade)}
                            </p>
                        </div>
                        <div className="grid grid-cols-3">
                            <div className="grid grid-cols-3 col-span-2 items-center gap-0">
                                <p className="text-sm font-thin text-left">Quantity</p> <span className="font-light col-span-2">{trade.quantity.toLocaleString()} {this.props.stableCoinSymbol}</span>
                                <p className="text-sm font-thin text-left">Amount</p> 
                                    <span className="font-light col-span-2"> 
                                        {(trade.price * trade.quantity).toLocaleString()} {this.props.fiatSymbol}
                                    </span>
                            </div>
                            <div className="flex flex-row justify-end items-center">
                                <button 
                                    className="bg-white text-blue-600 w-16 h-8 rounded-md" 
                                    onClick={this.handleToggleBuyViewVisibility.bind(this, { trade: { ...trade, fiatSymbol: this.props.fiatSymbol }})}
                                >BUY</button>
                            </div>
                        </div>
                        <p className="text-xs font-thin">Merchant: {trade.merchantId}</p>
                    </DataContainer>
                </div> */}
                {console.log(user)}
                {/* Large Screen */}
                <div key={index} className="hidden lg:grid grid-cols-12 gap-6 font-normal items-center pt-4 pb-6 border-blue-200 border-b-2">
                    <p className="">{user.id}</p>
                    <p className="col-span-3">{user.email}</p>
                    <p className="col-span-2">{user.firstName}</p>
                    <p className="col-span-2">{user.lastName}</p>
                    <p className="col-span-3">{(user.roles.map(role => role.name)).join()}</p>
                    <p className="">{<Link to={`/users/${user.id}`}><button className="bg-blue-600 rounded text-white px-2 py-1 text-sm">Edit</button></Link>}</p>
                </div>
            </div>
        }

        let actionBar =  (
            <div>
                <Link to="/users/new"><button className="bg-gray-400 text-white rounded px-2">New User</button></Link>
            </div>
        )

        let users =  this.props.data ? this.props.data.users : []
        console.log(this.props.data)

        return(
            <Container title='Users' actionBar={actionBar}> 
                <ListView 
                    // headers={['ID', 'Email', 'First name', 'Last name', 'Roles', 'Authorizations', 'Edit']} 
                    items={this.props.data ? this.props.data : []} itemsPerPage={5}
                    displayHeader={displayHeader}
                    displayRow={displayRow}
                    >

                </ListView>
            </Container>
        );
    }
}

let UsersWithLoadedData = withLoadedData(Users, async () => await caseManageUsers.getUserAccounts())

class OldUsers extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            users: []
        }
    }

    async componentDidMount(){
        let userAccounts = await caseManageUsers.getUserAccounts()

        this.setState({
            users: userAccounts
        })
    }

    render() {
        let displayHeader = () => {
            return <div>
                <div className="hidden text-blue-600 text-sm lg:grid grid-cols-12 gap-6 font-normal items-center pt-2 pb-2 border-blue-200 border-b-2">
                    <p className="">ID</p>
                    <p className="col-span-3">Email</p>
                    <p className="col-span-2">First name</p>
                    <p className="col-span-2">Last name</p>
                    <p className="col-span-3">Roles</p>
                    <p className="">Action</p>
                </div> 
            </div>
        }
        let displayRow = (user, index) => {
            return <div>
                {/* Small Screen */}
                {/* <div className="lg:hidden">
                    <DataContainer key={index}>
                        <p className="text-xs font-light text-right">Trade: {trade.id}</p>
                        <div>
                            <p className="text-sm font-thin">Price</p>
                            <p className="text-3xl font-light"> 
                                {trade.price.toLocaleString()} 
                                {getAmountElement(trade)}
                            </p>
                        </div>
                        <div className="grid grid-cols-3">
                            <div className="grid grid-cols-3 col-span-2 items-center gap-0">
                                <p className="text-sm font-thin text-left">Quantity</p> <span className="font-light col-span-2">{trade.quantity.toLocaleString()} {this.props.stableCoinSymbol}</span>
                                <p className="text-sm font-thin text-left">Amount</p> 
                                    <span className="font-light col-span-2"> 
                                        {(trade.price * trade.quantity).toLocaleString()} {this.props.fiatSymbol}
                                    </span>
                            </div>
                            <div className="flex flex-row justify-end items-center">
                                <button 
                                    className="bg-white text-blue-600 w-16 h-8 rounded-md" 
                                    onClick={this.handleToggleBuyViewVisibility.bind(this, { trade: { ...trade, fiatSymbol: this.props.fiatSymbol }})}
                                >BUY</button>
                            </div>
                        </div>
                        <p className="text-xs font-thin">Merchant: {trade.merchantId}</p>
                    </DataContainer>
                </div> */}
                {console.log(user)}
                {/* Large Screen */}
                <div key={index} className="hidden lg:grid grid-cols-12 gap-6 font-normal items-center pt-4 pb-6 border-blue-200 border-b-2">
                    <p className="">{user.id}</p>
                    <p className="col-span-3">{user.email}</p>
                    <p className="col-span-2">{user.firstName}</p>
                    <p className="col-span-2">{user.lastName}</p>
                    <p className="col-span-3">{(user.roles.map(role => role.name)).join()}</p>
                    <p className="">{<Link to={`/users/${user.id}`}><button className="bg-blue-600 rounded text-white px-2 py-1 text-sm">Edit</button></Link>}</p>
                </div>
            </div>
        }

        let actionBar =  (
            <div>
                <Link to="/users/new"><button className="bg-gray-400 text-white rounded px-2">New User</button></Link>
            </div>
        )

        return(
            <Container title='Users' actionBar={actionBar}> 
                <ListView 
                    // headers={['ID', 'Email', 'First name', 'Last name', 'Roles', 'Authorizations', 'Edit']} 
                    items={this.state.users} itemsPerPage={5}
                    displayHeader={displayHeader}
                    displayRow={displayRow}
                    >

                </ListView>
            </Container>
        );
    }
}

class UsersLayout extends React.Component{
    render() {
        return(
            <div>
                <Outlet/>
            </div>
        );
    }
}   

export { UsersLayout, UsersWithLoadedData }