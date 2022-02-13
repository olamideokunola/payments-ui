import React from 'react'
import { withParams } from '../../components/hocs'
import { caseManageMerchants } from '../../services'
import { DataGroup } from '../../components/dataGroups'
import { DataSection } from '../../components/dataGroups'
import { Link } from 'react-router-dom'
import { Container } from '../../components/container'

class ViewMerchant extends React.Component {
    
    constructor(props) {
        
        super(props)
        this.state= {
            code: '',
            status: '',
            message: '',
            merchant: {}
        }
    }

    async componentDidMount(){
        let id = this.props.params.id

        let {code, status, message, merchant} = await caseManageMerchants.getMerchant(id)

        if(!merchant) return

        this.setState({
            code,
            status,
            message,
            merchant
        })
    }

    render () {
        let actionBar =  (
            <div>
                <Link to={`/merchants/edit/${this.props.params.id}`}><button className="bg-gray-400 text-white rounded px-2">Edit Merchant</button></Link>
            </div>
        )
        return (
            <Container title='Merchant Information' actionBar={actionBar}>
                <div className='flex flex-col mt-4 gap-4'>
                    <DataGroup>
                        <DataSection label='Company Name' value={this.state.merchant.companyName}/>
                        <DataSection label='Registration Number' value={this.state.merchant.registrationNumber}/>
                    </DataGroup>

                    <DataGroup>
                        <DataSection label='Contact Person' value={`${this.state.merchant.firstName} ${this.state.merchant.middleName} ${this.state.merchant.lastName}`}/>
                    </DataGroup>

                    <DataGroup>
                        <DataSection label='Phone numner' value={this.state.merchant.phoneNumber}/>
                        <DataSection label='Email' value={this.state.merchant.email}/>
                    </DataGroup>

                    <DataGroup>
                        <DataSection label='Address' value={this.state.merchant.address}/>
                        <DataSection label='Country' value={this.state.merchant.country}/>
                        <DataSection label='State' value={this.state.merchant.state}/>
                    </DataGroup>

                    <DataGroup>
                        <DataSection label='Store' value={this.state.merchant.store}/>
                        <DataSection label='Url' value={this.state.merchant.storeUrl}/>
                        <DataSection label='Store ID' value={this.state.merchant.storeId}/>
                    </DataGroup>

                </div>
                
            </Container>
        );
    }
}

let MerchantWithParams = withParams(ViewMerchant)

export { MerchantWithParams as ViewMerchant }