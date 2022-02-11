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

    async getStates(countryCode) {
        console.log(`in getStates of caseRegisterMerchant country code is ${countryCode}`)
        let states = await this.offChainDataAccessor.getStates(countryCode)

        if(!states) return

        console.log(states)

        return states
    }

    async getRoles(){
        console.log(`in get roles`)
        let roles = await this.offChainDataAccessor.getRoles()

        if(!roles) return
        
        console.log(roles)

        return roles
    }

    async getEmployeeRoles(){
        console.log(`in get roles`)
        let roles = await this.offChainDataAccessor.getRoles()

        if(!roles) return

        console.log(roles)

        let employeeRoles = roles.filter(role => role.name.match(/Employee/) || role.name.match(/admin/))

        console.log(`filtered items are: ${employeeRoles.length}`)
        console.log(employeeRoles)
        
        console.log(employeeRoles)

        return employeeRoles
    }

    async createEmployeeUser(userData) {

        console.log(`in createEmployeeUser`)

        let response = await this.offChainDataAccessor.createEmployeeUser(userData)

        if(!response) return {success: false, message: 'Failure for server!'}

        console.log(response)

        return response
    }

    async getEmployeeUser(id){
        console.log(`in getEmployeeUser`)

        let response = await this.offChainDataAccessor.getEmployeeUser(id)

        console.log(response)
        
        if(!response) return {success: false, message: 'Failure for server!'}

        console.log(response)

        return response
    }

    async saveEmployeeUser(userData) {

        console.log(`in saveEmployeeUser`)

        let response = await this.offChainDataAccessor.saveEmployeeUser(userData)

        if(!response) return {success: false, message: 'Failure for server!'}

        console.log(response)

        return response
    }
}

export { CaseManageUsers }