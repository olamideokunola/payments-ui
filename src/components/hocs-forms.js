import React from "react";
import { caseManageUsers, caseAuthentication } from "../services";


export function withFormHandlers(Component){
    return(
        class extends React.Component{

            constructor(props){
                super(props)
                this.state={
                    countries: []
                }
                this.handleChangeData = this.handleChangeData.bind(this)
            }

            async componentDidMount(){
                let loadedCountries = await caseAuthentication.getCountries()
                this.setState({
                    countries:[
                        {
                            text: "Select Country",
                            value: "No selection"
                        },
                        ...loadedCountries.map(country => {
                            return {
                                text: country ? country.name: '',
                                value: country ? country.code: ''
                            }
                        })
                    ]
                })
            }

            async handleChangeData(event){
                console.log(event.target.name)
        
                this.setState({
                    [event.target.name]: event.target.value
                })
        
                console.log(this.state[event.target.name])
        
                if(event.target.name === 'country'){
                    let countryStates = await caseManageUsers.getStates(event.target.value)
                    this.setState({
                        states: countryStates
                    })
        
                    console.log(this.state.country)
                    console.log(countryStates)
                }
            }

            render() {
                return <Component 
                    onInputValueChanged={this.handleChangeData} 
                    countries={this.state.countries}
                    {...this.props}
                />
                   
            }
        }
    );
}