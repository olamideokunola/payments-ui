import React from "react";
import { caseManageUsers, caseAuthentication } from "../../services";


export function withLoadedUserData(Component) {
    return (
        class extends React.Component {

            constructor(props){
                super(props)
        
                this.handleChangeData = this.handleChangeData.bind(this)
                this.handleSaveUser = this.handleSaveUser.bind(this)
            }
        
            async componentDidMount(){
                await this.loadUser()
            }
        
            async loadUser() {
                let id = this.props.params.id
                let { success, message, userData } = await caseManageUsers.getEmployeeUser(id)
        
                if(!success) this.props.onTriggerErrorMessageDialog(message)
        
                console.log(userData)
        
                this.props.onUserLoaded({
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
                this.props.onChangeData(event)
            }
        
            async handleSaveUser(event){
                event.preventDefault()
        
                console.log(event.target.name)
        
                let newUserData = {
                    middleName: this.props.data.middleName,
                    firstName: this.props.data.firstName,
                    lastName: this.props.data.lastName,
                    country: this.props.data.country,
                    address: this.props.data.address,
                    email: this.props.data.email,
                    phoneNumber: this.props.data.phoneNumber,
                    roles: [this.props.data.role]
                }
                
                console.log(newUserData)
        
                let {code, message, success, userData} = await caseManageUsers.saveEmployeeUser(newUserData)
                
                if(!success) this.props.onTriggerErrorMessageDialog(message)
                
                console.log(userData)
            }   
        
            render() {
                
                return(
                    <Component {...this.props}/>
                );
            }
        }
    );
}