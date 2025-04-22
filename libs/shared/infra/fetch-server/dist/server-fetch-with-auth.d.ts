/**
 * Need to be callback, otherwise import chain will call `auth0-server.provider.ts` which requires Next.js `request` to be present
 *
 * This occurs during testing context
 */
export declare const serverFetchWithAuth: (endpoint: string, init: RequestInit) => Promise<Response>;
