import { createClient, defaultExchanges, subscriptionExchange } from '@urql/core';
import { getToken } from '../auth/tokenAccess'

const client = createClient({
  url: 'http://localhost:8000/subgraphs/name/cryptobankdev/paymentgraph',
  exchanges: defaultExchanges,
});

const clientBe = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: defaultExchanges,
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});

export { client, clientBe }