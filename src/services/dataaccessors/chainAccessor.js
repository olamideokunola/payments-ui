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
        console.log('web3 is: ', this.web3)

        this.account = account
        console.log("account is ",  this.account)

        this.StableCoinForPayment = await this.setupContract(this.StableCoinForPaymentDefinition, provider)
        console.log('stable coin payment is', this.StableCoinForPayment)
        
        this.PaymentContract = await this.setupContract(this.PaymentContractDefinition, provider)
        console.log('paymentContract is: ', this.PaymentContract)
        
        this.PancakeRouter = await this.setupContract(this.PancakeRouterDefinition, provider)
        // console.log(this.PancakeRouter)
        
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

        let paymentContract = await this.PaymentContract.deployed()
        // this.paymentContract = await PaymentContract.deployed()
        // console.log(this.PaymentContract)
        // console.log(paymentContract)

        // console.log(this.account)
        // console.log(address)
        // console.log(paymentContract.address)
        // let gasEstimate = await paymentContract.setStableCoin.estimateGas(address)
        let gasEstimate = await paymentContract.stableCoin.estimateGas()
        console.log(gasEstimate)

        let stableCoin = await paymentContract.stableCoin()
        // console.log(stableCoin)

        // gasEstimate = await paymentContract.setStableCoin.estimateGas(address, {from: this.account})
        
        let response = await paymentContract.setStableCoin(address, {from: this.account})
        
        // console.log(gasEstimate)
        console.log(response.logs[0].args)
        
        return response
    }

    async setupPaymentContract() {
        this.PaymentContractDefinition.artifact.setProvider(web3.currentProvider)
        console.log('networks are ', await this.PaymentContractDefinition.artifact)

        this.paymentContract = await this.PaymentContractDefinition.artifact.deployed()
        this.accounts = await web3.eth.getAccounts()        

        console.log('payment contract address', this.paymentContract.address)
    }

    async disableStableCoin(stableSymbol) {

        console.log('in disableStableCoin of chainAccessor')
        
        await this.setupPaymentContract()        

        let gasEstimate = await this.paymentContract.disableStableCoin.estimateGas(stableSymbol)
        console.log('disableStableCoin ', gasEstimate)

        let response = await this.paymentContract.disableStableCoin(stableSymbol, {from: this.account})

        console.log(response)
        
        if (!response.receipt) return { success: false, message: 'Error connecting to contract, try again'}
        
        let events = response.logs.map(l => l.event) 
        if (!events.includes('disabledStableCoin')) return { success: false, message: 'stable coin not disabled'}

        return response
    }

    async enableStableCoin(stableSymbol) {
        console.log('in enableStableCoin of chainAccessor')
        
        await this.setupPaymentContract()

        let gasEstimate = await this.paymentContract.enableStableCoin.estimateGas(stableSymbol)
        console.log('enableStableCoin ', gasEstimate)

        let response = await this.paymentContract.enableStableCoin(stableSymbol, {from: this.account})

        console.log(response)
        
        if (!response.receipt) return { success: false, message: 'Error connecting to contract, try again'}
        
        let events = response.logs.map(l => l.event) 
        if (!events.includes('enabledStableCoin')) return { success: false, message: 'stable coin not enabled'}

        return response
    }

    async setStableCoinDefault(stableCoinSymbol) {
        console.log('in setStableCoinDefault of chainAccessor')

        await this.setupPaymentContract()

        let gasEstimate = await this.paymentContract.setStableCoinDefault.estimateGas(stableCoinSymbol)
        console.log('setStableCoinDefault ', gasEstimate)

        let response = await this.paymentContract.setStableCoinDefault(stableCoinSymbol, {from: this.account})

        console.log(response)
        
        if (!response.receipt) return { success: false, message: 'Error connecting to contract, try again'}
        
        let events = response.logs.map(l => l.event)
        // if (events.includes('enabledStableCoin')) return { success: false, message: 'stable coin not enabled'}

        return response
    }

    async addStableCoin({symbol, address}) {
        console.log('in addStableCoin of chainAccessor')
        
        await this.setupPaymentContract()

        let gasEstimate = await this.paymentContract.addStableCoin.estimateGas(symbol, address)
        console.log('addStableCoin ', gasEstimate)

        let response = await this.paymentContract.addStableCoin(symbol, address, {from: this.account})

        console.log(response)
        
        if (!response.receipt) return { success: false, message: 'Error connecting to contract, try again'}
        
        let events = response.logs.map(l => l.event)
        // if (events.includes('enabledStableCoin')) return { success: false, message: 'stable coin not enabled'}

        return response
    }


}