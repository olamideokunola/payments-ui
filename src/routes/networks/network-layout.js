import { Link, NavLink, Outlet } from 'react-router-dom';
import { Container } from '../../components/container';


function ButtonLink({ to, text }) {

    let activeClassName = "p-2 rounded-xl text-white text-center font-bold bg-gray-600 w-full";
    let inActiveClassName = 'p-2 rounded-xl text-gray-50 font-light text-center bg-gray-300 w-full';

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive ? activeClassName : inActiveClassName
            }>
            <button><p className='tracking-wider'>{text}</p></button>
        </NavLink>
    )
}


export default function NetworkLayout({ title, paymentContractLink, stableCoinLink }) {



    return (
        <div>
            <h1 className='text-center font-light tracking-widest mt-4 text-2xl'>{title}</h1>
            <div className=''>
                <div className='mx-8 mt-4 flex flex-row justify-between bg-gray-300 rounded-xl text-blue-600 text-md'>
                    <ButtonLink to={paymentContractLink} text={"Payment Contract"} />
                    <ButtonLink to={stableCoinLink} text={"Stable Coins"} />
                </div>

                <Outlet />
            </div>
        </div>

    )
}