import { DomainOGM } from '@codelab/backend/adapter/neo4j'
import { vercelApis } from '@codelab/backend/adapter/vercel'
import { GraphQLRequestContext } from '@codelab/backend/application'
import { IFieldResolver } from '@graphql-tools/utils'
import { ApolloError } from 'apollo-server-micro'
import { handleAPIError } from '../../utils/handleAPIError'
import { validateDomainAuth } from '../domain.validation'

export const deleteDomain: IFieldResolver<
  any,
  GraphQLRequestContext,
  { id: string }
> = async (_, { id }, { req }) => {
  try {
    const domainOgm = await DomainOGM()

    const domains = await domainOgm.find({
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
      new ApolloError('Domain not found')
    }

    await validateDomainAuth(req, domain.app.id)

    const res = await vercelApis.domain.deleteDomain(String(domain.name))
    const body = await res.json()

    handleAPIError(res, body, 'delete - Vercel')

    return await domainOgm.delete({
      where: { name: domain.name },
    })
  } catch (err) {
    console.log({ err })
    throw err
  }
}
