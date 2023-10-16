import {
  ResourceGraphQlClient,
  ResourceRestClient,
} from '@codelab/frontend/domain/resource'
import { client } from '@codelab/frontend/infra/graphql'
import type { AuthGuardFragment } from '@codelab/shared/abstract/codegen'
import { IResourceType } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { getSdk } from './auth-guard-production.endpoints.graphql.gen'

const authGuardApi = getSdk(client)

export class AuthGuardProductionService {
  static getAuthGuardProduction = async (
    domain: string,
    pageUrl: string,
  ): Promise<Maybe<AuthGuardFragment>> => {
    const { authGuards } = await authGuardApi.GetAuthGuardProduction({
      domain,
      pageUrl,
    })

    if (!authGuards[0]) {
      console.error('Unable to load auth guard')
    }

    return authGuards[0]
  }

  static canActivate = async (authGuard: AuthGuardFragment) => {
    const resource = authGuard.resource
    const resourceConfig = JSON.parse(resource.config.data)
    const authGuardConfig = JSON.parse(authGuard.config.data)

    const resourceClient =
      resource.type === IResourceType.GraphQl
        ? new ResourceGraphQlClient(resourceConfig)
        : new ResourceRestClient(resourceConfig)

    const response = await resourceClient.fetch(authGuardConfig)

    return response
  }
}
