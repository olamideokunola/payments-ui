export class CaseManageTraders {
    constructor({ offChainDataAccessor }){
        this.offChainDataAccessor = offChainDataAccessor
    }

    async getTraders(){

        console.log(`in getTraders of caseManageTraders`)
        // let traders = [
        //     {
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
        //     },
        //     {
        //         id: 2,
        //         firstName: 'Kenyan',
        //         middleName:'Test',
        //         address: "Kenyan's home",
        //         phoneNumber: "09090909090",
        //         lastName: 'User',
        //         idPath: '//Kenyanlicense',
        //         email: 'kenyan@cbt.com',
        //         country: 'Kenya',
        //         currencies: []
        //     }
        // ]
        // return { code: 200, success: true, message: 'Loaded', traders} 

        let response = await this.offChainDataAccessor.getTraders()

        if(!response) return

        let { code, status, message, traders} = response

        console.log(traders)

        return { code, status, message, traders} 

    }

    async getTrader(id){
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