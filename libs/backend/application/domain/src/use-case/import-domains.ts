import { createDomain } from '@codelab/backend/domain/domain'
import { logSection } from '@codelab/shared/utils'

export const importDomains = async (domainName: string) => {
  logSection('Importing Domains')

  const newDomainAdded = await createDomain(domainName)

  if (!newDomainAdded.ok) {
    console.log(`No domain information was found for domain: ${domainName}`)

    return
  }

  /**
   * Create inside our own database
   */
  // return await createDomainIfNotExist(domain)
}
