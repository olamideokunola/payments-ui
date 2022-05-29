export class CaseManageTrades {
    constructor({ indexingServerDataAccessor }){
        this.indexingServerDataAccessor = indexingServerDataAccessor
    }

    async getTrades(searchParams){

        console.log(`in getTrades of caseManageTrades`)

        let response = await this.indexingServerDataAccessor.getTrades(searchParams)

        if(!response) return

        let { code, status, message, trades} = response

        console.log(trades)

        return { code, status, message, trades} 

    }

    async getTrade(id){
        console.log(`in getTrader of caseManageTraders`)
        
        // let trader = {
        //         id: 1,
        //         firstName: 'Olamide',
        //         middleName:'Olawale',
        //         lastName: 'Okunola',
        //         address: "Olamide's home",
        //         phoneNumber: "09090909090",
        //         idPath: '//mylicense',
        //         email: 'olamideokunola@yahoo.com',
        //         country: 'Nigeria',
        //         currencies: []
        //     }
        
        // return { code: 200, success: true, message: 'Loaded', trader} 

        let response = await this.offChainDataAccessor.getTrader(id)

        if(!response) return

        let { code, status, message, trader} = response

        console.log(trader)

        return { code, status, message, trader} 

    }
}