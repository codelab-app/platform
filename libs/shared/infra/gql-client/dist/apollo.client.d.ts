import { ApolloClient } from '@apollo/client';
declare enum Environment {
    Browser = "browser",
    Node = "node"
}
interface CreateApolloClientOptions {
    environment?: Environment;
}
export declare const createApolloClient: ({ environment, }?: CreateApolloClientOptions) => ApolloClient<import('@apollo/client').NormalizedCacheObject>;
/**
 * Lazy load so we create the client when the environment is known
 */
export declare const nodeApolloClient: () => ApolloClient<import('@apollo/client').NormalizedCacheObject>;
export declare const browserApolloClient: () => ApolloClient<import('@apollo/client').NormalizedCacheObject>;
export {};
