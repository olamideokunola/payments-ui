import React from 'react'
import { data } from '../store/store'
import { Link } from 'react-router-dom'

import { gql } from '@apollo/client';
import { client } from '../api/graph';

import { Container, ContainerSection, Field, FieldAsColumn, fromWei } from '../components/container';
import { SearchBar } from '../components/searchBar';
import { NoPayments } from '../routes/payments'

// import Web3 from 'web3'
// const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const paymentsQuery = `
    query {    
        paymentEntities {
            id
            _transactionId
            _amountInUSD 
            vendorEntity {
              id
              name
              _vendorId
            }
            _fiatSymbol
            _fiatAmount
            _timestamp
            buyer
            swap{
              id
            _tokenAmount
            _amountInUSD
            _stableCoinSymbol
            _tokenSymbol
            _transactionId
            amountOut
            }
          }

        vendorEntities{
            id
            _vendorId
            name
        }

        buyerEntities {
            address
            payments{
              _transactionId
              _fiatSymbol
                _fiatAmount
              swap{
                _tokenAmount
                _amountInUSD
                _tokenSymbol
              }
            }
          }
    }`



function TopBar(props) {

    return (
        <div className="px-4 pt-4 pb-8 bg-gray-900 text-white">
            <h2 className="font-light mb-2">Payment Contract transactions</h2>
            <SearchBar/>
        </div>
    );
}

function StatCell(props) {
    return(
        <div>
            <h2 className="font-light text-gray-400 text-center text-sm">{props.title}</h2>
            <p className="font-light mb-2 text-center text-xl">{props.value}</p>
        </div>
    );
}

function StatBar(props) {
    return (
        <div>
            <Container>
                <div className="grid gap-4 grid-cols-2">
                    <StatCell title={"MERCHANTS"} value={props.NumberOfVendors}/>
                    <StatCell title={"BUYERS"} value={props.NumberOfBuyers}/>
                    <StatCell title={"PAYMENTS"} value={props.NumberOfPayments}/>
                    <StatCell title={"VALUE"} value={fromWei(props.ValueOfPayments).toFixed(2) +" USDT"}/>
                </div>
                
            </Container>
        </div>
    );
}



class PaymentsHome extends React.Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props)
        this.when = this.when.bind(this)
        this.state = {
            payments: [],
            vendors: [],
            buyers: [],
            width: window.innerWidth
        };
    }

    componentDidMount() {
        client.query({  
            query: gql(paymentsQuery)
        })
        .then(data => { 
            console.log("Subgraph data: ", data) 
            // alert(Object.keys(vendors).join(","))
            this.setState({      
                payments: data.data.paymentEntities ,
                vendors: data.data.vendorEntities,
                buyers: data.data.buyerEntities
            });
            //alert(vendors)
        })
        .catch(err => { console.log("Error fetching data: ", err) });
    }

    when (txTime) {
        // alert(txTime)
        let timeInSeconds = Math.round((new Date()/1000 - txTime))
        let timeInMinutes = Math.round(timeInSeconds/60)
        let timeInHours = Math.round(timeInMinutes/60)

        if(timeInMinutes > 59) {
            return `${timeInHours} hour(s) ago`
        } else if(timeInSeconds > 59) {
            return `${timeInMinutes} min(s) ago`
        } else {
            return `${timeInSeconds} secs(s) ago`
        }

    }

    componentDidUpdate() {

    }

    render () {
        return (
            <div className="h-auto">
                <StatBar 
                    NumberOfVendors={this.state.vendors.length}
                    NumberOfPayments={this.state.payments.length}
                    ValueOfPayments={this.state.payments.map(p => Number(p.swap.amountOut[1])).reduce((t, amt) => t + amt, 0)}
                    NumberOfBuyers={this.state.buyers.length}
                />
                <Container title={"Latest Payments"}>
                    {this.state.payments.length == 0 && <NoPayments/>}
                    {this.state.payments.map((pmt, index) => 
                        <Link to={`/payments/${pmt.id}`} key={pmt.id}>
                            <div className="border-b-2 border-gray-100 py-2 text-sm flex flex-wrap lg:grid lg:grid-cols-8">

                                    <Field name={"When: "} value={this.when(pmt._timestamp)} index={index}/>
                                    
                                    <div className="col-span-2">
                                        <Field name={"Merchant: "} value={pmt.vendorEntity.name} index={index}/>
                                    </div>

                                    <div className="col-span-2">
                                        <Field  name={"Tx: "} value={pmt.id} index={index}/>
                       y             </div>

                                    <Field name={"Fiat: "} value={`${pmt._fiatSymbol} ${pmt._fiatAmount}`} index={index}/>
                                    <Field name={"Crypto: "} value={`${fromWei(pmt.swap._tokenAmount).toFixed(2)} ${pmt.swap._tokenSymbol}`} index={index}/>
                                    <Field name={"Stable Coin: "} value={`${fromWei(pmt.swap.amountOut[1]).toFixed(2)} ${pmt.swap._stableCoinSymbol}`} index={index}/>
                            </div>
                        </Link>
                    )}
                </Container>
                
            </div>  
        );
    }
}

class Home extends React.Component {

    render () {
        return (
            <div className="h-full">
                <TopBar/>
                <PaymentsHome payments={data.payments}/>
            </div>
        );
    }
}

export { Home }