import { Link, NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState, useCallback, useLayoutEffect } from 'react';

import { Container, LightContainer } from '../../components/container'
import { caseNetworks, caseAdmin } from '../../services/index'

import { withLocalProvider } from '../../components/hocWithLocalProvider'
import react from 'react';

function Segment({ title, children }) {
    return (
        <LightContainer>
            <h2 className='text-xs font-bold tracking-wider'>{title}</h2>
            <div className='bg-white mt-2 py-4 px-4 rounded-lg flex flex-col items-center w-full'>
                {children}
            </div>
        </LightContainer>
    )
}

function ActivateDeactivateButton({ handler, text }) {
    return (
        <button
            className='bg-gray-400 text-white text-xs px-3 py-1 tracking-wider rounded-lg'
            onClick={handler}>
            {text}
        </button>
    )
}

function StableCoinItem({ address, symbol, name, isActive, isDefault, onDisableStableCoin, onEnableStableCoin, onSetStableCoinAsDefault }) {

    // let activationButtonText = isActive ? "DEACTIVATE" : "ACTIVATE"

    let handleSetStableCoinAsDefault = () => {
        onSetStableCoinAsDefault(symbol)
    }

    let handleDisableStableCoin = () => {
        onDisableStableCoin(symbol)
    }

    let handleEnableStableCoin = () => {
        onEnableStableCoin(symbol)
    }

    // let activationButton = isActive ? <ActivateDeactivateButton handler={handleEnableStableCoin} text="ENABLE"/> : <ActivateDeactivateButton handler={handleDisableStableCoin} text='DISABLE'/>

    return (
        <div className='bg-white rounded-lg w-full px-4 py-2 flex flex-col items-center justify-center'>

            <div className='flex flex-col text-left justify-start mt-1 mb-3 pt-0 w-full'>
                <p className='text-sm font-light tracking-widest mb-0'>{symbol}</p>
                <p className='text-2xl text-blue-600 font-light mt-0'>{name}</p>
            </div>
            <p className='text-xs text-right font-light'>{address}</p>
            <div className='flex flex-row justify-end gap-4 mt-2 w-full'>
                {!isDefault && isActive && <button className='text-gray-400 text-xs tracking-wider'
                    onClick={handleSetStableCoinAsDefault}
                > SET AS DEFAULT</button>}
                {isActive ? <ActivateDeactivateButton handler={handleDisableStableCoin} text='DISABLE' /> : <ActivateDeactivateButton handler={handleEnableStableCoin} text="ENABLE" />}
            </div>
        </div>
    )
}

