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
const UPDATE_MERCHANT_ACCOUNT = gql`
    mutation updateMerchantAccount ($merchantData: MerchantAccountInput!) {
        updateMerchantAccount (merchantData: $merchantData) {
            merchant {
                id
                email
                firstName
                middleName
                lastName
                address 
                country
                companyName
                state
                phoneNumber
                registrationNumber
                store
                storeUrl
              }
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
            country
            roles {
                name
            }
        }
    }
`
const GET_USER_ACCOUNT = gql`
    query UserAccount($id: ID!) {
        userAccount(id: $id) {
            code
            success
            message
            userData {
                id
                email
                firstName
                middleName
                lastName
                address
                phoneNumber
                country
                roles {
                    name
                }
            }  
        }
    }
`

const GET_ROLES = gql`
    query Roles {
        roles {
            name
        }
    }
`

const CREATE_EMPLOYEE_USER_BKP = gql`
    mutation createEmployeeUser ($email: String!, $firstName: String!, $middleName: String!, $lastName: String!, $address: String!, $country: String!, $phoneNumber: String!, $roles: [String!]) {
        createEmployeeUser(email: $email, firstName: $firstName, middleName: $middleName, lastName: $lastName, address: $address, country: $country, phoneNumber: $phoneNumber, roles: $roles){
            firstName
            middleName
            lastName
            address
            country
            email
            phoneNumber
            roles {
                name
            }
        }
    }
`

const CREATE_EMPLOYEE_USER = gql`
    mutation createEmployeeUser ($userData: UserAccountInput!) {
        createEmployeeUser(userData: $userData){
            code
            success
            message
            userData {
                firstName
                middleName
                lastName
                address
                country
                email
                phoneNumber
                roles {
                    name
                }
            }
        }
    }
`

const SAVE_EMPLOYEE_USER = gql`
    mutation saveEmployeeUser ($userData: UserAccountInput!) {
        saveEmployeeUser(userData: $userData){
            code
            success
            message
            userData {
                firstName
                middleName
                lastName
                address
                country
                email
                phoneNumber
                roles {
                    name
                }
            }
        }
    }
`

const GET_MERCHANTS = gql`
    query Merchants {
        merchants {
            code
            success
            message
            merchants {
                id
                companyName
                registrationNumber
                firstName
                middleName
                lastName
                phoneNumber
                email
                address
                country
                state
                storeId
                storeUrl
                store
            }
        }
    }
`

const GET_MERCHANT = gql`
    query Merchant ($id: ID!) {
        merchant(id: $id) {
            code
            success
            message
            merchant {
                id
                companyName
                registrationNumber
                firstName
                middleName
                lastName
                phoneNumber
                email
                address
                country
                state
                storeId
                store
                storeUrl
            }
        }
    }
`
const GET_TRADERS = gql`
    query Traders {
        traders {
            code
            success
            message
            traders {
                id
                firstName
                middleName
                lastName
                idPath
                phoneNumber
                email
                address
                country
            }
        }
    }
`

const GET_TRADER = gql`
    query Trader($id: ID!){
        trader (id: $id) {
            code
            success
            message
            trader {
                id
                firstName
                middleName
                lastName
                idPath
                phoneNumber
                email
                address
                country
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
        // console.log(JSON.stringify(data, null, 2));

        let filtered = data.results.map(state => state.Subdivision_Name)
        
        // console.log(filtered)

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

    async updateMerchantAccount(merchantData){
        try {
            console.log(`in updateMerchantAccount`)
            console.log(merchantData)
            // alert(merchantInfo)
            const result = await this.client
                .mutation(UPDATE_MERCHANT_ACCOUNT, {merchantData})
                .toPromise()

            console.log(`merchant account updated`)
            console.log(result )

            if(!result.data.updateMerchantAccount) return

            return result.data.updateMerchantAccount
        } catch(e){
            console.error(e)
            return null
        }
    };

    async getRoles(){
        const result = await this.client
            .query(GET_ROLES)
            .toPromise();
        console.log(`in get Roles`)
        console.log(result)

        return result.data.roles
    }

    async createEmployeeUser(userData) {

        try {
            console.log(`in createEmployeeUser of off-chain dataaccessor`)
            alert(`in createEmployeeUser`)
            console.log(userData)
            alert(userData.email)

            const result = await this.client
                .mutation(CREATE_EMPLOYEE_USER, {userData})
                .toPromise()

            console.log(`employee user created`)
            console.log(result)
            alert(`employee user created`)
            alert(result.data.createEmployeeUser.email)

            if(!result.data || !result.data.createEmployeeUser) return

            return result.data.createEmployeeUser
        
        } catch(e){
            console.error(e)
            return null
        }
    }

    async getEmployeeUser(id){
        try {
            console.log(`in getEmployeeUser`)
            console.log(id)

            const result = await this.client
                .query(GET_USER_ACCOUNT, {id})
                .toPromise()

            console.log(`employee user created`)
            console.log(result )

            if(!result.data || !result.data.userAccount) return

            return result.data.userAccount
        
        } catch(e){
            console.error(e)
            return null
        }
    }

    async saveEmployeeUser(userData) {

        try {
            console.log(`in saveEmployeeUser`)
            console.log(userData)

            const result = await this.client
                .mutation(SAVE_EMPLOYEE_USER, {userData})
                .toPromise()

            console.log(`employee user saved`)
            console.log(result )

            if(!result.data || !result.data.saveEmployeeUser) return

            return result.data.saveEmployeeUser
        
        } catch(e){
            console.error(e)
            return null
        }
    }
    
    async getMerchants(){
        const result = await this.client
            .query(GET_MERCHANTS)
            .toPromise();
        console.log(`in get merchants`)
        console.log(result)

        if(!result.data || !result.data.merchants) return

        return result.data.merchants
    }

    async getMerchant(id){
        const result = await this.client
            .query(GET_MERCHANT, {id})
            .toPromise();
        console.log(`in get merchant`)
        console.log(result)

        if(!result.data || !result.data.merchant) return

        return result.data.merchant
    }

    async getTraders(){
        const result = await this.client
            .query(GET_TRADERS)
            .toPromise();
        console.log(`in get traders`)
        console.log(result)

        if(!result.data || !result.data.traders) return

        return result.data.traders
    }

    async getTrader(id){
        const result = await this.client
            .query(GET_TRADER, {id})
            .toPromise();
        console.log(`in get trader`)
        console.log(result)

        if(!result.data || !result.data.trader) return

        return result.data.trader
    }

}

export { OffChainDataAccessor } 