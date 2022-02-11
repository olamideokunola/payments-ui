import React from 'react'
import { withParams } from '../../components/hocs'
import { caseManageMerchants } from '../../services'
import { MerchantDataGroup } from '../../components/merchants/merchantUtils'
import { MerchantDataSection } from '../../components/merchants/merchantUtils'
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
                    <MerchantDataGroup>
                        <MerchantDataSection label='Company Name' value={this.state.merchant.companyName}/>
                        <MerchantDataSection label='Registration Number' value={this.state.merchant.registrationNumber}/>
                    </MerchantDataGroup>

                    <MerchantDataGroup>
                        <MerchantDataSection label='Contact Person' value={`${this.state.merchant.firstName} ${this.state.merchant.middleName} ${this.state.merchant.lastName}`}/>
                    </MerchantDataGroup>

                    <MerchantDataGroup>
                        <MerchantDataSection label='Phone numner' value={this.state.merchant.phoneNumber}/>
                        <MerchantDataSection label='Email' value={this.state.merchant.email}/>
                    </MerchantDataGroup>

                    <MerchantDataGroup>
                        <MerchantDataSection label='Address' value={this.state.merchant.address}/>
                        <MerchantDataSection label='Country' value={this.state.merchant.country}/>
                        <MerchantDataSection label='State' value={this.state.merchant.state}/>
                    </MerchantDataGroup>

                    <MerchantDataGroup>
                        <MerchantDataSection label='Store' value={this.state.merchant.store}/>
                        <MerchantDataSection label='Url' value={this.state.merchant.storeUrl}/>
                        <MerchantDataSection label='Store ID' value={this.state.merchant.storeId}/>
                    </MerchantDataGroup>

                </div>
                
            </Container>
        );
    }
}

let MerchantWithParams = withParams(ViewMerchant)

export { MerchantWithParams as ViewMerchant }