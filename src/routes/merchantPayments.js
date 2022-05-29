import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Container, ContainerSection, Field, FieldAsColumn, TokenField } from '../components/container'
import { EmptyComponent } from '../components/emptyComponent'
import { data, getPayment } from '../store/store'
import { withParams, withQuery } from '../components/hocs'

import { gql } from '@apollo/client';
import { client } from '../services/dataaccessors/apollo';

import { CommonSearchBar } from '../components/searchBar';
// 7ced88de-debc-4b37-b18a-1ab2f507352d
const MERCHANTS_PAYMENTS = gql`
    query MerchantPayments ($id: ID, $timeStamp: Int) {    
        vendorEntity (id: $id) {
            id
            _vendorId
            name
            payments (first: 10, orderBy: _timestamp, orderDirection: asc, where: { _timestamp_gt: $timeStamp }) {
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
        }
    }`

function NoPayments(props) {
    return (
        <EmptyComponent message={"No payments to display at the moment"}></EmptyComponent>
    );
}

class MerchantPayments extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            payments: []
        };

        this.id = this.props.params.id
    }

    componentDidMount() {

        // client.query({
        //     query: gql(MERCHANTS_PAYMENTS)
        // })
        //     .then(data => {
        //         console.log("Subgraph data: ", data)
        //         // alert(Object.keys(vendors).join(","))
        //         this.setState({
        //             payments: data.data.paymentEntities
        //         });
        //         //alert(vendors)
        //     })
        //     .catch(err => { console.log("Error fetching data: ", err) });
        // console.log("params are: ", this.props.params)
        // const { loading, error, data } = this.props.graphQuery(MERCHANTS_PAYMENTS, {
        //     id: { id: this.props.params.id },
        // });

        let { loading, error, data } = this.props.graphResponse


        if (loading) return 'Loading';
        if (error) return `Error! ${error}`;

        console.log('id is: ', this.id)
        console.log('data: ', data)
        this.setState({
            payments: data.vendorEntity.payments
        })

    }

    render() {
        return (
            <div className="h-full">
                <CommonSearchBar />
                <Container title={"Merchant Payments"}>
                    {this.state.payments.length == 0 && <NoPayments />}
                    {this.state.payments.map((pmt, index) =>
                        <Link key={index} to={`/payments/${pmt.id}`}>
                            <div className="border-b-2 border-gray-100 py-2 text-sm flex flex-wrap lg:flex-row lg:justify-between">
                                <Field name={"When: "} value={(new Date(pmt._timestamp*1000)).toDateString()} index={index} />
                                {/* <Field name={"Merchant: "} value={pmt.vendorEntity._vendorId} index={index} /> */}

                                <Field name={"Buyer: "} value={pmt.buyer.address} index={index} />

                                <Field name={"Tx: "} value={pmt.id} index={index} />

                                <Field name={"Fiat: "} value={`${pmt._fiatSymbol} ${pmt._fiatAmount}`} index={index} />
                                <TokenField name={"Crypto: "} value={pmt.swap._tokenAmount} symbol={pmt.swap._tokenSymbol} index={index} />
                            </div>
                        </Link>
                    )}
                </Container>


            </div>
        );
    }
}

let MerchantPaymentsWithParams = withParams(withQuery(MerchantPayments, MERCHANTS_PAYMENTS))

export { MerchantPaymentsWithParams as MerchantPayments } 