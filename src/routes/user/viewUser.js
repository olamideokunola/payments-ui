import React from "react";
import { Container } from "../../components/container";
import { TextInput, SelectInput, TextAreaInput , FormattedInputSubmit} from "../../components/FormComponents";

import { withUserHelpers } from './withUserHelpers'
import { withLoadedUserData } from "./withLoadedUserData";
import { withParams, withNavigate } from '../../components/hocs'
import { DataGroup, DataSection } from '../../components/dataGroups'

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
}

let ViewUser = withLoadedUserData(ViewUserView)
export default withParams(withUserHelpers(withNavigate(ViewUser)))
// export default withParams(withUserHelpers(withNavigate(ViewUser)))