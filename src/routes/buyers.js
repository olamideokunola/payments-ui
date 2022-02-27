import React, { useEffect, useState } from 'react'
import { Container, ContainerSection, Field, FieldAsColumn, TokenField } from '../components/container'
import { useParams } from 'react-router-dom'
import  { data, getPayment } from '../store/store'

import { gql } from '@apollo/client';
import { client } from '../services/dataaccessors/apollo';

import { CommonSearchBar } from '../components/searchBar';
import { TokenKind } from 'graphql';
import { EmptyComponent } from '../components/emptyComponent';


const buyersQuery = `
    query {    
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

function NoBuyers(props) {
    return(
        <EmptyComponent message={"No buyers to display at the moment"}/>
    );
}

class Buyers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buyers: []
        };
    }

    componentDidMount() {
        client.query({  
            query: gql(buyersQuery)
        })
        .then(data => { 
            console.log("Subgraph data: ", data) 
            // alert(Object.keys(vendors).join(","))
            this.setState({      
                buyers: data.data.buyerEntities 
            });
            //alert(vendors)
        })
        .catch(err => { console.log("Error fetching data: ", err) });
    }

   
    render () {
        return (
            <div className="h-full">
                <CommonSearchBar/>
                <Container title={"Buyers"}>
                    {this.state.buyers == 0 && <NoBuyers/>}
                    {this.state.buyers.map((b, index) => {
                        return <div className="">
                            <ContainerSection>
                                <div className="flex flex-wrap lg:flex-row lg:justify-between">
                                    <Field name={"Address: "} value={b.address} index={index}/>
    
                                    <Field name={"Number of Transactions: "} value={b.payments.length} index={index}/>
                                    
                                    <TokenField name={"Value: "} value={b.payments.map(p => p.swap._amountInUSD).reduce((t,amt) => Number(t) + Number(amt))} symbol={"USDT"} index={index}/>
                                </div>
                            </ContainerSection>
                        </div>
                    })} 
                </Container>
            </div>
        );
    }
}

function Buyer () {

    let { id } = useParams();

    const [payment, setPayment] = useState({})

    useEffect(() => {
        setPayment(getPayment(id))
    })

    return (
        <div className="">
            <Container title="Buyer">
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Tx: "} value={payment.tx}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Merchant: "} value={payment.merchant}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Buyer: "} value={payment.buyer}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Fiat: "} value={`${payment.fiatSymbol} ${payment.fiatAmount}`}/>
                    </p>
                </ContainerSection>
                <ContainerSection>
                    <p>
                        <FieldAsColumn name={"Crypto: "} value={`${payment.swap.tokenAmount} ${payment.swap.tokenSymbol}`}/>
                    </p>
                </ContainerSection>
            </Container>
        </div>
    );
}

export { Buyers, Buyer } 