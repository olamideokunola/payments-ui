import React from 'react'
import { TextInput, TextAreaInput, SelectInput, FormattedInputSubmit, ListView } from '../../components/FormComponents';
import { FieldGroup } from '../../components/FormComponents';

class MerchantForm extends React.Component {

    constructor(props){
        super(props)
        this.handleChangeData = this.handleChangeData.bind(this)
        this.handleSaveMerchant = this.handleSaveMerchant.bind(this)
    }

    async componentDidMount(){
        console.log(this.props)
    }

    async handleChangeData(event){
        this.props.onChangeData(event)
    }

    async handleSaveMerchant(event){
        event.preventDefault()
        this.props.onSaveMerchant(event)
    }

    render() {
        
        let country = this.props && this.props.countries ? this.props.countries.find(ctry => ctry.text === this.props.country) : ''
        let countryCode = country ? country.value : ''

        return <form className='flex flex-col gap-6' onSubmit={this.handleSaveMerchant}>
                <FieldGroup title='Company Information'>
                    <div className='lg:w-96'>
                        <TextInput placeholder='Enter your company name' label='Company' 
                            name="companyName"
                            value={this.props.companyName}
                            onChange={this.handleChangeData}
                        />
                    </div>

                    <div className='lg:w-96'>
                        <TextInput placeholder='Enter your company registration number' label='Registration number' 
                            name="registrationNumber"
                            value={this.props.registrationNumber}
                            onChange={this.handleChangeData}
                        />
                    </div>
                </FieldGroup>
                
                <FieldGroup title='Contact Person'>
                    <div className='lg:w-96'>
                        <TextInput placeholder='Enter your first name' label='First name of contact person' 
                            name="firstName"
                            value={this.props.firstName}
                            onChange={this.handleChangeData}
                        />
                    </div>

                    <div className='lg:w-96'>
                        <TextInput placeholder='Enter your middle name' label='Middle name of contact person'
                            name="middleName"
                            value={this.props.middleName}
                            onChange={this.handleChangeData}
                        />
                    </div>

                    <div className='lg:w-96'>
                        <TextInput placeholder='Enter your last name' label='Last name of contact person'
                            name="lastName"
                            value={this.props.lastName}
                            onChange={this.handleChangeData}
                        />
                    </div>
                </FieldGroup>
                
                <FieldGroup title="Contact Information">
                    <div className='lg:w-96'>
                        <TextInput placeholder='Enter phone number' label='Phone number'
                            name="phoneNumber"
                            value={this.props.phoneNumber}
                            onChange={this.handleChangeData}
                        />
                    </div>

                    <div className='lg:w-96'>
                        <TextInput placeholder='Enter email' label='Email'
                            name="email"
                            value={this.props.email}
                            type="email"
                            onChange={this.handleChangeData}
                        />
                    </div>
                </FieldGroup>

                <FieldGroup title='Location'>
                    <div className='lg:w-96'>
                        <TextAreaInput placeholder='Enter office address' label='Office Address'
                            name="address"
                            value={this.props.address}
                            onChange={this.handleChangeData}
                        />
                    </div>

                    <div className='lg:w-96'>
                        <SelectInput name='ID' placeholder='Select Country' label='Country' 
                            options={this.props.countries}
                            name="country"
                            value={this.props.country}
                            onChange={this.handleChangeData}
                            label='Select Country'
                            placeholder='Select Country'
                        />
                    </div>

                    <div className='lg:w-96'>
                        <SelectInput name='ID' placeholder='Select state' label='Select State' 
                            options={this.props.states ? this.props.states.map(state => {
                                return {
                                    text: state,
                                    value: state
                                }
                            }): []}
                            name="state"
                            value={this.props.state}
                            onChange={this.handleChangeData}
                        />
                    </div>
                </FieldGroup>
                            
                <FieldGroup title='Store Information'>
                    <div className='lg:w-96'>
                        <TextInput placeholder='Enter online store name' label='Store name'
                            name="store"
                            value={this.props.store}
                            onChange={this.handleChangeData}
                        />
                    </div>

                    <div className='lg:w-96'>
                        <TextInput placeholder='Enter url of online store' label='Store url'
                            name="storeUrl"
                            value={this.props.storeUrl}
                            onChange={this.handleChangeData}
                        />
                    </div>
                </FieldGroup>

                <div className='lg:w-96'>
                    <FormattedInputSubmit>
                        <input type='submit' value='Save Merchant'/>
                    </FormattedInputSubmit>
                </div>
            </form>
    }
}

export {MerchantForm, FieldGroup}