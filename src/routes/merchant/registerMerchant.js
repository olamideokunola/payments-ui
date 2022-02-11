import React from "react"
import { Container } from "../../components/container";
import { TextInput, TextAreaInput, SelectInput, FormattedInputSubmit, ListView } from '../../components/FormComponents';
import { FieldGroup } from "./merchantForm";
import { caseAuthentication, caseManageMerchants } from "../../services";
import { MerchantForm } from "./merchantForm";
import { withMerchantHelpers } from "./withMerchantHelpers";
import { withParams } from "../../components/hocs";

export class RegisterMerchantOld extends React.Component {

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
        
        this.handleCreateMerchantAccount = this.handleCreateMerchantAccount.bind(this)
        this.handleChangeData = this.handleChangeData.bind(this)
    }

    async componentDidMount(){
        let countries = await caseAuthentication.getCountries()
        this.setState({
            countries
        })

        console.log(this.state.countries)
    }

    async handleCreateMerchantAccount(event){

        event.preventDefault()

        console.log(this.state.companyName)

        let {status, msg, newMerchant} = await caseManageMerchants.createMerchantAccount({
            companyName: this.state.companyName,
            email: this.state.email,
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            address: this.state.address,
            country: this.state.country,
            state: this.state.state,
            phoneNumber: this.state.phoneNumber,
            registrationNumber: this.state.registrationNumber,
            store: this.state.store,
            storeUrl: this.state.storeUrl
        })

        if(status === 'error') {
            if(!msg) msg = 'Error'
            this.props.onTriggerErrorMessage(msg)
        } else {
            this.setState({
                merchantAccountCreated: true,
                merchantAccount: newMerchant
            })
        } 
    }

    async handleChangeData(event){
        console.log(event.target.name)

        this.setState({
            [event.target.name]: event.target.value
        })

        console.log(this.state[event.target.name])

        if(event.target.name === 'country'){
            let countryStates = await caseManageMerchants.getStates(event.target.value)
            this.setState({
                states: countryStates
            })

            console.log(this.state.country)
            console.log(countryStates)
        }
    }

    render() {

        let countries = [
            {
                text: "Select Country",
                value: "No selection"
            },
            ...this.state.countries.map(country => {
                return {
                    text: country ? country.name: '',
                    value: country ? country.code: ''
                }
            })
        ]

        console.log(this.state.countries)

        let formMembers =  <form className='flex flex-col gap-6' onSubmit={this.handleCreateMerchantAccount}>
            <FieldGroup title='Company Information'>
                <div className='lg:w-96'>
                    <TextInput placeholder='Enter your company name' label='Company' 
                        name="companyName"
                        value={this.state.companyName}
                        onChange={this.handleChangeData}
                    />
                </div>

                <div className='lg:w-96'>
                    <TextInput placeholder='Enter your company registration number' label='Registration number' 
                        name="registrationNumber"
                        value={this.state.registrationNumber}
                        onChange={this.handleChangeData}
                    />
                </div>
            </FieldGroup>
            
            <FieldGroup title='Contact Person'>
                <div className='lg:w-96'>
                    <TextInput placeholder='Enter your first name' label='First name of contact person' 
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleChangeData}
                    />
                </div>

                <div className='lg:w-96'>
                    <TextInput placeholder='Enter your middle name' label='Middle name of contact person'
                        name="middleName"
                        value={this.state.middleName}
                        onChange={this.handleChangeData}
                    />
                </div>

                <div className='lg:w-96'>
                    <TextInput placeholder='Enter your last name' label='Last name of contact person'
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChangeData}
                    />
                </div>
            </FieldGroup>
            
            <FieldGroup title="Contact Information">
                <div className='lg:w-96'>
                    <TextInput placeholder='Enter phone number' label='Phone number'
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.handleChangeData}
                    />
                </div>

                <div className='lg:w-96'>
                    <TextInput placeholder='Enter email' label='Email'
                        name="email"
                        value={this.state.email}
                        type="email"
                        onChange={this.handleChangeData}
                    />
                </div>
            </FieldGroup>

            <FieldGroup title='Location'>
                <div className='lg:w-96'>
                    <TextAreaInput placeholder='Enter office address' label='Office Address'
                        name="address"
                        value={this.state.address}
                        onChange={this.handleChangeData}
                    />
                </div>

                <div className='lg:w-96'>
                    <SelectInput name='ID' placeholder='Select Country' label='Country' 
                        options={countries}
                        name="country"
                        value={this.state.country}
                        onChange={this.handleChangeData}
                        label='Select Country'
                        placeholder='Select Country'
                    />
                </div>

                <div className='lg:w-96'>
                    <SelectInput name='ID' placeholder='Select State' label='State' 
                        options={this.state.states.map(state => {
                            return {
                                text: state,
                                value: state
                            }
                        })}
                        name="state"
                        value={this.state.state}
                        onChange={this.handleChangeData}
                        label='Select State'
                        placeholder='Select State'
                    />
                </div>
            </FieldGroup>
                        
            <FieldGroup title='Store Information'>
                <div className='lg:w-96'>
                    <TextInput placeholder='Enter online store name' label='Store name'
                        name="store"
                        value={this.state.store}
                        onChange={this.handleChangeData}
                    />
                </div>

                <div className='lg:w-96'>
                    <TextInput placeholder='Enter url of online store' label='Store url'
                        name="storeUrl"
                        value={this.state.storeUrl}
                        onChange={this.handleChangeData}
                    />
                </div>
            </FieldGroup>

            <div className='lg:w-96'>
                <FormattedInputSubmit>
                    <input type='submit' value='Create Merchant Account'/>
                </FormattedInputSubmit>
            </div>
        </form>


        let newMerchantAccount = <div className='w-full grid grid-cols-auto gap-4 mb-8 mt-16'>
                                                        
            <div className='lg:w-96 flex flex-row items-center gap-4'>
                <p className='text-xs text-gray-600 w-1/6'>Company</p>
                <p className='text-sm text-gray-600 bg-blue-100 rounded-lg px-4 py-2'>{this.state.merchantAccount.companyName}</p>
            </div>

            <div className='lg:w-96 flex flex-row items-center gap-4'>
                <p className='text-xs text-gray-600 w-1/6'>Store name</p>
                <p className='text-md text-gray-600 bg-blue-100 rounded-lg px-4 py-2'>{this.state.merchantAccount.store}</p>
            </div>

            <div className='lg:w-96 flex flex-row items-center gap-4'>
                <p className='text-xs text-gray-600 w-1/6'>Store ID</p>
                <p className='text-sm text-gray-600 bg-blue-100 rounded-lg px-4 py-2'>{this.state.merchantAccount.storeId}</p>
            </div>

            <div className='lg:w-96 flex flex-row items-center gap-4'>
                <p className='text-xs text-gray-600 w-1/6'>Store URL</p>
                <p className='text-md text-gray-600 bg-blue-100 rounded-lg px-4 py-2'>{this.state.merchantAccount.storeUrl}</p>
            </div>

            <div className='lg:w-96 flex flex-row items-center pt-6'>
                <p className='text-xl text-gray-600 text-center rounded-lg px-4 py-2'>"We will contact you on further actions on your registration!"</p>
            </div>
            
        </div>

        return(
            <div>
                {!this.state.merchantAccountCreated ? 
                <Container title='Register Merchant'>
                    {formMembers}
                </Container>
                
                : 
                <Container title='Merchant Account Created'>
                    {newMerchantAccount}
                </Container>}
            </div>
        );
    }
}

