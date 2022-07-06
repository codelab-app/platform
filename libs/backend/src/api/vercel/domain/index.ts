import { add } from './add'
import { deleteDomain } from './delete'
import { getConfig } from './getConfig'
import { getProjectData } from './getProjectData'
import { update } from './update'

export const domainApis = {
  add,
  delete: deleteDomain,
  getConfig,
  update,
  getProjectData,
}
