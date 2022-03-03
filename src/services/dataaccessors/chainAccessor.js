import { PaymentContract } from "../contracts/artifacts"
import { web3 } from "../web3/config"

export class ChainAccessor {

    constructor({
        PaymentContractDefinition,
        StableCoinForPaymentDefinition,
        PancakeRouterDefinition,
        tokensForPaymentDefinitions
    }) {
        this.PaymentContractDefinition = PaymentContractDefinition
        this.StableCoinForPaymentDefinition = StableCoinForPaymentDefinition
        this.PancakeRouterDefinition = PancakeRouterDefinition
        this.tokensForPaymentDefinitions = tokensForPaymentDefinitions

        this.PaymentContract = null
        this.StableCoinForPayment = null
        this.PancakeRouter = null
        this.tokensForPayment = null
        this.account = null
        this.web3 = null
    }

    async setupContract(contractDefinition, provider){
        try {
            contractDefinition.artifact.setProvider(provider)
            let contract = await contractDefinition.artifact.at(contractDefinition.address)

            if(!contract) return
            return contract
        } catch (err) {
            console.error(err)
        }
        
    }

    async setupArtifacts(provider, account, web3) {
        
        console.log(`contract artifacts setup`)

        this.web3 = web3
        console.log(this.web3)

        this.account = account
        console.log(this.account)
        
        this.PaymentContract = await this.setupContract(this.PaymentContractDefinition, provider)
        console.log(this.PaymentContract)

        this.StableCoinForPayment = await this.setupContract(this.StableCoinForPaymentDefinition, provider)
        console.log(this.StableCoinForPayment)
        
        this.PancakeRouter = await this.setupContract(this.PancakeRouterDefinition, provider)
        console.log(this.PancakeRouter)
        
        this.tokensForPayment = await Promise.all(this.tokensForPaymentDefinitions.map(async tokenDefinition => {
            return await this.setupContract(tokenDefinition, provider)
        }))
        console.log(this.tokensForPayment)
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

    async setStableCoin({address}) {
        
        // PaymentContract.setProvider(web3.currentProvider)

        let paymentContract = await this.PaymentContract
        // this.paymentContract = await PaymentContract.deployed()
        console.log(this.PaymentContract)
        console.log(paymentContract)

        console.log(this.account)
        console.log(address)
        console.log(paymentContract.address)
        // let gasEstimate = await paymentContract.setStableCoin.estimateGas(address)
        let gasEstimate = await paymentContract.stableCoin.estimateGas()
        console.log(gasEstimate)

        let stableCoin = await paymentContract.stableCoin()
        console.log(stableCoin)

        gasEstimate = await paymentContract.setStableCoin.estimateGas(address, {from: this.account})
        console.log(gasEstimate)

        let response = await paymentContract.setStableCoin(address, {from: this.account})
        
        console.log(response.logs[0].args)
        
        return response
    }

}