import { GraphQLRequestContext } from '@codelab/backend/application'
import {
  domainSelection,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import { CreateDomainMutationInput } from '@codelab/shared/abstract/codegen'
import { connectNode } from '@codelab/shared/data'
import { IFieldResolver } from '@graphql-tools/utils'
import { v4 } from 'uuid'
import { handleAPIError } from '../../utils/handleAPIError'
import { domainExistsError } from '../domain.error'
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

    // create domain on vercel
    const res = await vercelApis.domain.addDomain(name)

    if (res.status === 409) {
      throw domainExistsError
    }

    await handleAPIError(res, 'addDomain - Vercel')

    // create domain on ogm
    const Domain = await Repository.instance.Domain

    const { domains } = await Domain.create({
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

    return domains[0]
  } catch (err) {
    console.log({ err })
    throw err
  }
}
