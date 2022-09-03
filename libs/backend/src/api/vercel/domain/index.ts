import { add } from './add'
import { deleteDomain } from './delete'
import { getConfig } from './getConfig'
import { getProjectData, PROJECT_NOT_FOUND } from './getProjectData'
import { update } from './update'

export const domainApis = {
  add,
  delete: deleteDomain,
  getConfig,
  update,
  getProjectData,
}

export { PROJECT_NOT_FOUND }
