import type { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import {
  domainSelection,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { vercelApis } from '@codelab/backend/infra/adapter/vercel'
import type { ICreateDomainDTO } from '@codelab/frontend/abstract/core'
import type { IFieldResolver } from '@graphql-tools/utils'
import type { Context } from '@neo4j/graphql/dist/types'
import { domainExistsError } from '../domain.error'

export const updateDomains: IFieldResolver<
  unknown,
  Context,
  { input: ICreateDomainDTO },
  Promise<OGM_TYPES.UpdateDomainsMutationResponse>
> = async (_, args, { req }) => {
  const {
    input: { name, id },
  } = args

  // await validateDomainAuth(req, String(id))

  const Domain = await Repository.instance.Domain
  // const domains = await Domain.find({ where: { id } })
  // // get old domain name
  // const domain = domains[0]
  //
  // if (!domain) {
  //   throw new Error('Missing domain')
  // }

  // to rename domain, we need create new one, and delete the old one

  // await handleAPIError(createRes, 'createDomain - vercel')
  await vercelApis.domain.deleteDomain(name)

  const createRes = await vercelApis.domain.addDomain(name)

  if (createRes.status === 409) {
    throw domainExistsError
  }
  // await handleAPIError(deleteRes, 'deleteDomain - vercel')

  return Domain.update({
    selectionSet: `{
        domains {
          ${domainSelection}
        }
      }`,
    where: { id },
    update: { name },
  })
}
