import { createComponents } from '@codelab/backend/domain/app'
import type {
  IAuth0Owner,
  IComponentExport,
} from '@codelab/frontend/abstract/core'
import { logSection } from '@codelab/shared/utils'

export const importComponents = async (
  components: Array<IComponentExport>,
  owner: IAuth0Owner,
) => {
  logSection('Importing components')
  await createComponents(components, owner)
}
