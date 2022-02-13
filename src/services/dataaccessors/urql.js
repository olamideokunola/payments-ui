import { createClient, defaultExchanges, subscriptionExchange } from '@urql/core';
import { getToken } from '../auth/tokenAccess'

console.log(process.env.REACT_APP_BACKEND_SERVER_HOST)

const client = createClient({
  url: `http://${process.env.REACT_APP_INDEXING_SERVER_HOST}:8000/subgraphs/name/cryptobankdev/paymentgraph`,
  exchanges: defaultExchanges,
});

const clientBe = createClient({
  url: `http://${process.env.REACT_APP_BACKEND_SERVER_HOST}:4000/graphql`,
  exchanges: defaultExchanges,
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});

export { client, clientBe }