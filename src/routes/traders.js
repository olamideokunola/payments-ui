import React from "react";
import { Container } from "../components/container";
import { NavLink, Link } from "react-router-dom";
import { ListView } from "../components/FormComponents";
import { withLoadedData } from "../components/hocs";
import { caseManageTraders } from "../services";
import { Outlet } from "react-router-dom";
import { ViewTrader } from "./trader/viewTrader";
import { TraderTrades } from "./trader/traderTrades";
import { MobileListPrimaryText } from "../components/mobile";
import { MobileListSecondaryText } from "../components/mobile";
import { MobileListTertiaryText } from "../components/mobile";

class TradersHome extends React.Component{
    render() {
        return(
            <div className=''>
                <div className='mx-4 mt-4 flex flex-row gap-6 bg-gray-300 rounded-md px-2 p-2'>
                    <Link to="/traders/trader-trades">
                        <button className='py-1 border-b-2 hover:border-blue-600 text-blue-600 text-xs'>Trader Trades</button>
                    </Link>
                    <Link to="/traders">
                        <button className='py-1 border-b-2 hover:border-blue-600 text-blue-600 text-xs'>Traders</button>
                    </Link>
                </div>
               
                <Outlet/>
            </div>
        );
    }
}


class Traders extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        let displayHeader = () => {
            return <div>
                <div className="hidden text-blue-600 text-sm lg:grid grid-cols-12 gap-6 font-normal items-center pt-2 pb-2 border-blue-200 border-b-2">
                    <p className="">ID</p>
                    <p className="col-span-4">Name</p>
                    <p className="col-span-2">Country</p>
                    <p className="col-span-3">Email</p>
                    <p className="col-span-2">PhoneNumber</p>
                </div> 
            </div>
        }
        
        let editButton = (trader) => <p className="">{<Link to={`/traders/${trader.id}`}><button className="bg-blue-400 rounded text-white px-2 py-1 text-sm">Edit</button></Link>}</p>

        let displayRow = (trader, index) => {
            return <div>
                {/* Small Screen */}
                <div className="lg:hidden grid grid-cols-4 py-4 border-b-2 border-gray-100 items-center ">
                    <div className="col-span-3">
                        <MobileListPrimaryText> {`${trader.firstName} ${trader.middleName} ${trader.lastName}`}</MobileListPrimaryText>
                        <MobileListSecondaryText>{trader.email}</MobileListSecondaryText>
                        <MobileListTertiaryText>{trader.country}: {trader.phoneNumber} </MobileListTertiaryText>
                    </div>
                    <div className="flex flex-col items-end">
                        {editButton(trader)}
                    </div>
                </div>
                {console.log(trader)}

                {/* Large Screen */}
                <div key={index} className="hidden lg:grid grid-cols-12 gap-6 font-normal items-center pt-4 pb-6 border-blue-200 border-b-2">
                    <p className="">{trader.id}</p>
                    <p className="col-span-4">{
                        <NavLink 
                            className='text-blue-600 hover:text-blue-800 font-bold' 
                            to={`/traders/${trader.id}`}>
                                {`${trader.firstName} ${trader.middleName} ${trader.lastName}`}
                        </NavLink>
                    }</p>
                    <p className="col-span-2">{trader.country}</p>
                    <p className="col-span-3">{trader.email}</p>
                    <p className="col-span-2">{trader.phoneNumber}</p>
                    {/* <p className="">{<Link to={`/traders/${trader.id}`}><button className="bg-blue-600 rounded text-white px-2 py-1 text-sm">Edit</button></Link>}</p> */}
                </div>
            </div>
        }

        let actionBar =  (
            <div>
                <Link to="/traders/new"><button className="bg-gray-400 text-white rounded px-2">New trader</button></Link>
            </div>
        )

        // let traders =  this.props.data && this.props.data.traders ? this.props.data.traders : []
        console.log(this.props.data)

        return(
            <Container title='Traders'> 
                <ListView 
                    items={this.props.data && this.props.data.traders ? this.props.data.traders : []} itemsPerPage={5}
                    displayHeader={displayHeader}
                    displayRow={displayRow}
                    >

                </ListView>
            </Container>
        );
    }
    
} 

let TradersWithLoadedData = withLoadedData(Traders, async () => await caseManageTraders.getTraders())


export { 
    TradersWithLoadedData as Traders,
    TradersHome,
    ViewTrader,
    TraderTrades
}