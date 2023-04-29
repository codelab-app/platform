import { AppRepository, getComponents } from '@codelab/backend/domain/app'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import flatMap from 'lodash/flatMap'
import uniqBy from 'lodash/uniqBy'

export const exportComponents = async (where: OGM_TYPES.AppWhere) => {
  const appRepository = new AppRepository()
  const apps = await appRepository.find(where)

  const components = await Promise.all(
    apps.map(async (app) => {
      const { components: Exportedcomponent } = await getComponents(app)

      return Exportedcomponent
    }),
  )

  const uniqueComponents = uniqBy(flatMap(components), 'id')

  return uniqueComponents
}
