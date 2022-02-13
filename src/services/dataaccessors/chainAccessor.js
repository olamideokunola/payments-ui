import { PaymentContract } from "../contracts/artifacts"
import { web3 } from "../web3/config"

export class ChainAccessor {

    async init(){
        
    }
    
    async registerMerchantInPaymentContract({companyName, storeId}) {

        PaymentContract.setProvider(web3.currentProvider)

        this.paymentContract = await PaymentContract.deployed()
        this.accounts = await web3.eth.getAccounts()

        await this.paymentContract
            .registerANewVendor(companyName, storeId, {from: this.accounts[0]})
            .then(console.log('Merchant registered on blockchain'))
            .catch(err => {
                console.log(err)
            })
    }

}