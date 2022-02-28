import React from "react";
import { Container } from "../../components/container";
import { TextInput, SelectInput, TextAreaInput , FormattedInputSubmit} from "../../components/FormComponents";

import { withUserHelpers } from './withUserHelpers'
import { withLoadedUserData } from "./withLoadedUserData";
import { withParams, withNavigate } from '../../components/hocs'
import { DataGroup, DataSection } from '../../components/dataGroups'

let ElementContainer = ({children}) => {

    return(
        <div className="lg:w-96 mt-6">
            {children}
        </div>
    );
} 

function ViewUserView(props) {
    return (
        <Container title='User Information' >
            <div className='flex flex-col mt-4 gap-4'>

                <DataGroup>
                    <DataSection label='User' value={`${props.data.firstName} ${props.data.middleName} ${props.data.lastName}`}/>
                    <DataSection label='Roles' value={props.data.role}/>
                </DataGroup>

                <DataGroup>
                    <DataSection label='Phone numner' value={props.data.phoneNumber}/>
                    <DataSection label='Email' value={props.data.email}/>
                </DataGroup>

                <DataGroup>
                    <DataSection label='Address' value={props.data.address}/>
                    <DataSection label='Country' value={props.data.country}/>
                </DataGroup>

            </div>
            
        </Container>
    );
    
    <Container title='Edit User'>
        <form onSubmit={props.handleSaveUser}>
            <ElementContainer>
                <TextInput 
                    label='Email'
                    name='email'
                    placeholder="Enter user email"
                    onChange={props.handleChangeData}
                    value={props.data.email}
                    required
                />
            </ElementContainer>

            <ElementContainer>
                <SelectInput placeholder='Select Role' label='Role' 
                    options={props.data.roles ? props.data.roles : []}
                    name="role"
                    value={props.data.role}
                    onChange={props.handleChangeData}
                    required
                />
            </ElementContainer>
            <div className="flex flex-row gap-4">

                <ElementContainer>
                    <TextInput placeholder='Enter first name' label='First name' 
                        name="firstName"
                        value={props.data.firstName}
                        onChange={props.handleChangeData}
                        required
                    />
                </ElementContainer>

                <ElementContainer>
                    <TextInput placeholder='Enter middle name' label='Middle name' 
                        name="middleName"
                        value={props.data.middleName}
                        onChange={props.handleChangeData}
                    />
                </ElementContainer>

                <ElementContainer>
                    <TextInput placeholder='Enter last name' label='Last name' 
                        name="lastName"
                        value={props.data.lastName}
                        onChange={props.handleChangeData}
                        required
                    />
                </ElementContainer>
            </div>
            
            <ElementContainer>
                <TextInput placeholder='Enter phone number' label='Phone number' 
                    name="phoneNumber"
                    value={props.data.phoneNumber}
                    onChange={props.handleChangeData}
                    required
                />
            </ElementContainer>

            <ElementContainer>
                <TextAreaInput placeholder='Enter address' label='Address' 
                    name="address"
                    value={props.data.address}
                    onChange={props.handleChangeData}
                    required
                />
            </ElementContainer>
            
            <ElementContainer>
                <SelectInput name='ID' placeholder='Select Country' label='Country' 
                    options={props.countries ? props.countries : []}
                    name="country"
                    value={props.data.country}
                    onChange={props.handleChangeData}
                    label='Select Country'
                    placeholder='Select Country'
                    required
                />
            </ElementContainer>
            
            <ElementContainer>
                <FormattedInputSubmit>
                    <input type='submit' value='Save User'></input>
                </FormattedInputSubmit>
            </ElementContainer>

        </form>
    </Container>
}

let ViewUser = withLoadedUserData(ViewUserView)
export default withParams(withUserHelpers(withNavigate(ViewUser)))
// export default withParams(withUserHelpers(withNavigate(ViewUser)))