import type { IAppExport } from '@codelab/backend/abstract/core'
import { createComponents } from '@codelab/backend/domain/app'
import { updateImportedElement } from '@codelab/backend/domain/element'
import type {
  IAuth0Owner,
  IComponentExport,
} from '@codelab/frontend/abstract/core'
import { logSection } from '@codelab/shared/utils'

export const importComponents = async (
  components: Array<IComponentExport>,
  apps: Array<IAppExport>,
  owner: IAuth0Owner,
) => {
  logSection('Importing components')
  await createComponents(components, owner)

  // after all the components and elements are created,
  // we can link the element's renderComponentType
  for (const app of apps) {
    for (const page of app.pages) {
      for (const element of page.elements) {
        if (element.renderComponentType === null) {
          continue
        }

        await updateImportedElement(element)
      }
    }
  }
}
