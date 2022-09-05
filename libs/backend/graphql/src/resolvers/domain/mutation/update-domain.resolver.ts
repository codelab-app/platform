import { DomainOGM } from '@codelab/backend/adapter/neo4j'
import { vercelApis } from '@codelab/backend/adapter/vercel'
import { UpdateDomainMutationInput } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import { handleAPIError } from '../../utils/handleAPIError'
import { domainExists } from '../domain.error'
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
    const createRes = await vercelApis.domain.addDomain(name)
    const body = await createRes.json()

    if (createRes.status === 409) {
      throw domainExists
    }

    handleAPIError(createRes, body, 'updateDomain - vercel')

    const deleteRes = await vercelApis.domain.deleteDomain(domain.name)
    handleAPIError(deleteRes, await deleteRes.json(), 'deleteDomain - vercel')

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
