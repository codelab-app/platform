import {
  QueryElementGraphArgs,
  UpdateDomainMutationInput,
} from '@codelab/shared/abstract/codegen'
import { DOMAIN_GRAPHQL_ERROR_CODES } from '@codelab/shared/abstract/core'
import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { ApolloError, UserInputError } from 'apollo-server-micro'
import { vercelApis } from 'libs/backend/src/api/vercel/vercel'
import { DomainOGM } from 'libs/backend/src/infra'
import { v4 } from 'uuid'
import { handleRestError } from '../../utils/handleRestError'
import { domainExist } from '../domain.error'
import { validateDomainAuth } from '../domain.validation'

export const updateDomain: IFieldResolver<
  any,
  any,
  { input: UpdateDomainMutationInput }
> = async (_, args, { req }) => {
  try {
    const {
      input: { name, id },
    } = args

    await validateDomainAuth(req, String(id))

    const domainOgm = await DomainOGM()
    const domains = await domainOgm.find({ where: { id } })
    const domain = domains[0]
    const createRes = await vercelApis.domain.add(name)
    const body = await createRes.json()

    if (createRes.status === 409) {
      throw domainExist
    }

    handleRestError(createRes, body, 'updateDomain - vercel')

    const deleteRes = await vercelApis.domain.delete(domain.name)
    handleRestError(deleteRes, await deleteRes.json(), 'deleteDomain - vercel')

    const { domains: updatedDomains } = await domainOgm.update({
      where: { id },
      update: { name },
    })

    return updatedDomains[0]
  } catch (err) {
    console.log({ err })
    throw err
  }
}
