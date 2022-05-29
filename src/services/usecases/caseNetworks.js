export class CaseNetworks {
    constructor({ indexingServerDataAccessor, chainAccessor }){
        this.indexingServerDataAccessor = indexingServerDataAccessor
        this.chainAccessor = chainAccessor
    }

    async getStableCoins() {
        try {
            console.log('in getStableCoins of caseNetworks')
            return await this.indexingServerDataAccessor.getStableCoins()
        } catch (error) {
            console.log(error.message)
            return null
        }    
    }

    async disableStableCoin(stableSymbol) {
        console.log('in disableStableCoin')
        try {
            return await this.chainAccessor.disableStableCoin(stableSymbol)
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async enableStableCoin(stableSymbol) {
        console.log('in enableStableCoin of caseNetworks')
        try {
            return await this.chainAccessor.enableStableCoin(stableSymbol)
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async setStableCoinDefault(stableSymbol) {
        console.log('in setStableCoinDefault of caseNetworks')
        try {
            return await this.chainAccessor.setStableCoinDefault(stableSymbol)
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async addStableCoin({symbol, address}) {
        console.log('in addStableCoin of caseNetworks')
        try {
            return await this.chainAccessor.addStableCoin({symbol, address})
        } catch (error) {
            console.log(error)
            return null
        }
    }
}