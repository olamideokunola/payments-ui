import { Link, NavLink, Outlet } from 'react-router-dom';
import { Container } from '../../components/container';



function ButtonLink({ to, text }) {

    let activeClassName = "py-1 border-b-2 border-blue-600 text-blue-600 font-bold";
    let inActiveClassName = 'py-1 border-b-2 text-gray-400 font-light';

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


export default function NetworkHome({ }) {

    return (
        <div className=''>
            <h1 className='text-center text-gray-600 text-xs mt-4 text-thin tracking-widest'>NETWORK SETTINGS</h1>
            <div className='mx-4 mt-2 flex flex-row justify-around gap-6 rounded-md px-2 p-2 text-md'>
                <ButtonLink to="/networks/bsc" text={"Binance Smart Chain"} />
                <ButtonLink to="/networks/cronos" text={"Cronos BlockChain"} />
            </div>
            <Outlet />
        </div>
    )
}