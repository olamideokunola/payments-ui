import React from 'react'
import { caseAuthentication, caseManageMerchants } from '../../services'

export function withMerchantHelpers(Component) {

    return class extends React.Component {
        constructor(props){
            super(props)

            this.state = {
                companyName: '',
                firstName: '',
                middleName: '',
                lastName: '',
                country: '',
                address: '',
                state: '',
                country: '',
                email: '',
                phoneNumber: '',
                registrationNumber: '',
                store: '',
                storeUrl: '',
                countries: [],
                states: [],
                merchantAccountCreated: false,
                merchantAccount: {}
            }
            
            this.handleChangeData = this.handleChangeData.bind(this)
        }

        async componentDidMount(){

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
            
            // get merchant data using id from route param into state
            let id = this.props.params.id
            if(id) {
                let {merchant} = await caseManageMerchants.getMerchant(id)
                this.setState({
                    ...merchant
                })

                // change country from name to country two char code in state
                let foundCountry = this.state.countries ? this.state.countries.find(ctry => ctry.text === merchant.country) : ''
                this.setState({
                    country:foundCountry.value
                })
                
                // load country's states into state 
                await this.getStates(foundCountry.value) 
            }
        }

        async getStates(country){
            console.log(country)
            let countryStates = country? await caseManageMerchants.getStates(country) : []
            this.setState({
                states: countryStates
            })

            console.log(this.state.country)
            // console.log(countryStates)
        }

        async handleChangeData(event){
            console.log(event.target.name)

            this.setState({
                [event.target.name]: event.target.value
            })

            console.log(this.state[event.target.name])

            if(event.target.name === 'country'){
                await this.getStates(event.target.value)                
            }
        }

        render() {
            return <Component onChangeData={this.handleChangeData} data={{...this.state}} {...this.props}/>
        }
    }
}