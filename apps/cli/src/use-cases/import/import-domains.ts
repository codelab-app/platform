import { IDomainExport } from '@codelab/shared/abstract/core'
import {
  addVercelDomain,
  createDomainIfNotExist,
} from '../../repository/domain.repo'

export const importDomains = async (domain: IDomainExport) => {
  console.log('Importing domains...')

  const newDomainAdded = await addVercelDomain(domain)

  if (!newDomainAdded) {
    console.log(`No domain information was found for domain: ${domain}`)

    return
  }

  /**
   * Create inside our own database
   */
  return await createDomainIfNotExist(domain)
}
