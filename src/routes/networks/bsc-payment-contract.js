import { Link, NavLink, Outlet } from 'react-router-dom';
import { Container, LightContainer } from '../../components/container'
import { networks } from '../../app.config';

function HistoryItem({ date, address, quantity, symbol }) {
    return (
        <div className='bg-white rounded-lg w-full px-4 py-2 flex flex-row items-center justify-center'>
            {/* <div className='w-12 h-12 bg-gray-200 flex flex-col justify-center items-center text-white rounded-lg'>OUT</div> */}
            <div className='flex flex-col p-2'>
                <div className='flex flex-row justify-between items-center mb-2'>
                    <p className='font-light text-xl'>{date}</p>
                    <p className='text-3xl'>{quantity}<span className='text-sm'>{symbol}</span></p>
                </div>
                <p className='text-xs text-right font-light'>{address}</p>
            </div>
        </div>
    )
}


export default function BscPaymentContract({ title }) {

    let contractNumber = networks.bscTestnet.PaymentContract.address

    return (
        <div className="p-4 flex flex-col items-center">
            <LightContainer>
                <h2 className='text-xs font-bold tracking-wider'>Payment Contract Address</h2>
                <div className='bg-white mt-2 py-4 rounded-lg flex flex-col items-center w-full'>
                    <p className='text-xs font-light'>{contractNumber}</p>
                </div>
            </LightContainer>

            <LightContainer>
                <h2 className='text-xs font-bold tracking-wider'>Admin Account</h2>
                <div className='bg-white mt-2 py-4 px-4 rounded-lg flex flex-col items-center w-full'>
                    <p className='text-xs font-light'>{contractNumber}</p>
                    <section>
                        <label className='mb-0 text-xs mt-4 text-center' for="account">NEW ACCOUNT</label>
                        <input className='border-2 px-4 py-1 mt-0 mb-4 w-full bg-gray-100 rounded-md' type='text' name="account"></input>
                    </section>
                    <button className='bg-blue-600 text-white px-4 py-2 rounded-lg'>Change Admin</button>
                </div>
            </LightContainer>


            <div className='bg-gray-300 w-screen rounded-3xl mt-4 pb-8 mb-0 px-4 flex flex-col'>
                <LightContainer>
                    <h2 className='text-xs font-bold tracking-wider mb-4'>Transaction History</h2>
                    <div className='flex flex-col gap-4'>
                        <HistoryItem date="20th Jan 2022" quantity="-100" symbol="BNB" address={contractNumber} />
                        <HistoryItem date="20th Jan 2022" quantity="-100" symbol="BNB" address={contractNumber} />
                        <HistoryItem date="20th Jan 2022" quantity="-100" symbol="BNB" address={contractNumber} />
                        <HistoryItem date="20th Jan 2022" quantity="-100" symbol="BNB" address={contractNumber} />

                    </div>

                </LightContainer>

            </div>


        </div>
    )
}



let networks = {
    Bsc: {
        paymentContractAddress: "",
    },
    Cronos: {
        paymentContractAddress: "",
    }
}