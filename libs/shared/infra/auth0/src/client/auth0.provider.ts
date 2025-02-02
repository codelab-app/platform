import { SdkError } from '@auth0/nextjs-auth0/errors'
import { Auth0Client } from '@auth0/nextjs-auth0/server'
import { SessionData } from '@auth0/nextjs-auth0/types'
import { getEnv } from '@codelab/shared/config/env'
import * as env from 'env-var'
import { NextResponse } from 'next/server'

export const auth0Instance = new Auth0Client({
  authorizationParameters: {
    audience: getEnv().auth0.audience,
  },
  appBaseUrl: getEnv().auth0.baseUrl,
  clientId: getEnv().auth0.clientId,
  clientSecret: getEnv().auth0.clientSecret,
  domain: getEnv().auth0.domain,
  secret: getEnv().auth0.secret,  
  session: {},
  async onCallback(
    error: SdkError | null,
    // type not exported by @auth0/nextjs-auth0
    context: { returnTo?: string },
    session: SessionData | null,
  ) {
    if (error) {
      return NextResponse.redirect(
        new URL(`/error?error=${error.message}`, getEnv().auth0.baseUrl),
      )
    }

    /**
     * Only do this in development
     */
    if (env.get('SETUP_DEV_AFTER_AUTH0_LOGIN').asBool()) {
      /**
       * Cannot call fetchWithAuth since session is not created yet
       */
      await fetch(getEnv().endpoint.admin.setupDev, {
        body: JSON.stringify({}),
        headers: {
          Authorization: `Bearer ${session?.tokenSet.accessToken}`,
          //'X-ID-TOKEN': session.idToken ?? '',
        },
        method: 'POST',
      })

      return NextResponse.redirect(
        new URL(context.returnTo || '/', getEnv().auth0.baseUrl),
      )
    }

    /**
     * Create user in our neo4j database
     */
    if (process.env['NEXT_PUBLIC_WEB_HOST']?.includes('codelab.app')) {
      await fetch(getEnv().endpoint.user.save, {
        body: JSON.stringify({}),
        headers: {
          Authorization: `Bearer ${session?.tokenSet.accessToken}`,
          // 'X-ID-TOKEN': session.idToken ?? '',
        },
        method: 'POST',
      })
    }

    return NextResponse.redirect(
      new URL(context.returnTo || '/', getEnv().auth0.baseUrl),
    )
  },
})
