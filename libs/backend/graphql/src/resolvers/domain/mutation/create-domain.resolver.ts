import { DomainOGM } from '@codelab/backend/adapter/neo4j'
import { vercelApis } from '@codelab/backend/adapter/vercel'
import { GraphQLRequestContext } from '@codelab/backend/application'
import { CreateDomainMutationInput } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils'
import { v4 } from 'uuid'
import { handleAPIError } from '../../utils/handleAPIError'
import { domainExists } from '../domain.error'
import { validateDomainAuth } from '../domain.validation'

export const createDomain: IFieldResolver<
  any,
  GraphQLRequestContext,
  { input: CreateDomainMutationInput }
> = async (_, args, { req }) => {
  try {
    const {
      input: { appId, name },
    } = args

    await validateDomainAuth(req, appId)

    const res = await vercelApis.domain.addDomain(name)
    const body = await res.json()

    if (res.status === 409) {
      throw domainExists
    }

    handleAPIError(res, body, 'addDomain - Vercel')

    const domainOgm = await DomainOGM()

    const { domains } = await domainOgm.create({
      input: [
        {
          name,
          id: v4(),
          app: { connect: { where: { node: { id: appId } } } },
        },
      ],
    })

    return domains[0]
  } catch (err) {
    console.log({ err })
    throw err
  }
}
