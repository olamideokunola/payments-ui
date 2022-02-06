import React from "react";
import { Container } from "../components/container";
import { ListView } from "../components/FormComponents";
import { caseAuthentication, caseManageUsers } from "../services";

class Users extends React.Component {

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

                {/* Large Screen */}
                <div key={index} className="hidden lg:grid grid-cols-4 gap-6 font-normal items-center pt-4 pb-6 border-blue-200 border-b-2">
                    <p className="">{user.id}</p>
                    <p className="">{user.email}</p>
                    <p className="">{user.firstName}</p>
                    <p className="">{user.lastName}</p>
                </div>
            </div>
        }

        return(
            <Container title='Users'>
                {/* <p>{this.state.users.length}</p> */}
                <ListView 
                    headers={['ID', 'Email', 'First name', 'Last name']} 
                    items={this.state.users} itemsPerPage={5}
                    displayRow={displayRow}
                    >

                </ListView>
            </Container>
        );
    }
}

export default Users