// w    
function BscStableCoins(props) {

    console.log('STARTING!!!!!!!!!!!!!!!!!')

    let [stableCoins, setStableCoins] = useState([])
    let [symbol, setSymbol] = useState('')
    let [address, setAddress] = useState('')
    let [defaultStableCoin, setDefaultStableCoin] = useState(null)
    let [disableStableCoinClickCount, setDisableStableCoinClickCount] = useState(0)
    let [enableStableCoinClickCount, setEnableStableCoinClickCount] = useState(0)
    let [stableCoinAsDefaultClickCount, setStableCoinAsDefaultClickCount] = useState(0)

    let [changingStatus, setChangingStatus] = useState(true)

    let setUpArtifacts = useCallback(async () => {
        console.log('network elements, ', { provider: props.data.provider, account: props.data.account, web3: props.data.web3 })
        await caseAdmin.setupArtifacts(props.data.provider, props.data.account, props.data.web3)
    }, [props.data.provider, props.data.account, props.data.web3])

    let getStableCoins = useCallback(async () => {
        const res = await caseNetworks.getStableCoins()
        const items = res.items
        console.log('items loaded, item 2 is: ', items[1].isActive)
        // alert(items[1].isActive)

        setStableCoins(() => [...items])
        setDefaultStableCoin(items.find(itm => itm.isDefault))
        setChangingStatus(false)

    })

    const refreshPage = () => {
        window.location.reload();
    }

    useEffect(() => {
        // if (changingStatus) {

        setUpArtifacts()
            .catch(console.error)

        getStableCoins()
            .catch(console.error)

        // }
    }, [])

    let handleDisableStableCoin = async (stableCoinSymbol) => {
        console.log('handleDisableStableCoin symbol is ', stableCoinSymbol)
        await caseNetworks.disableStableCoin(stableCoinSymbol)
        refreshPage()
        // setChangingStatus(true)
    }

    let handleEnableStableCoin = async (stableCoinSymbol) => {
        console.log('handleEnableStableCoin symbol is ', stableCoinSymbol)
        await caseNetworks.enableStableCoin(stableCoinSymbol)
        refreshPage()
        // setChangingStatus(true)
    }

    let handleSetStableCoinAsDefault = async (stableCoinSymbol) => {
        console.log('handleSetStableCoinAsDefault symbol is ', stableCoinSymbol)
        await caseNetworks.setStableCoinDefault(stableCoinSymbol)
        refreshPage()
    }

    let handleAddStableCoin = async (e) => {
        e.preventDefault()
        console.log('handleAddStableCoin symbol and address are ', {symbol, address})
        await caseNetworks.addStableCoin({symbol, address})
        refreshPage()
    }

    let handleChangeSymbol = (e) => {
        setSymbol(e.target.value)
    }

    let handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    if (changingStatus) {
        return <h1> loading </h1>
    }

    console.log('ENDING!!!!!!!!!!!!!!!!!')

    return (
        <div className="p-4 flex flex-col items-center">
            {/* {stableCoins && stableCoins.length} */}
            {disableStableCoinClickCount}
            <Segment title="Add new stable coin">
                <form className='flex flex-col justify-center' onSubmit={handleAddStableCoin}>
                    <section>
                        <label className='mb-0 text-xs mt-4 text-center' >SYMBOL</label>
                        <input className='border-2 px-4 py-1 mt-0 mb-4 w-full bg-gray-100 rounded-md' type='text' name="symbol" value={symbol} onChange={handleChangeSymbol}></input>
                    </section>
                    <section>
                        <label className='mb-0 text-xs mt-4 text-center' >ADDRESS</label>
                        <input className='border-2 px-4 py-1 mt-0 mb-4 w-full bg-gray-100 rounded-md text-xs' type='text' name="address" value={address}  onChange={handleChangeAddress}></input>
                    </section>
                    <button className='bg-blue-600 text-white px-4 py-2 rounded-lg'>ADD STABLE COIN</button>
                </form>
            </Segment>

            <Segment title="Default Stable Coin">
                <div className='flex flex-row justify-between items-start w-full px-4'>
                    <p className='text-sm font-light'>
                        {defaultStableCoin && defaultStableCoin.symbol}
                    </p>
                    <p className='text-2xl text-blue-600 font-light'>
                        {defaultStableCoin && defaultStableCoin.symbol}
                    </p>
                </div>
                <p className='text-xs font-light'>{defaultStableCoin && defaultStableCoin.address}</p>
            </Segment>

            <div className='bg-gray-300 w-screen rounded-3xl mt-4 pb-8 mb-0 px-4 flex flex-col'>
                <LightContainer>

                    <h2 className='text-xs font-bold tracking-wider mb-4'>Available Stable Coins</h2>
                    <div className='flex flex-col gap-8 w-full'>
                        {/* <StableCoinItem symbol="USDT" name="USD TETHER" address="0x785d253B3147A1Bd2712a098Ea9331E3A8C380B4" />
                        <StableCoinItem symbol="BUSD" name="BINANCE USD" address="0x785d253B3147A1Bd2712a098Ea9331E3A8C380B4" />
                        <StableCoinItem symbol="USDC" name="USDC" address="0x785d253B3147A1Bd2712a098Ea9331E3A8C380B4" />
                        <StableCoinItem symbol="NGNT" name="BITCOIN" address="0x785d253B3147A1Bd2712a098Ea9331E3A8C380B4" /> */}
                        {(stableCoins && stableCoins.length > 0) && stableCoins.map((sc, index) => <StableCoinItem key={index} symbol={sc.symbol} name={sc.symbol} onDisableStableCoin={handleDisableStableCoin} onEnableStableCoin={handleEnableStableCoin} onSetStableCoinAsDefault={handleSetStableCoinAsDefault} address={sc.address} isActive={sc.isActive} isDefault={sc.isDefault} disableStableCoinClickCount={disableStableCoinClickCount} enableStableCoinClickCount={enableStableCoinClickCount} />)}
                    </div>

                </LightContainer>

            </div>
        </div>
    )
}


let BscStableCoinsWithLocalProvider = withLocalProvider(BscStableCoins)

export { BscStableCoinsWithLocalProvider as BscStableCoins }