import type { SdkError } from '@auth0/nextjs-auth0/errors'
import type { SessionData } from '@auth0/nextjs-auth0/types'
import type { Nullable } from '@codelab/shared/abstract/types'

import { Auth0Client } from '@auth0/nextjs-auth0/server'
import { get } from 'env-var'
import { NextResponse } from 'next/server'

/**
 * Using direct env-var access instead of getEnv due to edge dependency constraints
 */
export const auth0Instance = new Auth0Client({
  appBaseUrl: get('NEXT_PUBLIC_WEB_HOST').required().asString(),
  authorizationParameters: {
    audience: get('AUTH0_AUDIENCE').required().asString(),
  },
  beforeSessionSaved: async (session, idToken) => {
    return {
      ...session,
      user: {
        ...session.user,
      },
    }
  },
  clientId: get('AUTH0_CLIENT_ID').required().asString(),
  clientSecret: get('AUTH0_CLIENT_SECRET').required().asString(),
  domain: get('AUTH0_DOMAIN').required().asString(),
  onCallback: async (
    error: Nullable<SdkError>,
    context: { returnTo?: string },
    session: Nullable<SessionData>,
  ) => {
    if (error) {
      return NextResponse.redirect(
        new URL(
          `/error?error=${error.message}`,
          get('NEXT_PUBLIC_WEB_HOST').required().asString(),
        ),
      )
    }

    /**
     * Only do this in development
     */
    if (get('SETUP_DEV_AFTER_AUTH0_LOGIN').asBool()) {
      /**
       * Cannot call fetchWithAuth since session is not created yet
       */
      void (await fetch(
        get('API_ENDPOINT_ADMIN_SETUP_DEV').required().asString(),
        {
          body: JSON.stringify({}),
          headers: {
            Authorization: `Bearer ${session?.tokenSet.accessToken}`,
            // 'X-ID-TOKEN': session?.user['idToken'] ?? '',
          },
          method: 'POST',
        },
      ))

      return NextResponse.redirect(
        new URL(
          context.returnTo || '/apps',
          get('NEXT_PUBLIC_WEB_HOST').required().asString(),
        ),
      )
    }

    /**
     * Create user in our neo4j database
     */
    if (process.env['NEXT_PUBLIC_WEB_HOST']?.includes('codelab.app')) {
      void (await fetch(get('API_ENDPOINT_USER_SAVE').required().asString(), {
        body: JSON.stringify({}),
        headers: {
          Authorization: `Bearer ${session?.tokenSet.accessToken}`,
          // 'X-ID-TOKEN': session?.user['idToken'] ?? '',
        },
        method: 'POST',
      }))

      return NextResponse.redirect(
        new URL(
          context.returnTo || '/apps',
          get('NEXT_PUBLIC_WEB_HOST').required().asString(),
        ),
      )
    }

    return NextResponse.redirect(
      new URL(
        context.returnTo || '/apps',
        get('NEXT_PUBLIC_WEB_HOST').required().asString(),
      ),
    )
  },
  secret: get('AUTH0_SECRET').required().asString(),
  session: {},
  signInReturnToPath: '/apps',
})
