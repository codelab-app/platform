import type { IApp, IUserDto } from '@codelab/shared-abstract-core'
import type { App } from '@codelab/shared-infra-gqlgen'
import type { DeepPick } from 'ts-essentials'

import {
  removeUuidAndDashPrefix,
  slugify,
  titleCase,
} from '@codelab/shared-utils'

interface AppData {
  compositeKey: never
  owner: { id: never }
}

const appCompositeKey = (app: Pick<IApp, 'name'>, user: Pick<IUserDto, 'id'>) =>
  `${user.id}-${slugify(app.name)}`

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
