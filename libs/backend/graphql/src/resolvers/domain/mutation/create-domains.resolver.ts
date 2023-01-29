import type { GraphQLRequestContext } from '@codelab/backend/abstract/types'
import {
  domainSelection,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'
import { domainExistsError } from '../domain.error'

export const createDomains: IFieldResolver<
  unknown,
  GraphQLRequestContext,
  { input: Array<OGM_TYPES.DomainCreateInput> },
  Promise<OGM_TYPES.CreateDomainsMutationResponse>
> = async (_, args, { req }) => {
  console.log(args)

  const { id, app, name } = args.input[0]!
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
    input: [{ id, name, app }],
  })
}
