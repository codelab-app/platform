import { DomainOGM, GraphQLRequestContext, vercelApis } from '@codelab/backend'
import { CreateDomainMutationInput } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { v4 } from 'uuid'
import { handleRestError } from '../../utils/handleRestError'
import { domainExist } from '../domain.error'
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

    const res = await vercelApis.domain.add(name)
    const body = await res.json()

    if (res.status === 409) {
      throw domainExist
    }

    handleRestError(res, body, 'addDomain - Vercel')

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
