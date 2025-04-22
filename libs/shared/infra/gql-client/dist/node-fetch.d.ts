type Fetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
/**
 * `fetch` from node doesn't support agent, but `node-fetch` does
 */
export declare const nodeFetch: Fetch;
export {};
