import React from 'react'
import { gql } from '@apollo/client';
import { client } from '../api/graph';

import { Container, ContainerSection, Field, FieldAsColumn, TokenField } from '../components/container';
import { CommonSearchBar } from '../components/searchBar';
import { EmptyComponent } from '../components/emptyComponent'

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

function NoMerchants (props) {
    return(
        <EmptyComponent message={"No merchants to display at the moment"}></EmptyComponent>
    );
}

class Merchants extends React.Component {

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
                <Container title={"Merchants"}>
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

export { Merchants }