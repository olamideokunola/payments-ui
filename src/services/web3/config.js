import Web3 from "web3";
import HDWalletProvider from '@truffle/hdwallet-provider'

// let web3Provider
// let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

console.log(__dirname)

console.log(`${process.env.REACT_APP_PRIVATE_KEY}`)
let provider =  new HDWalletProvider({
    privateKeys: [`${process.env.REACT_APP_PRIVATE_KEY}`], 
    providerOrUrl: `https://data-seed-prebsc-1-s1.binance.org:8545/` //'http://localhost:8545' //
})

let web3 = new Web3(provider)
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// let accounts

// if (window.ethereum) {
//     web3Provider = window.ethereum;
//     try {
//         // Request account access
//         window.ethereum.enable()
//         .then(web3 = new Web3(web3Provider))
//         console.log('Connected to Metamask')
//     } catch (error) {
//         // User denied account access...
//         console.error("User denied account access")
//     }
// }
// // Legacy dapp browsers...
// else if (window.web3) {
//     web3Provider = window.web3.currentProvider;
// }
// // If no injected web3 instance is detected, fall back to Ganache
// else {
//     web3Provider = new Web3.providers.HttpProvider('http://localhost:8545') //"https://rpc.parastate.io:8545"); //'http://localhost:8545');
// }

// web3 = new Web3(web3Provider)   

// accounts = await web3.eth.getAccounts()

export { web3 } //, setupWeb3, web3Provider, accounts }