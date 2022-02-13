export class CaseManageMerchants {
    constructor({ offChainDataAccessor, chainAccessor }){
        this.offChainDataAccessor = offChainDataAccessor
        this.chainAccessor = chainAccessor
    }

    async getStates(countryCode) {
        console.log(`in getStates of caseManageMerchants country code is ${countryCode}`)
        let states = await this.offChainDataAccessor.getStates(countryCode)

        if(!states) return

        console.log(states)

        return states
    }

    async createMerchantAccount(merchantInfo){
        console.log(`in createMerchantAccount`)
        
        this.prepareSaveOrUpdate(merchantInfo)

        let newMerchant = await this.offChainDataAccessor.createMerchantAccount(merchantInfo)

        if(!newMerchant)return {
            status: "error",
            msg:"Merchant not created successfully!",
            newMerchant: ''
        } 

        // register on blockchain
        await this.chainAccessor.registerMerchantInPaymentContract({
            companyName: newMerchant.companyName, 
            storeId: newMerchant.storeId
        })

        return {
            status: "success",
            msg:"Merchant creation successful!",
            newMerchant
        }
    }

    prepareSaveOrUpdate(merchantInfo) {
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

    }

    async updateMerchantAccount(merchantInfo){
        console.log(`in updateMerchantAccount`)

        this.prepareSaveOrUpdate(merchantInfo)

        let merchant = await this.offChainDataAccessor.updateMerchantAccount(merchantInfo)

        if(!merchant)return {
            status: "error",
            msg:"Merchant not updated successfully!",
            merchant: ''
        } 

        return {
            status: "success",
            msg:"Merchant update successful!",
            merchant
        }
    }


    async getMerchants(){

        console.log(`in getMerchants of caseManageMerchants`)
        let response = await this.offChainDataAccessor.getMerchants()

        if(!response) return

        let { code, status, message, merchants} = response

        console.log(merchants)

        return { code, status, message, merchants} 

    }

    async getMerchant(id){
        console.log(`in getMerchants of caseManageMerchants`)
        let response = await this.offChainDataAccessor.getMerchant(id)

        if(!response) return

        let { code, status, message, merchant} = response

        console.log(merchant)

        return { code, status, message, merchant} 

    }
}