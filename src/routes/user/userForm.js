import React from 'react'
import { TextInput, TextAreaInput, SelectInput, FormattedInputSubmit, ListView } from '../../components/FormComponents';
import { FieldGroup } from '../../components/FormComponents';

class UserForm extends React.Component {

    constructor(props){
        super(props)
        this.handleChangeData = this.handleChangeData.bind(this)
        this.handleSaveUser = this.handleSaveUser.bind(this)
    }

    async componentDidMount(){
        console.log(this.props)
    }

    async handleChangeData(event){
        this.props.onChangeData(event)
    }

    async handleSaveUser(event){
        event.preventDefault()
        this.props.onSaveUser(event)
    }

    render() {

        return <form onSubmit={this.handleSaveUser}>
            <FieldGroup title='Email'>
                <TextInput 
                    label='Email'
                    name='email'
                    placeholder="Enter user email"
                    onChange={this.handleChangeData}
                    value={this.props.email}
                    required
                />
            </FieldGroup>

            <FieldGroup title='Role'>
                <SelectInput placeholder='Select Role' label='Role' 
                    options={this.props.roles ? this.props.roles : []}
                    name="role"
                    value={this.props.role}
                    onChange={this.handleChangeData}
                    required
                />
            </FieldGroup>

            <FieldGroup title='Names'>
                
                <TextInput placeholder='Enter first name' label='First name' 
                    name="firstName"
                    value={this.props.firstName}
                    onChange={this.handleChangeData}
                    required
                />
            
                <TextInput placeholder='Enter middle name' label='Middle name' 
                    name="middleName"
                    value={this.props.middleName}
                    onChange={this.handleChangeData}
                    
                />
 
                <TextInput placeholder='Enter last name' label='Last name' 
                    name="lastName"
                    value={this.props.lastName}
                    onChange={this.handleChangeData}
                    required
                />
            
            </FieldGroup>
            
            <FieldGroup  title='Phone'>
                <TextInput placeholder='Enter phone number' label='Phone number' 
                    name="phoneNumber"
                    value={this.props.phoneNumber}
                    onChange={this.handleChangeData}
                    required
                />
            </FieldGroup>

            <FieldGroup  title='Address'>
                <TextAreaInput placeholder='Enter address' label='Address' 
                    name="address"
                    value={this.props.address}
                    onChange={this.handleChangeData}
                    required
                />
            </FieldGroup>
            
            <FieldGroup  title='Country'>
                <SelectInput name='ID' placeholder='Select Country' label='Country' 
                    options={this.props.countries ? this.props.countries : []}
                    name="country"
                    value={this.props.country}
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

        </form>
    }
}

export {UserForm}