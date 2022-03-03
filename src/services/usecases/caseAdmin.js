export class CaseAdmin {
    constructor({ chainAccessor }){
        this.chainAccessor = chainAccessor
    }

    async setupArtifacts(provider, account, web3) {
        await this.chainAccessor.setupArtifacts(provider, account, web3)
    }

    async setStableCoin({address}) {
        return await this.chainAccessor.setStableCoin({address})
    }
}