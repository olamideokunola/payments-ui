import React from "react";
import { Container } from "../components/container";
import { TextInput, SelectInput, TextAreaInput , FormattedInputSubmit} from "../components/FormComponents";
import { caseManageUsers, caseAuthentication } from "../services";

import { withFormHandlers } from '../components/hocs-forms'
import { FieldGroup } from "../components/FormComponents";
import { UserForm } from "./user/userForm";
import {withUserHelpers} from './user/withUserHelpers'
import { withParams } from "../components/hocs";

let ElementContainer = ({children}) => {

    return(
        <div className="lg:w-96 mt-6">
            {children}
        </div>
    );
} 


class NewUser extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            firstName: '',
            middleName: '',
            lastName: '',
            country: '',
            address: '',
            email: '',
            phoneNumber: '',
            role: '',
            countries: [],
            roles: []
        }

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
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            country: this.state.country,
            address: this.state.address,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            roles: [this.state.role]
        }
        
        console.log(newUserData)

        let {code, message, success, userData} = await caseManageUsers.createEmployeeUser(newUserData)
        
        if(!success) {
            this.props.onTriggerErrorMessageDialog(message)
        } else {

        }

        console.log(userData)
    }   

    render() {
        
        return(
            <Container title='New User'>
                <UserForm onSaveUser={this.handleUpdateUserAccount} onChangeData={this.props.onChangeData} key={this.props.data.id} {...this.props.data} />
                {/* <form onSubmit={this.handleCreateUser}>
                    <FieldGroup title='Email'>
                        <TextInput 
                            label='Email'
                            name='email'
                            placeholder="Enter user email"
                            onChange={this.handleChangeData}
                            value={this.state.email}
                            required
                        />
                    </FieldGroup>

                    <FieldGroup title='Role'>
                        <SelectInput placeholder='Select Role' label='Role' 
                            options={this.state.roles ? this.state.roles : []}
                            name="role"
                            value={this.state.role}
                            onChange={this.handleChangeData}
                            required
                        />
                    </FieldGroup>

                    <FieldGroup title='Names'>
                        
                        <TextInput placeholder='Enter first name' label='First name' 
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChangeData}
                            required
                        />
                    

                    
                        <TextInput placeholder='Enter middle name' label='Middle name' 
                            name="middleName"
                            value={this.state.middleName}
                            onChange={this.handleChangeData}
                            
                        />
                    

                    
                            <TextInput placeholder='Enter last name' label='Last name' 
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChangeData}
                            required
                        />
                    
                    </FieldGroup>
                    
                    <FieldGroup  title='Phone'>
                            <TextInput placeholder='Enter phone number' label='Phone number' 
                            name="phoneNumber"
                            value={this.state.phoneNumber}
                            onChange={this.handleChangeData}
                            required
                        />
                    </FieldGroup>

                    <FieldGroup  title='Address'>
                        <TextAreaInput placeholder='Enter address' label='Address' 
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChangeData}
                            required
                        />
                    </FieldGroup>
                     
                    <FieldGroup  title='Country'>
                        <SelectInput name='ID' placeholder='Select Country' label='Country' 
                            options={this.props.countries ? this.props.countries : []}
                            name="country"
                            value={this.state.country}
                            onChange={this.handleChangeData}
                            label='Select Country'
                            placeholder='Select Country'
                            required
                        />
                    </FieldGroup>
                    
                    <div className="mt-4">
                        <FormattedInputSubmit>
                            <input type='submit' value='Create User'></input>
                        </FormattedInputSubmit>
                    </div>

                </form> */}
            </Container>
        );
    }
}

// let EditMerchantWithData = withNavigate(withParams(withMerchantHelpers(EditMerchant)))

export default withParams(withUserHelpers(NewUser))
// export default withFormHandlers(NewUser) 

