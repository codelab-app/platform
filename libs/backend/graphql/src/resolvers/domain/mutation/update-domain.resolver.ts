import {
  domainSelection,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import { UpdateDomainMutationInput } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils'
import { Context } from '@neo4j/graphql/dist/types'
import { handleAPIError } from '../../utils/handleAPIError'
import { domainExistsError } from '../domain.error'
import { validateDomainAuth } from '../domain.validation'

export const updateDomain: IFieldResolver<
  unknown,
  Context,
  { input: UpdateDomainMutationInput }
> = async (_, args, { req }) => {
  try {
    const {
      input: { name, id },
    } = args

    await validateDomainAuth(req, String(id))

    const Domain = await Repository.instance.Domain
    const domains = await Domain.find({ where: { id } })
    // get old domain name
    const domain = domains[0]

    if (!domain) {
      throw new Error('Missing domain')
    }

    // to rename domain, we need create new one, and delete the old one
    const createRes = await vercelApis.domain.addDomain(name)

    if (createRes.status === 409) {
      throw domainExistsError
    }

    await handleAPIError(createRes, 'createDomain - vercel')

    // delete old domain name domain
    const deleteRes = await vercelApis.domain.deleteDomain(domain.name)
    await handleAPIError(deleteRes, 'deleteDomain - vercel')

    const { domains: updatedDomains } = await Domain.update({
      selectionSet: `{
        domains {
          ${domainSelection}
        }
      }`,
      where: { id },
      update: { name },
    })

    return updatedDomains[0]
  } catch (err) {
    console.log({ err })
    throw err
  }
}
