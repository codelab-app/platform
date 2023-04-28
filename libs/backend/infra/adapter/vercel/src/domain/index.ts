import { addDomain } from './add-domain'
import { getDomainConfig } from './get-domain-config'
import { getProjectDomain, PROJECT_NOT_FOUND } from './get-project-domain'

export const domainApis = {
  //  addDomain is still needed because it is used when importing domains and apps
  addDomain,
  getDomainConfig,
  getProjectDomain,
}

export { PROJECT_NOT_FOUND }
