import { DomainOGM, GraphQLRequestContext, vercelApis } from '@codelab/backend'
import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { ApolloError } from 'apollo-server-micro'
import { handleRestError } from '../../utils/handleRestError'
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

    const res = await vercelApis.domain.delete(String(domain.name))
    const body = await res.json()

    handleRestError(res, body, 'delete - vercel')

    return await domainOgm.delete({
      where: { name: domain.name },
    })
  } catch (err) {
    console.log({ err })
    throw err
  }
}
