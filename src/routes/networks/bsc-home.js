import { Link, NavLink, Outlet } from 'react-router-dom';
import { Container } from '../../components/container';

import NetworkLayout from "./network-layout"

export default function BscHome({ }) {
    return (
        <>
            <NetworkLayout title="BSC Settings" paymentContractLink="payment-contract" stableCoinLink="stable-coins"/>
        </>

    )
}

