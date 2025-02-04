import { SdkError } from '@auth0/nextjs-auth0/errors'
import { Auth0Client } from '@auth0/nextjs-auth0/server'
import { SessionData } from '@auth0/nextjs-auth0/types'
import { mapAuth0IdTokenToUserDto } from '@codelab/shared-domain-module/user'
import { Auth0IdToken, JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { Maybe, Nullable } from '@codelab/shared/abstract/types'
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
  signInReturnToPath: '/apps',
  session: {},
  async beforeSessionSaved(session, idToken) {
    return {
      ...session,
      user: {
        ...session.user,
        ...mapAuth0IdTokenToUserDto(session.user as Auth0IdToken),
      },
    }
  },
  async onCallback(
    error: Nullable<SdkError>,
    context: { returnTo?: string },
    session: Nullable<SessionData>,
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
      void (await fetch(getEnv().endpoint.admin.setupDev, {
        body: JSON.stringify({}),
        headers: {
          Authorization: `Bearer ${session?.tokenSet.accessToken}`,
          // 'X-ID-TOKEN': idToken ?? '',
          'X-USER-ID': session?.user['id'],
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
          // 'X-ID-TOKEN': idToken ?? '',
          'X-USER-ID': session?.user['id'],
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
})
