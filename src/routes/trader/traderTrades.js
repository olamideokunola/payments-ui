import React from 'react'
import { CommonSearchBar } from '../../components/searchBar';
import { Container } from '../../components/container';


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

export class TraderTrades extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            merchants: []
        };
    }

    componentDidMount() {

    }

    render() {
        return(
            <div className="h-full">
                <CommonSearchBar/>
                <Container title={"Trader Trades"}>
                </Container>
            </div>
        );
    }
}