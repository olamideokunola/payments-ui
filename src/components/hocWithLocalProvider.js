import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider';
import { 
    getConnectionStatus,
    getChainId,
    getAccount,
    onConnect,
    onDisconnect,
    onChainChanged,
    onAccountsChanged,
    onMessage
} from '../web3/config'

import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider'
console.log(`${process.env.REACT_APP_PRIVATE_KEY}`)

let localProvider =  new HDWalletProvider({
    privateKeys: [`${process.env.REACT_APP_PRIVATE_KEY}`], 
    providerOrUrl: 'http://localhost:8545' //`https://data-seed-prebsc-1-s1.binance.org:8545/`
})

export function withLocalProvider(Component){
    return ((props) => {
        let [connected, setConnected] = useState(false) 
        let [chainId, setChainId] = useState('None') 
        let [account, setAccount] = useState(localProvider.addresses[0]) 
        let [accounts, setAccounts] = useState(localProvider.addresses) 
        let [web3, setWeb3] = useState(new Web3(localProvider)) 
        let [message, setMessage] = useState('No message')
        let [provider, setProvider] = useState(localProvider) 
        
        let connectionStatus = connected ? <p>True</p> : <p>False</p>
        console.log('In withLocalProvider, ', localProvider)
    
        useEffect(() => {        
            async function detectProvider() {

                setProvider(localProvider)
                // setWeb3(new Web3(localProvider))
                setAccount(localProvider.addresses[0])
                setAccounts(localProvider.addresses)

                console.log('In useEffect, account is ', accounts)

                if (localProvider) {
                    console.log('Local provider detected', localProvider)
                    console.log('initialized: ', await localProvider.initialized)
                    // startApp(provider); // initialize your app
                    // setProvider(provider)

                    // onConnect(provider, setConnected, setWeb3)
                    // onDisconnect(provider, setConnected)
                    // onChainChanged(provider, setChainId, setWeb3)
                    // onAccountsChanged(provider, setChainId)
                    // onMessage(provider, setMessage)
        
                    // getConnectionStatus(provider, setConnected)
                    // getChainId(setChainId)
                    // getAccount(setAccount)
        
                } else {
                    console.log('Please start local blockchain');
                }
            }

            detectProvider()
    
            return () => {
                if(provider) {
                    // provider.removeListener('connect');
                    // provider.removeListener('disconnect');
                    // provider.removeListener('chainChanged');
                    // provider.removeListener('accountsChanged');
                    // provider.removeListener('message');
                }
            }
        }, []);

        let currentAccount = null
    
        let handleAccountsChanged = (accounts) => {
            if (accounts.length === 0) {
                // MetaMask is locked or the user has not connected any accounts
                console.log('Please connect to MetaMask.');
            } else if (accounts[0] !== currentAccount) {
                currentAccount = accounts[0];
                console.log(currentAccount)
                // Do any other work!
            }
            
        async function handleSetupArtifacts() {
        }
            console.log(`in setup artifacts of hoc`)
        }
    
        function handleConnectAccounts() {
            console.log(`In handleConnectAccounts`)
            provider
                .request({ method: 'eth_requestAccounts' })
                .then(handleAccountsChanged)
                .catch((err) => {
                    if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                        console.log('Please connect to Local Block Chain.');
                    } else {
                        console.error(err);
                    }
                })
        }
    
        return <Component 
                    data={{ provider,connectionStatus, chainId, account, web3, message }} 
                    test="testing message" 
                    onConnectAccounts={handleConnectAccounts} 
                    {...props}
                />
    })   
    //return props => <MetamaskWrapper {...props}/>
}
