import React from "react";
import { Container } from "../components/container";
import { TextInput, SelectInput, TextAreaInput , FormattedInputSubmit} from "../components/FormComponents";
import { caseManageUsers, caseAuthentication } from "../services";

import { withFormHandlers } from '../components/hocs-forms'
import { withParams } from '../components/hocs'

let ElementContainer = ({children}) => {

    return(
        <div className="lg:w-96 mt-6">
            {children}
        </div>
    );
} 

class EditUser extends React.Component {

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
        this.handleSaveUser = this.handleSaveUser.bind(this)
    }

    async componentDidMount(){
        let roles = await caseManageUsers.getEmployeeRoles()

        console.log(roles)

        this.setState({
            roles: [
                {
                    text: "Select Role",
                    value: "No selection"
                },
                ...roles.map(role => {
                    return {
                        text: role ? role.name: '',
                        value: role ? role.name: ''
                    }
                })
            ]
        })

        let id = this.props.params.id
        let { success, message, userData } = await caseManageUsers.getEmployeeUser(id)

        if(!success) this.props.onTriggerErrorMessageDialog(message)

        console.log(userData)

        this.setState({
            role: userData.roles[0].name,
            firstName: userData.firstName,
            middleName: userData.middleName,
            lastName: userData.lastName,
            country: userData.country,
            address: userData.address,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
        })
    }

    async handleChangeData(event){
        console.log(event.target.name)

        this.setState({
            [event.target.name]: event.target.value
        })

        console.log(this.state[event.target.name])
    }

    async handleSaveUser(event){
        event.preventDefault()

        console.log(event.target.name)

        let newUserData = {
            middleName: this.state.middleName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            country: this.state.country,
            address: this.state.address,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            roles: [this.state.role]
        }
        
        console.log(newUserData)

        let {code, message, success, userData} = await caseManageUsers.saveEmployeeUser(newUserData)
        
        if(!success) this.props.onTriggerErrorMessageDialog(message)
        
        console.log(userData)
    }   

    render() {
        
        return(
            <Container title='Edit User'>
                <form onSubmit={this.handleSaveUser}>
                    <ElementContainer>
                        <TextInput 
                            label='Email'
                            name='email'
                            placeholder="Enter user email"
                            onChange={this.handleChangeData}
                            value={this.state.email}
                        />
                    </ElementContainer>

                    <ElementContainer>
                        <SelectInput placeholder='Select Role' label='Role' 
                            options={this.state.roles ? this.state.roles : []}
                            name="role"
                            value={this.state.role}
                            onChange={this.handleChangeData}
                        />
                    </ElementContainer>

                    <div className="flex flex-row gap-4">
                        <ElementContainer>
                            <TextInput placeholder='Enter first name' label='First name' 
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.handleChangeData}
                            />
                        </ElementContainer>

                        <ElementContainer>
                            <TextInput placeholder='Enter middle name' label='Middle name' 
                                name="middleName"
                                value={this.state.middleName}
                                onChange={this.handleChangeData}
                            />
                        </ElementContainer>

                        <ElementContainer>
                                <TextInput placeholder='Enter last name' label='Last name' 
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.handleChangeData}
                            />
                        </ElementContainer>
                    </div>
                    
                    <ElementContainer>
                            <TextInput placeholder='Enter phone number' label='Phone number' 
                            name="phoneNumber"
                            value={this.state.phoneNumber}
                            onChange={this.handleChangeData}
                        />
                    </ElementContainer>

                    <ElementContainer>
                        <TextAreaInput placeholder='Enter address' label='Address' 
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChangeData}
                        />
                    </ElementContainer>
                     
                    <ElementContainer>
                        <SelectInput name='ID' placeholder='Select Country' label='Country' 
                            options={this.props.countries ? this.props.countries : []}
                            name="country"
                            value={this.state.country}
                            onChange={this.handleChangeData}
                            label='Select Country'
                            placeholder='Select Country'
                        />
                    </ElementContainer>
                    
                    <ElementContainer>
                        <FormattedInputSubmit>
                            <input type='submit' value='Save User'></input>
                        </FormattedInputSubmit>
                    </ElementContainer>

                </form>
            </Container>
        );
    }
}

export default withParams(withFormHandlers(EditUser))