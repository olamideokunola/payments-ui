import { from } from "@apollo/client";
import React from "react";
import { Container } from "../components/container";
import {caseAuthentication, caseManageUsers} from "../services/index"
import { TextInput, TextAreaInput, SelectInput, FormattedInputSubmit} from '../components/FormComponents'
import NoProfileImage from '../imgs/hero_images/no_profile.jpg'
import ChangePassword from './changePassword'
import {Link} from 'react-router-dom'

let ElementContainer = ({children}) => {

    return(
        <div className="lg:w-96 mt-6">
            {children}
        </div>
    );
} 



function withUserState(Component) {

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
            this.handleStateLoaded = this.handleStateLoaded.bind(this)
        }

        async componentDidMount(){
            let roles = await caseManageUsers.getEmployeeRoles()

            console.log(roles)

            if(roles) {
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
            }
        }

        async handleChangeData(event){
            console.log(event.target.name)

            this.setState({
                [event.target.name]: event.target.value
            })

            console.log(this.state[event.target.name])
        }

        handleStateLoaded(data){
            console.log(data)
            this.setState({...data})
        }

        render() {
            
            return(
                <Component data={this.state} onStateLoaded={this.handleStateLoaded} onChangeData={this.handleChangeData} {...this.props}/>
            );
        }
    }

}

class Profile extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            startChangePassword: false
        }
    }

    async componentDidMount() {
        
        let user = await caseAuthentication.getUserData()
        let {userData} = await caseManageUsers.getEmployeeUser(user.id)

        console.log(user)

        console.log(userData)
        this.props.onStateLoaded(userData)
        console.log(userData)
    }

    async componentWillUnmount(){
        
    }

    render() {
        return(
            <Container title='Profile'>
                <div className="flex flex-col items-center gap-4 pt-4">
                    <img className="w-36" src={NoProfileImage}/>
                    <h1 className="text-center text-3xl text-blue-600">{this.props.data.firstName} {this.props.data.middleName} {this.props.data.lastName}</h1>
                    <p className="w-1/3 text-center">{this.props.data.address}</p>

                    <div className="bg-gray-300 lg:w-1/2 rounded-lg p-8 flex flex-col items-center gap-4">
                        <div className="bg-white w-max px-4 py-2 rounded-full">{this.props.data.email}</div>
                        <div className="bg-white w-max px-4 py-2 rounded-full">{this.props.data.phoneNumber}</div>
                        <div className="bg-white w-max px-4 py-2 rounded-full">{this.props.data.roles.map(role => role.name).join(", ")}</div>
                        <div className="bg-white w-max px-4 py-2 rounded-full">{this.props.data.country}</div>
                        
                        <Link to='/changePassword' state={{email: this.props.data.email}}>
                            <button className="bg-blue-600 hover:bg-blue-900 text-white px-4 py-2 rounded-lg">Change Password </button> 
                        </Link>

                    </div>
                </div>
            </Container>
        );
    }
}

export default withUserState(Profile)