import type { GraphQLRequestContext } from '@codelab/backend/abstract/types'
import {
  domainSelection,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import type { ICreateDomainDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { connectNode } from '@codelab/shared/data'
import type { IFieldResolver } from '@graphql-tools/utils'
import { v4 } from 'uuid'
import { domainExistsError } from '../domain.error'

export const createDomains: IFieldResolver<
  unknown,
  GraphQLRequestContext,
  { input: ICreateDomainDTO },
  Promise<OGM_TYPES.CreateDomainsMutationResponse>
> = async (_, args, { req }) => {
  console.log(args)

  const {
    input: { appId, name },
  } = args

  // await validateDomainAuth(req, appId)

  const res = await vercelApis.domain.addDomain(name)

  if (res.status === 409) {
    throw domainExistsError
  }

  // await handleAPIError(res, 'addDomain - Vercel')

  const Domain = await Repository.instance.Domain

  return Domain.create({
    selectionSet: `{
        domains {
          ${domainSelection}
        }
      }`,
    input: [
      {
        name,
        id: v4(),
        app: connectNode(appId),
      },
    ],
  })
}
