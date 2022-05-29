import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from '@apollo/client';

const APIURL = `http://${process.env.REACT_APP_INDEXING_SERVER_HOST}:8000/subgraphs/name/cryptobankdev/paymentgraph`;

const client = new ApolloClient({  
    uri: APIURL,  
    cache: new InMemoryCache()
});

export { client, ApolloProvider, useQuery }