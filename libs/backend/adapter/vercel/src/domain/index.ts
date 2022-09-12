import { addDomain } from './add-domain'
import { deleteDomain } from './delete-domain'
import { getConfig } from './get-config'
import { getProjectDomain, PROJECT_NOT_FOUND } from './get-project-domain'

export const domainApis = {
  addDomain,
  deleteDomain,
  getConfig,
  getProjectDomain,
}

export { PROJECT_NOT_FOUND }
