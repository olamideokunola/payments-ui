
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
      _tradePrice
      _traderEmail
      _timestamp
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
const GET_TRADES_FILTERED = gql`
  query GetTrades($searchParams: String) {
    tradeSearch(text: $searchParams){
      id
      amount
      _tradeId
      _stableCoinSymbol
      _tradePrice
      _traderEmail
      _timestamp
      vendorName
    }
  }
`


const GET_STABLECOINS = gql`
query GetStableCoins {
  stableCoinEntities{
    id
    _symbol
    _address
    isDefault
    isActive
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

  constructor(options) {
    super()
    this.client = options.client

    this.k = 1
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

  fromWei(amtInWei) {
    return web3.utils.fromWei(amtInWei, "ether")
    return amtInWei
  }

  calculatePrice(_fiatAmount, _stableCoinAmount) {
    return (Number(_fiatAmount) * 1.1) / Number(this.fromWei(_stableCoinAmount.toString()),)
  }

  getTradeQuantity(swap) {

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

  async getTrades(searchParams) {
    console.log('search params are ', searchParams)

    let trades
    let result

    let failureResponse = { code: 200, success: false, message: 'Loading trades failed!' }

    if (!searchParams || (searchParams === '')) {

      result = await this.client
        .query(GET_TRADES)
        .toPromise();

      console.log(`in get trades`)
      console.log(result)

      trades = result.data.tradeEntities.map(tr => {
        return {
          ...tr,
          amount: this.fromWei(tr.amount),
          _tradePrice: this.fromWei(tr._tradePrice),
          vendorName: tr.swap.payment.vendorEntity.name
        }
      })

      if (!result.data || !result.data.tradeEntities) return failureResponse

    } else {
      // For search
      result = await this.client
        .query(GET_TRADES_FILTERED, { searchParams: `${searchParams}:*` })
        .toPromise();

      console.log('result is', result)

      trades = result.data.tradeSearch.map(tr => {
        return {
          ...tr,
          amount: this.fromWei(tr.amount),
          _tradePrice: this.fromWei(tr._tradePrice)
        }
      })

      if (!result.data || !result.data.tradeSearch) return failureResponse

    }

    return { code: 200, success: true, message: 'Trades loaded!', trades }

  }


  async getCountries() {
    try {

    } catch (e) {
      console.error(e)
      return null
    }
  }

  async getItems(QUERY, getQueryResult, formatResult) {

    const result = await this.client
      .query(QUERY)
      .toPromise();

    console.log(`in get query items`, result)

    let { itemEntities, failureMessage, noItemsMessage, successMessage } = await getQueryResult(result)

    if (!result.data || !itemEntities) return { code: 200, success: false, message: failureMessage }
    if (itemEntities.length === 0) return { code: 200, success: true, message: noItemsMessage }

    // console.log(`in get query items entities are `, itemEntities)

    let items = await itemEntities.map(formatResult)

    // console.log(`in get query formatted items are `, items)

    return { code: 200, success: true, message: successMessage, items }
  }

  async getStableCoins() {

    // console.log('before items loaded')
    this.k++

    // alert(`START: k is: ${this.k}`)

    // first call back gets query result, second gets formats the results
    let result = await this.getItems(GET_STABLECOINS, (result) => {
      // alert(`MID1: k is: ${this.k}`)
      return {
        itemEntities: result.data.stableCoinEntities,
        failureMessage: 'Get stable coins failed!',
        noItemsMessage: 'No stable coins!',
        successMessage: 'StableCoinsLoaded'
      }
    }, (sc) => {
      // alert(`MID2: k is: ${this.k}`)
      return {
        ...sc,
        address: sc._address,
        symbol: sc._symbol
      }
    })

    // alert(`END: k is: ${this.k}`)
    // console.log(`in getStableCoins`, result)
    // alert(`result is ${Object.keys(result)}`)
    // alert(`result message is ${result.message}`)
    return result
  }

}

export { dataAccessor, IndexingServerDataAccessor }