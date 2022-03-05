class CaseAuthentication {

    constructor({authService, offChainDataAccessor}){
        this.authService = authService
        this.offChainDataAccessor = offChainDataAccessor
    }

    getToken(){
        try {
            let token = this.authService.getToken()
            return token
        } catch (e) {
            console.error(e)
        }
    }

    getUserData(){
        try {
            let userData = this.authService.getUserData()
            console.log('user data is')
            console.log(userData)
            return userData
        } catch (e) {
            console.error(e)
        }
    }

    async signIn({email, password, twoFaCode}){
        try {
            let userData = await this.authService.signIn({email: email.trim(), password, twoFaCode})
            return userData
        } catch (e) {
            console.error(e)
        }
    }

    signOut(){
        try {
            this.authService.signOut()
        } catch (e) {
            console.error(e)
        }
    }

    async registerUser({email, phone, password, country}){
        let userData = await this.authService.registerUser({email, phone, password, country})
        if(!userData) return
        return userData
    }

    async resetPassword(email){
        let response = await this.authService.resetPassword(email)
        if(!response) return
        return response
    }

    async getCountries(){
        try {

            let countries = await this.offChainDataAccessor.getCountries()
            if(!countries) return

            console.log(countries)
            return countries

        } catch(e) {
            console.error(e)
        }
    }

    async getIdTypes(){
        try {

            let idTypes = await this.offChainDataAccessor.getIdTypes()
            if(!idTypes) return

            console.log(idTypes)
            return idTypes

        } catch(e) {
            console.error(e)
        }
    }

    async createTraderAccount(accountData) {
        try {
            console.log(accountData)
            let traderAccount = await this.offChainDataAccessor.createTraderAccount(accountData)
            
            if(!traderAccount) return
            console.log(traderAccount)

            return traderAccount
        
        } catch (e) {
            console.error(e)
            return
        }
    }

    async verifyPasswordResetToken(token){
        try {
            console.log(token)

            let { expired, valid, email } = await this.authService.verifyPasswordResetToken(token)
            
            console.log(expired)
            console.log(valid)

            if(!valid || !expired) {
                return { valid, msg: 'Token invalid or expired' }
            }
            
            return { valid, msg: 'Token valid', email }
        } catch (error) {
            console.error(error)
            return
        }
    }

    async changePassword(token, email, password){
        try {
            console.log(password)

            let changed = await this.authService.changePassword(token, email, password)

            return changed
        } catch (error) {
            console.error(error)
            return
            
        }
    }
    async changeNewPassword(email, password){
        try {
            console.log(password)

            let changed = await this.authService.changeNewPassword(email, password)

            return changed
        } catch (error) {
            console.error(error)
            return
            
        }
    }

}

export { CaseAuthentication }