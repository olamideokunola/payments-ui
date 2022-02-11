import React from 'react'
import { withMerchantHelpers } from './withMerchantHelpers'
import { withParams } from '../../components/hocs'
import { caseManageMerchants } from '../../services'
import { Container } from '../../components/container'
import { MerchantForm } from './merchantForm'
import { withNavigate } from '../../components/hocs'

class EditMerchant extends React.Component {
    constructor(props){
        super(props)
        this.handleUpdateMerchantAccount = this.handleUpdateMerchantAccount.bind(this)
    }

    async handleUpdateMerchantAccount(event){

        event.preventDefault()

        console.log(this.props.data.companyName)

        let {status, msg, merchant} = await caseManageMerchants.updateMerchantAccount({
            id: this.props.data.id,
            companyName: this.props.data.companyName,
            email: this.props.data.email,
            firstName: this.props.data.firstName,
            middleName: this.props.data.middleName,
            lastName: this.props.data.lastName,
            address: this.props.data.address,
            country: this.props.data.country,
            state: this.props.data.state,
            phoneNumber: this.props.data.phoneNumber,
            registrationNumber: this.props.data.registrationNumber,
            store: this.props.data.store,
            storeUrl: this.props.data.storeUrl
        })

        if(status === 'error') {
            if(!msg) msg = 'Error'
            this.props.onTriggerErrorMessage(msg)
        } else {
            this.setState({
                merchantAccountCreated: true,
                merchantAccount: merchant
            })

            this.props.navigate(`/merchants/${this.props.data.id}`, {replace: true})
        } 
    }

    render() {
        console.log(this.props.data)
        return (
            <Container title='Edit merchant'>
                <MerchantForm onSaveMerchant={this.handleUpdateMerchantAccount} onChangeData={this.props.onChangeData} key={this.props.data.id} {...this.props.data} />
            </Container>
        );
    }
}

let EditMerchantWithData = withNavigate(withParams(withMerchantHelpers(EditMerchant)))

export {EditMerchantWithData as EditMerchant}