class RegisterMerchant extends React.Component {
    constructor(props){
        super(props)
        this.handleSaveMerchantAccount = this.handleSaveMerchantAccount.bind(this)
    }

    async handleSaveMerchantAccount(event){

        event.preventDefault()

        console.log(this.props.data.companyName)

        let {status, msg, newMerchant} = await caseManageMerchants.createMerchantAccount({
            companyName: this.props.data.companyName,
            email: this.props.data.email,
            firstName: this.props.data.firstName,
            middleName: this.props.data.middleName,
            lastName: this.props.data.lastName,
            address: this.props.data.address,
            country: this.props.data.country,
            state: this.props.data.state,
            phoneNumber: this.props.data.phoneNumber,
            registrationNumber: this.props.data.registrationNumber,
            store: this.props.data.store,
            storeUrl: this.props.data.storeUrl
        })

        if(status === 'error') {
            if(!msg) msg = 'Error'
            this.props.onTriggerErrorMessage(msg)
        } else {
            this.setState({
                merchantAccountCreated: true,
                merchantAccount: newMerchant
            })
        } 
    }

    render() {
        console.log(this.props.data)
        return (
            <Container title='Register merchant'>
                <MerchantForm onSaveMerchant={this.handleSaveMerchantAccount} onChangeData={this.props.onChangeData} key={this.props.data.id} {...this.props.data} />
            </Container>
        );
    }
}

let RegisterMerchantWithData = withParams(withMerchantHelpers(RegisterMerchant))

export {RegisterMerchantWithData as RegisterMerchant}