import { addDomain } from './add-domain'
import { deleteDomain } from './delete-domain'
import { getDomainConfig } from './get-domain-config'
import { getProjectDomain, PROJECT_NOT_FOUND } from './get-project-domain'
import { updateDomain } from './update-domain'

export const domainApis = {
  addDomain,
  deleteDomain,
  getDomainConfig,
  getProjectDomain,
  updateDomain,
}

export { PROJECT_NOT_FOUND }
