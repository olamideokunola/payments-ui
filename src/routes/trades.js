import React from "react";
import { Container } from "../components/container";
import { withLoadedData } from '../components/hocs'
import { caseManageTrades } from '../services'
import { ListView } from '../components/FormComponents'
import { NavLink } from 'react-router-dom'

import { MobileListPrimaryText } from '../components/mobile';
import { MobileListSecondaryText } from '../components/mobile';
import { MobileListTertiaryText } from '../components/mobile';

import { CommonSearchBar } from '../components/searchBar';

class Trades extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.handleSetSearchParams = this.handleSetSearchParams.bind(this)
    }

    handleSetSearchParams(searchParams) {
        this.props.onSetSearchParams(searchParams)
    }

    render() {
        let displayHeader = () => {
            return <div>
                <div className="hidden text-blue-600 text-sm lg:grid grid-cols-8 gap-6 font-normal items-center pt-2 pb-2 border-blue-200 border-b-2">
                    <p className="col-span-1">Date</p>
                    <p className="col-span-1">ID</p>
                    <p className="col-span-2">Stable Coin Quantity</p>
                    <p className="col-span-1">Value</p>
                    <p className="col-span-1">Merchant</p>
                    <p className="col-span-2">Trader</p>
                </div>
            </div>
        }

        // let editButton = (merchant) => <p className="">{<Link to={`/merchants/${merchant.id}`}><button className="bg-blue-400 rounded text-white px-2 py-1 text-sm">Edit</button></Link>}</p>

        let displayRow = (trade, index) => {
            let value = `${(Number(trade.amount) * Number(trade._tradePrice)).toFixed(2)} NGN`
            let qty = `${trade.amount} ${trade._stableCoinSymbol}`
            return <div>
                {/* Small Screen */}
                <div className="lg:hidden grid grid-cols-4 py-4 border-b-2 border-gray-100 items-center ">
                    <div className="col-span-3">
                        <MobileListTertiaryText> {`${trade.id}`}</MobileListTertiaryText>
                        <MobileListPrimaryText> {value}</MobileListPrimaryText>
                        <MobileListSecondaryText>{qty}</MobileListSecondaryText>
                        <MobileListTertiaryText>{trade._traderEmail} </MobileListTertiaryText>
                    </div>

                </div>
                {console.log(trade)}

                {/* Large Screen */}
                <div key={index} className="hidden lg:grid grid-cols-8 gap-6 font-normal items-center pt-4 pb-6 border-blue-200 border-b-2">
                    <p className="col-span-1">{new Date(Number(trade._timestamp)).toDateString()}</p>
                    <p className="col-span-1">{trade.id}</p>
                    <p className="col-span-2">{qty}</p>
                    <p className="col-span-1">{value}</p>
                    <p className="col-span-1">{trade.vendorName}</p>
                    <p className="col-span-2">{trade._traderEmail}</p>
                    {/* <p className="">{<Link to={`/traders/${trader.id}`}><button className="bg-blue-600 rounded text-white px-2 py-1 text-sm">Edit</button></Link>}</p> */}
                </div>
            </div>
        }


        return (
            <div className="h-full">
                <CommonSearchBar placeholder="Trades" onSetSearchParams={this.handleSetSearchParams}/>
                <Container title='Trades'>
                    <ListView
                        items={this.props.data && this.props.data.trades ? this.props.data.trades : []} itemsPerPage={5}
                        displayHeader={displayHeader}
                        displayRow={displayRow}
                    >

                    </ListView>
                </Container>
            </div>
        );
    }
}

let TradesWithLoadedData = withLoadedData(Trades, async (searchParams) => await caseManageTrades.getTrades(searchParams))

export { TradesWithLoadedData as Trades }