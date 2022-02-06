import { ApolloClient, InMemoryCache } from '@apollo/client';

const APIURL = "http://192.168.100.60:8000/subgraphs/name/cryptobankdev/paymentgraph";

export const client = new ApolloClient({  
    uri: APIURL,  
    cache: new InMemoryCache()
});