import React from 'react'
import { caseAuthentication, caseManageMerchants, caseManageUsers } from '../../services'

export function withUserHelpers(Component) {

    return class extends React.Component {
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
        }

        async getAndSetCountries(){

            // load countries for input select into state
            let countries = await caseAuthentication.getCountries()

            let countriesForSelect = [
                {
                    text: "Select Country",
                    value: "No selection"
                },
                ...countries.map(country => {
                    return {
                        text: country ? country.name: '',
                        value: country ? country.code: ''
                    }
                })
            ]
            
            this.setState({
                countries: countriesForSelect
            })
        
        }

        async getAndSetUser(){
            // get user data using id from route param into state
            let id = this.props.params.id
            let {user} = await caseManageUsers.getEmployeeUser(id)
            this.setState({
                ...user
            })
        }

        async getAndSetRoles(){
            let roles = await caseManageUsers.getEmployeeRoles()
    
            console.log(roles)
    
            let rolesForSelect = [
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
            

            console.log(rolesForSelect)

            this.setState({
                roles: rolesForSelect ? rolesForSelect : [] 
            })
        }

        async componentDidMount(){

            await this.getAndSetCountries()
            
            await this.getAndSetUser()

            await this.getAndSetRoles()
        }
        
        async handleChangeData(event){
            console.log(event.target.name)

            this.setState({
                [event.target.name]: event.target.value
            })
        }

        render() {
            return <Component onChangeData={this.handleChangeData} data={{...this.state}} {...this.props}/>
        }
    }
}