import React from 'react'
import { gql } from '@apollo/client';
import { client } from '../../api/graph';
import { CommonSearchBar } from '../../components/searchBar';
import { NoMerchants } from '../../components/dataGroups';
import { Container } from '../../components/container';
import { ContainerSection } from '../../components/container';
import { Field,TokenField } from '../../components/container';

const merchantsQuery = `
    query {    
        vendorEntities{
            id
            _vendorId
            name
            payments{
                _transactionId
                _fiatSymbol
                _fiatAmount
                swap{
                    _tokenAmount
                    _amountInUSD
                    _tokenSymbol
                    amountOut
                }
            }
        }
    }`

export class MerchantsPayments extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            merchants: []
        };
    }

    componentDidMount() {
        client.query({  
            query: gql(merchantsQuery)
        })
        .then(data => { 
            console.log("Subgraph data: ", data) 
            // alert(Object.keys(vendors).join(","))
            this.setState({      
                merchants: data.data.vendorEntities 
            });
            //alert(vendors)
        })
        .catch(err => { console.log("Error fetching data: ", err) });
    }

    render() {
        return(
            <div className="h-full">
                <CommonSearchBar/>
                <Container title={"Merchants Payments"}>
                    {this.state.merchants == 0 && <NoMerchants/>}
                    {this.state.merchants.map((m, index) => {
                        return <div className="">
                            <ContainerSection>
                                <div className="flex flex-col lg:grid lg:grid-cols-3">
                                    <Field name={"Name: "} value={m.name} index={index}/>
                                    <Field name={"ID: "} value={m._vendorId} index={index}/>
                                    {/* <p>{m.payments.length > 0 ? Object.keys(m.payments[0]) : 0}</p> */}
                                    {/* <p>{m.payments[0]._transactionId}</p> */}
                                    <TokenField name={"Total Value: "} value={m.payments.length > 0 ? m.payments.map(p => p.swap._amountInUSD).reduce((t,amt) => Number(t) + Number(amt)) : 0} symbol={"TK2"} index={index}/>
                                </div>
                            </ContainerSection>
                        </div>
                    })} 
                </Container>
            </div>
        );
    }
}