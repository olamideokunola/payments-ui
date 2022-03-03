import React from 'react'
import { useState } from 'react'

import { Container } from '../../components/container';
import { TextInput, TextAreaInput, SelectInput, FormattedInputSubmit, ListView } from '../../components/FormComponents';
import { FieldGroup } from '../../components/FormComponents';
import { withMetaMask } from '../../components/hocWithMetaMask';

import { caseAdmin } from '../../services';


function SetStableCoin(props) {

    let [address, setAddress] = useState('')

    let handleChangeAddress = (event) => {
        console.log(`${event.target.name} is ${event.target.value}`)
        setAddress(event.target.value)
    }

    let handleSetupArtifacts = async () =>  {
        // this.props.onSetupArtifacts()
        console.log(`in handleSetupArtifacts of payWithCrypto`)
        await caseAdmin.setupArtifacts(props.data.provider, props.data.account, props.data.web3)
    }

    let handleConnectAccounts = async () => {   
        props.onConnectAccounts()
        handleSetupArtifacts()
    }

    let handleSetStableCoin = async (event) => {
        event.preventDefault()
        console.log(event.target)
        //console.log(`${event.target} is ${event.target.value}`)
        let res = await caseAdmin.setStableCoin({address})

        console.log(res.logs[0].args)
    }

    return (
        <Container title='Set Stable Coin'> 
            
            <div>
                <p className='mt-6 text-blue-600'>Connect:</p>
                <button className='bg-blue-600 px-4 py-2 text-white rounded' onClick={handleConnectAccounts}>Connect</button>

                <p className='mt-6 text-blue-600'>Connection status:</p>
                {props.data.connectionStatus}

                <p className='mt-6 text-blue-600'>Current chain:</p>
                <p>{props.data.chainId}</p>

                <p className='mt-6 text-blue-600'>Current account:</p>
                <p>{props.data.account}</p>

            </div>
            
            <form onSubmit={handleSetStableCoin}>
                <FieldGroup title=''>
                    
                    <TextInput placeholder='Enter stable coin contract address' label='Address' 
                        name="address"
                        value={address}
                        onChange={handleChangeAddress}
                        required
                    />

                </FieldGroup>

                <div className="mt-4">
                    <FormattedInputSubmit>
                        <input type='submit' value='Set stable coin'></input>
                    </FormattedInputSubmit>
                </div>

            </form>
        </Container>
    );
}

let SetStableCoinWithMetamask = withMetaMask(SetStableCoin)

export { SetStableCoinWithMetamask as SetStableCoin }