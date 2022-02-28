import React from "react";
import { Container } from "../components/container";
import { TextInput, SelectInput, TextAreaInput , FormattedInputSubmit} from "../components/FormComponents";
import { caseManageUsers, caseAuthentication } from "../services";

import { withFormHandlers } from '../components/hocs-forms'
import { FieldGroup } from "../components/FormComponents";
import { UserForm } from "./user/userForm";
import { withUserHelpers } from './user/withUserHelpers'
import { withParams, withNavigate } from "../components/hocs";

class NewUser extends React.Component {

    constructor(props){
        super(props)

        this.handleChangeData = this.handleChangeData.bind(this)
        this.handleUpdateUserAccount = this.handleUpdateUserAccount.bind(this)
    }

    async handleChangeData(event){
        this.props.onChangeData(event)
    }

    async handleUpdateUserAccount(event){
        event.preventDefault()

        console.log(event.target.name)

        let newUserData = {
            firstName: this.props.data.firstName,
            middleName: this.props.data.middleName,
            lastName: this.props.data.lastName,
            country: this.props.data.country,
            address: this.props.data.address,
            email: this.props.data.email,
            phoneNumber: this.props.data.phoneNumber,
            roles: [this.props.data.role]
        }
        
        alert(newUserData)
        console.log(newUserData)

        let {code, message, success, userData} = await caseManageUsers.createEmployeeUser(newUserData)
        
        if(!success) {
            this.props.onTriggerErrorMessageDialog(message)
        } else {
            //this.props.onTriggerErrorMessageDialog('New user created')
            this.props.navigate('/users')
        }

        alert(`User id is: ${userData.id}, name is ${userData.firstName} ${userData.lastName}` )
        console.log(userData)
    }   

    render() {
        
        return(
            <Container title='New User'>
                <UserForm onSaveUser={this.handleUpdateUserAccount} onChangeData={this.handleChangeData} key={this.props.data.id} {...this.props.data} />
            </Container>
        );
    }
}

// let EditMerchantWithData = withNavigate(withParams(withMerchantHelpers(EditMerchant)))

export default withParams(withUserHelpers(withNavigate(NewUser)))
// export default withFormHandlers(NewUser) 

