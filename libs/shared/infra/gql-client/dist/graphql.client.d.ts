import { GraphQLClient } from 'graphql-request';
/**
 * In Node.js, the keepalive option you pass into graphql-request (or even the standard Fetch API)
 * is a browser-specific feature—part of the web spec that allows "keepalive" requests (such as
 * sending analytics beacons when a user closes a page). Node's underlying HTTP layer doesn't
 * use this parameter at all.
 */
export declare const graphqlClient: GraphQLClient;
