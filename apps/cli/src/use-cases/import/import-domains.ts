import type { IDomainExport } from '@codelab/backend/abstract/core'
import {
  addVercelDomain,
  createDomainIfNotExist,
} from '@codelab/backend/domain/domain'
import { logSection } from '@codelab/shared/utils'

export const importDomains = async (domain: IDomainExport) => {
  logSection('Importing Domains')

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
