export class CaseRegisterMerchant {
    constructor({ offChainDataAccessor }){
        this.offChainDataAccessor = offChainDataAccessor
    }

    async getStates(countryCode) {
        console.log(`in getStates of caseRegisterMerchant country code is ${countryCode}`)
        let states = await this.offChainDataAccessor.getStates(countryCode)

        if(!states) return

        console.log(states)

        return states
    }

    async createMerchantAccount(merchantInfo){
        console.log(`in createMerchantAccount`)
        console.log(merchantInfo)

        if(!merchantInfo) return {
            status: "error",
            msg:"No data",
            newMerchant: ''
        }

        console.log(`number of fields is ${Object.keys(merchantInfo).length}`)
        let errorFields = []
        Object.keys(merchantInfo).forEach(key => {
            if(merchantInfo[key] === '') {
                errorFields.push(key)
            }
        })
    
        if(errorFields.length > 0) return {
            status: "error",
            msg:"Incomplete data entry!",
            newMerchant: ''
        }

        let newMerchant = await this.offChainDataAccessor.createMerchantAccount(merchantInfo)

        if(!newMerchant)return {
            status: "error",
            msg:"Merchant not created successfully!",
            newMerchant: ''
        } 

        return {
            status: "success",
            msg:"Merchant creation successful!",
            newMerchant
        }
    }
}