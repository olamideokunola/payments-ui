
import { web3 } from '../web3/config'

import { gql } from '@urql/core';
import { client } from './urql'
import { pipe, subscribe } from 'wonka';
import { empty } from '@apollo/client';
var EventEmitter = require('events');


const SWAPS = gql`
  query Swaps {
    swapEntities{
      id
      _balance
      _tokenAmount
      _amountInUSD
      _tokenSymbol
      _stableCoinSymbol
      _transactionId
      payment {
        _amountInUSD
        _transactionId
        _fiatSymbol
        _fiatAmount
        vendorEntity{
          id
          name
        }
      }
    }
  }
`;

const PAYMENTS = gql`
  query GetSwaps {
    paymentEntities{
        id
        _amountInUSD
        _transactionId
        _fiatSymbol
        _fiatAmount
        vendorEntity{
          id
          name
        }
    }
  }
`;

const GET_TRADES = gql`
  query GetTrades {
    tradeEntities{
      id
      amount
      _stableCoinSymbol
      swap {
        id
        amountOut
        _tokenAmount
        _amountInUSD
        _tokenSymbol
        _transactionId
        payment{
          _amountInUSD
          _transactionId
          _fiatSymbol
          _fiatAmount
          vendorEntity{
            id
            name
          }
        }
      }
    }
  }
`

function dataAccessor() {

    function loadPendingSwaps(setResult) {
      const { unsubscribe } = pipe(
        client.query(SWAPS, { id: 'swaps' }),
        subscribe(result => {
          alert(Object.keys(result.data)); // { data: ... }
          alert(result.data.swapEntities.length)
          let res = result.data.swapEntities.map((ent) => {
            alert(ent.id)
            return {
                id: ent.id,
                price: 500,
                quantity: ent._tokenAmount,
                merchantId: ent.payment.vendorEntity.id,
                stableCoinSymbol: ent._tokenSymbol
            }
          })
          setResult(res)
        })
      );
    }

    function loadPendingPayments() {

    }

    return {
      loadPendingPayments
    }

}

class IndexingServerDataAccessor extends EventEmitter {
  
  constructor(options){
    super()
    this.client = options.client
  }

  subscribeToPendingTrades(handler) {
    const { unsubscribe } = pipe(
      client.query(SWAPS, { id: 'swaps' }),
      subscribe(result => {
        // alert(Object.keys(result.data)); // { data: ... }
        // alert(result.data.swapEntities.length)

        let res = result.data.swapEntities.map((ent) => {
          // alert(`id is ${ent.id}`)
          return {
              id: ent.id,
              price: 500,
              quantity: ent._tokenAmount,
              // merchantId: ent.payment.vendorEntity.id,
              stableCoinSymbol: ent._tokenSymbol
          }
        })

        this.trades = res
        this.emit('pendingTradesUpdated')        
      })
    );
  }

  fromWei(amtInWei){
    return web3.utils.fromWei(amtInWei, "ether")
    return amtInWei
  }

  calculatePrice(_fiatAmount, _stableCoinAmount) {
    return (Number(_fiatAmount) * 1.1)/Number(this.fromWei(_stableCoinAmount.toString()),)
  }

  getTradeQuantity(swap){
    
  }

  async loadPendingTrades() {
    const result_1 = await client
      .query(SWAPS, { id: 'swaps' })
      .toPromise();

    return result_1.data.swapEntities.map((ent, index) => {
      console.log(`Payment ${index} is: `)
      console.log(ent)
      return {
          id: ent.id,
          price: this.calculatePrice(ent.payment._fiatAmount, ent._amountInUSD),
          quantity: this.fromWei(ent._balance.toString()),
          merchantId: ent.payment.vendorEntity.id,
          stableCoinSymbol: ent._stableCoinSymbol,
      }
    })

  }

  async getTrades(){
    const result = await this.client
        .query(GET_TRADES)
        .toPromise();
    console.log(`in get trades`)
    console.log(result)

    if(!result.data || !result.data.tradeEntities) return { code: 200, success: false, message: 'Loading trades failed!' }

    let trades =  result.data.tradeEntities.map(tr => {
      return {
        ...tr,
        amount: this.fromWei(tr.amount)
      }
    })

    return { code: 200, success: true, message:'Trades loaded!', trades} 
  }

  async getCountries(){
    try {
        
    } catch(e) {
        console.error(e)
        return null
    }
  }

}

export { dataAccessor, IndexingServerDataAccessor }