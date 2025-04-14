import { get } from 'env-var'

export const REQUEST_TIMEOUT = 120000

const apiHost = get('NEXT_PUBLIC_API_HOSTNAME').required().asString()
const apiPort = get('NEXT_PUBLIC_API_PORT').required().asString()
const apiBasePath = get('NEXT_PUBLIC_BASE_API_PATH').required().asString()

export const apiUrl = new URL(apiBasePath, `${apiHost}:${apiPort}`).toString()

export const webUrl = get('NEXT_PUBLIC_WEB_HOST').required().asString()

export const ci = get('CI').default('false').asBool()

export const webBaseApiUrl = new URL(apiBasePath, webUrl).toString()
export const apiBaseUrl = new URL(apiBasePath, apiUrl).toString()

export const auth0Username = get('AUTH0_E2E_USERNAME').required().asString()
export const auth0Password = get('AUTH0_E2E_PASSWORD').required().asString()

/**
 * Used by `auth0` to store cookies for authentication, as well as mobx for storing element expanded states
 *
 * We can't use multiple storage states at once, so we need to use a single one https://github.com/microsoft/playwright/issues/14872
 */
export const storageStateFile = 'apps/web-e2e/.storage/storage-state.json'

/**
 * Video dir
 */
export const videoDir = 'apps/web-e2e/.videos'
