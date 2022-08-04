import { IDomainExport } from '@codelab/shared/abstract/core'
import {
  createDomainIfNotExist,
  createVercelDomainIfNotExist,
} from '../../repository/domain.repo'

export const importDomains = async (domains: Array<IDomainExport> = []) => {
  console.log('Importing domains...')

  const verificationPromises: Array<Promise<any>> = []
  const verifiedDomains: Array<IDomainExport> = []

  domains.forEach((domain) => {
    const verificationPromise = createVercelDomainIfNotExist(domain)
    verificationPromises.push(verificationPromise)
    verificationPromise.then((ok) => {
      if (!ok) {
        return
      }

      verifiedDomains.push(domain)
    })
  })

  await Promise.all(verificationPromises)

  const domainCreationPromises: Array<Promise<any>> = verifiedDomains.map(
    (domain) => createDomainIfNotExist(domain),
  )

  await Promise.all(domainCreationPromises)
}
