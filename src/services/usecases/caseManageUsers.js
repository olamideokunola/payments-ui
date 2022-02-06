class CaseManageUsers {

    constructor({offChainDataAccessor}){
        this.offChainDataAccessor = offChainDataAccessor
    }

    getUserAccounts(){
        try {
            let userAccounts = this.offChainDataAccessor.getUserAccounts()
            return userAccounts
        } catch (e) {
            console.error(e)
        }
    }

}

export { CaseManageUsers }