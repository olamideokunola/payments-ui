import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Container, ContainerSection, Field, FieldAsColumn, TokenField } from '../components/container'
import { EmptyComponent } from '../components/emptyComponent'
import { useParams } from 'react-router-dom'
import  { data, getPayment } from '../store/store'

import { gql } from '@apollo/client';
import { client } from '../services/dataaccessors/apollo';

import { CommonSearchBar } from '../components/searchBar';

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
            buyer {
                address
            }
            swap{
              id
            _tokenAmount
            _amountInUSD
            _tokenSymbol
            _stableCoinSymbol
            _transactionId
            amountOut
            }
        }
    }`

function NoPayments (props) {
    return(
        <EmptyComponent message={"No payments to display at the moment"}></EmptyComponent>
    );
}

class Payments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            payments: []
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
                payments: data.data.paymentEntities 
            });
            //alert(vendors)
        })
        .catch(err => { console.log("Error fetching data: ", err) });
    }
    
    render () {
        return (
            <div className="h-full">
                <CommonSearchBar/>
                <Container title={"Payments"}>
                    {this.state.payments.length == 0 && <NoPayments/>}
                    {this.state.payments.map((pmt, index) => 
                        <Link to={`/payments/${pmt.id}`}>
                            <div className="border-b-2 border-gray-100 py-2 text-sm flex flex-wrap lg:flex-row lg:justify-between">
                        
                                    <Field name={"Merchant: "} value={pmt.vendorEntity._vendorId} index={index}/>
                             
                                    <Field name={"Buyer: "} value={pmt.buyer.address} index={index}/>
                           
                                    <Field name={"Tx: "} value={pmt.id} index={index}/>
                     
                                    <Field name={"Fiat: "} value={`${pmt._fiatSymbol} ${pmt._fiatAmount}`} index={index}/>
                                    <TokenField name={"Crypto: "} value={pmt.swap._tokenAmount} symbol={pmt.swap._tokenSymbol} index={index}/>
                            </div>
                        </Link>
                    )}
                </Container>
                
                
            </div>
        );
    }
}

function Payment (props) {

    let { id } = useParams();

    const [payment, setPayment] = useState({
        vendorEntity: {},
        buyer: {},
        swap: {}
    })

    useEffect(() => {

        client.query({  
            query: gql(paymentsQuery)
        })
        .then(data => { 
            console.log("Subgraph data: ", data) 
            // alert(Object.keys(vendors).join(","))
            let pmt = data.data.paymentEntities.find(p => p.id === id)
            setPayment(pmt)
  
            // alert(pmt.vendorEntity.name)
        })
        .catch(err => { console.log("Error fetching data: ", err) });

    })

    return (
        <div className="">
            <CommonSearchBar/>
            <Container title="Payment">
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Tx: "} value={payment.id}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Merchant: "} value={payment.vendorEntity.name}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Buyer: "} value={payment.buyer.address}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Fiat: "} value={`${payment._fiatSymbol} ${payment._fiatAmount}`}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <TokenField name={"Crypto: "} value={`${payment.swap._tokenAmount}`} symbol={`${payment.swap._tokenSymbol}`} index={0}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <TokenField name={"Stable coin: "} value={`${payment.swap._amountInUSD}`} symbol={`${payment.swap._stableCoinSymbol}`} index={0}/>
                    </p>
                </ContainerSection>
            </Container>
        </div>
    );
}

export { Payments, Payment, NoPayments  } 