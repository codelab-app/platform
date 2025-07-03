'use server'

import { getEnv } from '@codelab/shared-config-env'

interface M2MTokenResponse {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  access_token: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  expires_in: number
  // eslint-disable-next-line @typescript-eslint/naming-convention
  token_type: string
}

interface M2MTokenCache {
  expiresAt: number
  token: string
}

// Simple in-memory cache for M2M tokens
let tokenCache: M2MTokenCache | null = null

/**
 * Get a machine-to-machine access token from Auth0
 * Includes caching to avoid unnecessary token requests
 */
export const getM2MToken = async (): Promise<string> => {
  // Check if we have a valid cached token
  // if (tokenCache && tokenCache.expiresAt > Date.now()) {
  //   return tokenCache.token
  // }

  const env = getEnv()
  const domain = env.auth0.domain
  const clientId = env.auth0.m2mClientId
  const clientSecret = env.auth0.m2mClientSecret
  const audience = env.auth0.audience
  // Request new token
  const tokenUrl = `https://${domain}/oauth/token`

  console.log('M2M Token Request:', {
    audience,
    clientId: clientId ? `${clientId.substring(0, 5)}...` : 'missing',
    domain,
    tokenUrl,
  })

  try {
    const response = await fetch(tokenUrl, {
      body: JSON.stringify({
        audience,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        client_id: clientId,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        client_secret: clientSecret,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        grant_type: 'client_credentials',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (!response.ok) {
      const errorText = await response.text()

      throw new Error(`Failed to get M2M token: ${errorText}`)
    }

    const data: M2MTokenResponse = await response.json()

    console.log('Token reponse data', data)

    // Cache the token with a buffer of 5 minutes before expiry
    tokenCache = {
      expiresAt: Date.now() + (data.expires_in - 300) * 1000,
      token: data.access_token,
    }

    return data.access_token
  } catch (error) {
    console.error('M2M Token Error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })
    throw error
  }
}

/**
 * Clear the token cache
 */
export const clearCache = async (): Promise<void> => {
  tokenCache = null
}
