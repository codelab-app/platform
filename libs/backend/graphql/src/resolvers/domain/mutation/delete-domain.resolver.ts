import { GraphQLRequestContext } from '@codelab/backend/application'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import { IFieldResolver } from '@graphql-tools/utils'
import { handleAPIError } from '../../utils/handleAPIError'
import { domainNotFoundError } from '../domain.error'
import { validateDomainAuth } from '../domain.validation'

export const deleteDomain: IFieldResolver<
  any,
  GraphQLRequestContext,
  { id: string }
> = async (_, { id }, { req }) => {
  try {
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

    await validateDomainAuth(req, domain.app.id)

    const res = await vercelApis.domain.deleteDomain(domain.name)

    await handleAPIError(res, 'deleteDomain - Vercel')

    return await Domain.delete({
      where: { name: domain.name },
    })
  } catch (err) {
    console.log({ err })
    throw err
  }
}
