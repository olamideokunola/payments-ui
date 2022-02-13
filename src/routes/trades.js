import React from "react";
import { Container } from "../components/container";
import { withLoadedData } from '../components/hocs'
import { caseManageTrades } from '../services'
import { ListView } from '../components/FormComponents'
import { NavLink } from 'react-router-dom'

class Trades extends React.Component {

    render() {
        let displayHeader = () => {
            return <div>
                <div className="hidden text-blue-600 text-sm lg:grid grid-cols-8 gap-6 font-normal items-center pt-2 pb-2 border-blue-200 border-b-2">
                    <p className="col-span-4">ID</p>
                    <p className="col-span-2">Stable Coin Quantity</p>
                    <p className="col-span-2">Price</p>
                </div> 
            </div>
        }

        let displayRow = (trade, index) => {
            return <div>
                {/* Small Screen */}

                {console.log(trade)}

                {/* Large Screen */}
                <div key={index} className="hidden lg:grid grid-cols-8 gap-6 font-normal items-center pt-4 pb-6 border-blue-200 border-b-2">
                    <p className="col-span-4">{trade.id}</p>
                    <p className="col-span-2">{trade.amount} {trade._stableCoinSymbol}</p>
                    <p className="col-span-2"></p>
                    {/* <p className="">{<Link to={`/traders/${trader.id}`}><button className="bg-blue-600 rounded text-white px-2 py-1 text-sm">Edit</button></Link>}</p> */}
                </div>
            </div>
        }

        return(
            <Container title='Trades'>
                <ListView 
                    items={this.props.data && this.props.data.trades ? this.props.data.trades : []} itemsPerPage={5}
                    displayHeader={displayHeader}
                    displayRow={displayRow}
                    >

                </ListView>
            </Container>
        );
    }
}

let TradesWithLoadedData = withLoadedData(Trades, async () => await caseManageTrades.getTrades() )

export { TradesWithLoadedData as Trades }