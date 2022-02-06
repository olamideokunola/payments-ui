import { gql } from '@urql/core';

const GET_COUNTRIES = gql`
    query Countries {
        countries{
            id
            name
            code
        }
    }
`

const GET_IDTYPES = gql`
    query IdTypes {
        idTypes{
            id
            description
        }
    }
`

const CREATE_TRADER_ACCOUNT = gql`
    mutation createTraderAccount ($email: String!, $firstName: String!, $middleName: String!, $lastName: String!, $address: String!, $idTypeId: Int!, $idPath: String!, $country: String!) {
        createTraderAccount(email: $email, firstName: $firstName, middleName: $middleName, lastName: $lastName, address: $address, idTypeId: $idTypeId, idPath: $idPath, country: $country ){
            firstName
            middleName
            lastName
        }
    }
`

const CREATE_MERCHANT_ACCOUNT = gql`
    mutation createMerchantAccount ($email: String!, $firstName: String!, $middleName: String!, $lastName: String!, $address: String!, $country: String!, $companyName: String!, $state: String!, $phoneNumber: String!, $registrationNumber: String!, $store: String!, $storeUrl: String!) {
        createMerchantAccount(email: $email, firstName: $firstName, middleName: $middleName, lastName: $lastName, address: $address, country: $country, companyName: $companyName, state: $state, phoneNumber: $phoneNumber, registrationNumber: $registrationNumber, store: $store, storeUrl: $storeUrl ){
            firstName
            middleName
            lastName
            store
            storeUrl
            companyName
            storeId
        }
    }
`

const GET_DEFAULT_CURRENCY = gql`
    query DefaultCurrency($country: String!) {
        defaultCurrency(country: $country){
            symbol
            description
        }
    }
`

const GET_USERS_ACCOUNTS = gql`
    query UserAccounts {
        userAccounts {
            id
            email
            firstName
            middleName
            lastName
            address
            phoneNumber
            roles {
                name
            }
        }
    }
`

class OffChainDataAccessor {
    constructor(options) {
        this.client = options.clientBe
    }

    async getUserAccounts(){
        const result = await this.client
            .query(GET_USERS_ACCOUNTS)
            .toPromise();
        console.log(`in get UserAccounts`)
        console.log(result)

        return result.data.userAccounts
    }

    async getCountries(){
        const result = await this.client
            .query(GET_COUNTRIES)
            .toPromise();
        console.log(`in get Countries`)
        console.log(result)

        return result.data.countries
    }

    async getIdTypes(){
        const result = await this.client
            .query(GET_IDTYPES)
            .toPromise();
        console.log(`in get id types`)
        console.log(result)

        if(!result.data)return

        return result.data.idTypes
    }

    async createTraderAccount(accountData){
        try {
            console.log(`in createTraderAccount`)
            console.log(accountData)
            alert(accountData)
            const result = await this.client
                .mutation(CREATE_TRADER_ACCOUNT, accountData)
                .toPromise()

            console.log(`account created`)
            console.log(result.data )

            return result.data.traderAccount
        } catch(e){
            console.error(e)
            return null
        }
    }

    async getDefaultCurrency(countryName){
        try {
            console.log(countryName)
            const result = await this.client
                .query(GET_DEFAULT_CURRENCY, {country: countryName})
                .toPromise()

            if(!result) return                
            console.log(`default currency gotten`)
            console.log(result)
            return result.data.defaultCurrency
        } catch (e) {
            console.error(e)
            return null
        }
    }

    async getStates (countryCode) {
        console.log(`in getStates countryCode is ${countryCode}`)
        const where = encodeURIComponent(JSON.stringify({
          "Country_Code": countryCode
        }));
        const response = await fetch(
          `https://parseapi.back4app.com/classes/Continentscountriescities_Subdivisions_States_Provinces?&order=Subdivision_Name&where=${where}`,
          {
            headers: {
              'X-Parse-Application-Id': '45xkmC9gmMyNc0KbHXxUV1VqxUZY72GUZB3drbnc', // This is your app's application id
              'X-Parse-REST-API-Key': 'WRAIqkFcF0ptlxBVrBbwXFepZx1x7Gz8K8Zzzs1K', // This is your app's REST API key
            }
          }
        );
        const data = await response.json(); // Here you have the data that you need
        console.log(JSON.stringify(data, null, 2));

        let filtered = data.results.map(state => state.Subdivision_Name)
        
        console.log(filtered)

        let states = data.results.map(state => state.Subdivision_Name)

        return states
    };

    async createMerchantAccount(merchantInfo){
        try {
            console.log(`in createMerchantAccount`)
            console.log(merchantInfo)
            // alert(merchantInfo)
            const result = await this.client
                .mutation(CREATE_MERCHANT_ACCOUNT, merchantInfo)
                .toPromise()

            console.log(`merchant account created`)
            console.log(result )

            if(!result.data.createMerchantAccount) return

            return result.data.createMerchantAccount
        } catch(e){
            console.error(e)
            return null
        }
    };
}

export { OffChainDataAccessor } 