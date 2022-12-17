import type { IDomainExport } from '@codelab/backend/abstract/core'
import {
  addVercelDomain,
  createDomainIfNotExist,
} from '../../repository/domain.repo'
import { logSection } from '../../shared/utils/log-task'

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
