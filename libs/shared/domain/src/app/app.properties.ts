import type { IApp, IUserDto } from '@codelab/shared/abstract/core'
import type { App } from '@codelab/shared/infra/gql'
import type { DeepPick } from 'ts-essentials'

import { removeUuidAndDashPrefix, titleCase } from '@codelab/shared/utils'

interface AppData {
  compositeKey: never
  owner: { id: never }
}

const appCompositeKey = (app: Pick<IApp, 'slug'>, user: Pick<IUserDto, 'id'>) =>
  `${user.id}-${app.slug}`

const appNameFromCompositeKey = (app: DeepPick<App, AppData>) => {
  const slug = appSlugFromCompositeKey(app)

  return titleCase(slug)
}

const appSlugFromCompositeKey = (app: DeepPick<App, AppData>) => {
  const slug = removeUuidAndDashPrefix(app.compositeKey)

  return slug
}

export const AppProperties = {
  appCompositeKey,
  appNameFromCompositeKey,
  appSlugFromCompositeKey,
}
