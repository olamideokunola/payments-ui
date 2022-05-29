import { Link, NavLink, Outlet } from 'react-router-dom';
import { Container } from '../../components/container';

import NetworkLayout from "./network-layout"

export default function CronosHome({ }) {
    return (
        <>
            <NetworkLayout title="Cronos Settings" paymentContractLink="payment-contract" stableCoinLink="stable-coins"/>
        </>

    )
}