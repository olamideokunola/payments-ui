import { ApolloClient, InMemoryCache } from '@apollo/client';

const APIURL = `http://${process.env.REACT_APP_INDEXING_SERVER_HOST}:8000/subgraphs/name/cryptobankdev/paymentgraph`;

export const client = new ApolloClient({  
    uri: APIURL,  
    cache: new InMemoryCache()
});