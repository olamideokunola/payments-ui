import React from 'react'
import { withParams } from '../../components/hocs'
import { caseManageTraders } from '../../services'
import { DataGroup, DataSection } from '../../components/dataGroups'
import { Link } from 'react-router-dom'
import { Container } from '../../components/container'

class ViewTrader extends React.Component {
    
    constructor(props) {
        
        super(props)
        this.state= {
            code: '',
            status: '',
            message: '',
            trader: {}
        }
    }

    async componentDidMount(){
        let id = this.props.params.id

        let {code, status, message, trader} = await caseManageTraders.getTrader(id)

        if(!trader) return

        this.setState({
            code,
            status,
            message,
            trader
        })
    }

    render () {
        // let actionBar =  (
        //     <div>
        //         <Link to={`/traders/edit/${this.props.params.id}`}><button className="bg-gray-400 text-white rounded px-2">Edit Merchant</button></Link>
        //     </div>
        // )
        return (
            <Container title='Trader Information' >
                <div className='flex flex-col mt-4 gap-4'>

                    <DataGroup>
                        <DataSection label='Contact Person' value={`${this.state.trader.firstName} ${this.state.trader.middleName} ${this.state.trader.lastName}`}/>
                    </DataGroup>

                    <DataGroup>
                        <DataSection label='Phone numner' value={this.state.trader.phoneNumber}/>
                        <DataSection label='Email' value={this.state.trader.email}/>
                    </DataGroup>

                    <DataGroup>
                        <DataSection label='Address' value={this.state.trader.address}/>
                        <DataSection label='Country' value={this.state.trader.country}/>
                    </DataGroup>

                </div>
                
            </Container>
        );
    }
}

let TraderWithParams = withParams(ViewTrader)

export { TraderWithParams as ViewTrader }