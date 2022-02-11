import React from 'react'


import { Container } from '../components/container';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { ListView } from '../components/FormComponents';
import { withLoadedData } from '../components/hocs';
import { RegisterMerchant } from './merchant/registerMerchant'
import { EditMerchant } from './merchant/editMerchant';
import { ViewMerchant } from './merchant/viewMerchant'
import { MerchantsPayments } from './merchant/merchantsPayments';

import { caseManageMerchants } from '../services';

class MerchantsHome extends React.Component{
    render() {
        return(
            <div className=''>
                <div className='mx-4 mt-4 flex flex-row gap-6 bg-gray-300 rounded-md px-2 p-2'>
                    <Link to="/merchants/new">
                        <button className='py-1 border-b-2 hover:border-blue-600 text-blue-600 text-xs'>Register Merchant</button>
                    </Link>
                    <Link to="/merchants/merchant-payments">
                        <button className='py-1 border-b-2 hover:border-blue-600 text-blue-600 text-xs'>Merchant Payments</button>
                    </Link>
                    <Link to="/merchants">
                        <button className='py-1 border-b-2 hover:border-blue-600 text-blue-600 text-xs'>Merchants</button>
                    </Link>
                </div>
               
                <Outlet/>
            </div>
        );
    }
}

class Merchants extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        let displayHeader = () => {
            return <div>
                <div className="hidden text-blue-600 text-sm lg:grid grid-cols-12 gap-6 font-normal items-center pt-2 pb-2 border-blue-200 border-b-2">
                    <p className="">ID</p>
                    <p className="col-span-2">Company name</p>
                    <p className="col-span-1">Store name</p>
                    <p className="col-span-2">Store url</p>
                    <p className="col-span-3">Store id</p>
                    <p className="col-span-2">Email</p>
                    <p className="col-span-1">Phone</p>
                </div> 
            </div>
        }
        let displayRow = (merchant, index) => {
            return <div>
                {/* Small Screen */}

                {console.log(merchant)}

                {/* Large Screen */}
                <div key={index} className="hidden lg:grid grid-cols-12 gap-6 font-normal items-center pt-4 pb-6 border-blue-200 border-b-2">
                    <p className="">{merchant.id}</p>
                    <p className="col-span-2">{<NavLink className='text-blue-600 hover:text-blue-800 font-bold' to={`/merchants/${merchant.id}`}>{merchant.companyName}</NavLink>}</p>
                    <p className="col-span-1">{merchant.store}</p>
                    <p className="col-span-2">{merchant.storeUrl}</p>
                    <p className="col-span-3">{merchant.storeId}</p>
                    <p className="col-span-2">{merchant.email}</p>
                    <p className="col-span-1">{merchant.phoneNumber}</p>
                    {/* <p className="">{<Link to={`/merchants/${merchant.id}`}><button className="bg-blue-600 rounded text-white px-2 py-1 text-sm">Edit</button></Link>}</p> */}
                </div>
            </div>
        }

        let actionBar =  (
            <div>
                <Link to="/merchants/new"><button className="bg-gray-400 text-white rounded px-2">New merchant</button></Link>
            </div>
        )

        let merchants =  this.props.data && this.props.data.merchants ? this.props.data.merchants : []
        console.log(this.props)

        return(
            <Container title='Merchants'> 
                <ListView 
                    // headers={['ID', 'Email', 'First name', 'Last name', 'Roles', 'Authorizations', 'Edit']} 
                    items={this.props.data && this.props.data.merchants ? this.props.data.merchants : []} itemsPerPage={5}
                    displayHeader={displayHeader}
                    displayRow={displayRow}
                    >

                </ListView>
            </Container>
        );
    }
    
} 

let MerchantsWithLoadedData = withLoadedData(Merchants, async () => await caseManageMerchants.getMerchants())

export { 
    MerchantsWithLoadedData as Merchants, 
    MerchantsPayments, 
    MerchantsHome, 
    RegisterMerchant, 
    ViewMerchant, 
    EditMerchant 
}