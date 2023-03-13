import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'
import type { Context } from '@neo4j/graphql/dist/types'
import { Repository } from '../../../../infra'
import { domainSelection } from '../../../../selectionSet'
import {
  domainExistsError,
  domainNotFoundError,
} from '../validation/domain.error'

export const updateDomains: IFieldResolver<
  unknown,
  Context,
  { where: OGM_TYPES.DomainWhere; update: OGM_TYPES.DomainUpdateInput },
  Promise<OGM_TYPES.UpdateDomainsMutationResponse>
> = async (_, args, { req }) => {
  const { update, where } = args
  const { name } = update
  // await validateDomainAuth(req, String(id))
  const Domain = await Repository.instance.Domain
  const [domainBeforeUpdate] = await Domain.find({ where })

  if (!domainBeforeUpdate) {
    throw domainNotFoundError
  }

  // to rename domain, we need create new one, and delete the old one

  // await handleAPIError(createRes, 'createDomain - vercel')
  if (name && name !== domainBeforeUpdate.name) {
    await vercelApis.domain.deleteDomain(domainBeforeUpdate.name)

    const createRes = await vercelApis.domain.addDomain(name)

    if (createRes.status === 409) {
      throw domainExistsError
    }
  }
  // await handleAPIError(deleteRes, 'deleteDomain - vercel')

  return Domain.update({
    selectionSet: `{
        domains {
          ${domainSelection}
        }
      }`,
    update,
    where,
  })
}
