import { IDomainExport } from '@codelab/shared/abstract/core'
import {
  createDomainIfNotExist,
  createVercelDomainIfNotExist,
} from '../../repository/domain.repo'

export const importDomains = async (domains: Array<IDomainExport> = []) => {
  console.log('Importing domains...')

  const verifiedDomains: Array<IDomainExport> = []

  const verificationPromises = domains.map((domain) => {
    const verificationPromise = createVercelDomainIfNotExist(domain)

    verificationPromise.then((domainInfo) => {
      if (!domainInfo) {
        console.log(`No domain information was found for domain: ${domain}`)

        return
      }

      verifiedDomains.push(domain)
    })

    return verificationPromise
  })

  await Promise.all(verificationPromises)

  const domainCreationPromises: Array<Promise<any>> = verifiedDomains.map(
    (domain) => createDomainIfNotExist(domain),
  )

  await Promise.all(domainCreationPromises)
}
