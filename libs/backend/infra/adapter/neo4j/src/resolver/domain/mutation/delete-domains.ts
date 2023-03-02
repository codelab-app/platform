import type { GraphQLRequestContext } from '@codelab/backend/abstract/types'
import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import type { DeleteInfo } from '@codelab/shared/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'
import { Repository } from '../../../infra'
import { domainNotFoundError } from '../validation/domain.error'

export const deleteDomains: IFieldResolver<
  unknown,
  GraphQLRequestContext,
  { id: string },
  Promise<DeleteInfo>
> = async (_, { id }, { req }) => {
  const Domain = await Repository.instance.Domain

  const domains = await Domain.find({
    where: { id },
    selectionSet: `{
      app {
        id
      }
      name
     }`,
  })

  const domain = domains[0]

  if (!domain) {
    throw domainNotFoundError
  }

  // await validateDomainAuth(req, domain.app.id)

  const res = await vercelApis.domain.deleteDomain(domain.name)

  // await handleAPIError(res, 'deleteDomain - Vercel')

  return Domain.delete({
    where: { name: domain.name },
  })
}
