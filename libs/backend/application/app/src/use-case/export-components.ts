import type { AppWhere } from '@codelab/backend/abstract/codegen'
import { AppRepository, getAppComponents } from '@codelab/backend/domain/app'
import flatMap from 'lodash/flatMap'
import uniqBy from 'lodash/uniqBy'

export const exportComponents = async (where: AppWhere) => {
  const appRepository = new AppRepository()
  const apps = await appRepository.find(where)

  const components = await Promise.all(
    apps.map(async (app) => {
      return (await getAppComponents(app)).components
    }),
  )

  const uniqueComponents = uniqBy(flatMap(components), 'id')

  return uniqueComponents
}
