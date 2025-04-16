import type { SdkError } from '@auth0/nextjs-auth0/errors'
import type { SessionData } from '@auth0/nextjs-auth0/types'
import type { Nullable } from '@codelab/shared-abstract-types'

import { Auth0Client } from '@auth0/nextjs-auth0/server'
import { getEnv } from '@codelab/shared-config-env'
import { get } from 'env-var'
import { NextResponse } from 'next/server'

export const auth0Instance = new Auth0Client({
  appBaseUrl: getEnv().auth0.baseUrl,
  authorizationParameters: {
    audience: getEnv().auth0.audience,
  },
  beforeSessionSaved: async (session, idToken) => {
    return {
      ...session,
      user: {
        ...session.user,
      },
    }
  },
  clientId: getEnv().auth0.clientId,
  clientSecret: getEnv().auth0.clientSecret,
  domain: getEnv().auth0.domain,
  onCallback: async (
    error: Nullable<SdkError>,
    context: { returnTo?: string },
    session: Nullable<SessionData>,
  ) => {
    if (error) {
      return NextResponse.redirect(
        new URL(`/error?error=${error.message}`, getEnv().auth0.baseUrl),
      )
    }

    /**
     * Only do this in development
     */
    if (get('SETUP_DEV_AFTER_AUTH0_LOGIN').asBool()) {
      /**
       * Cannot call fetchWithAuth since session is not created yet
       */
      void (await fetch(getEnv().endpoint.admin.setupDev, {
        body: JSON.stringify({}),
        headers: {
          Authorization: `Bearer ${session?.tokenSet.accessToken}`,
          // 'X-ID-TOKEN': session?.user['idToken'] ?? '',
        },
        method: 'POST',
      }))

      return NextResponse.redirect(
        new URL(context.returnTo || '/apps', getEnv().auth0.baseUrl),
      )
    }

    /**
     * Create user in our neo4j database
     */
    if (process.env['NEXT_PUBLIC_WEB_HOST']?.includes('codelab.app')) {
      void (await fetch(getEnv().endpoint.user.save, {
        body: JSON.stringify({}),
        headers: {
          Authorization: `Bearer ${session?.tokenSet.accessToken}`,
          // 'X-ID-TOKEN': session?.user['idToken'] ?? '',
        },
        method: 'POST',
      }))

      return NextResponse.redirect(
        new URL(context.returnTo || '/apps', getEnv().auth0.baseUrl),
      )
    }

    return NextResponse.redirect(
      new URL(context.returnTo || '/apps', getEnv().auth0.baseUrl),
    )
  },
  secret: getEnv().auth0.secret,
  session: {},
  signInReturnToPath: '/apps',
})
