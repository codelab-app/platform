import type { IApp, IUserDto } from '@codelab/shared/abstract/core'
import type { App } from '@codelab/shared/infra/gql'
import {
  removeUuidAndDashPrefix,
  slugCaseToTitleCase,
  slugify,
} from '@codelab/shared/utils'
import type { DeepPick } from 'ts-essentials'

interface AppData {
  compositeKey: never
  owner: { id: never }
}

const appCompositeKey = (app: Pick<IApp, 'slug'>, user: Pick<IUserDto, 'id'>) =>
  `${user.id}-${app.slug}`

const appNameFromCompositeKey = (app: DeepPick<App, AppData>) => {
  const slug = appSlugFromCompositeKey(app)

  return slugCaseToTitleCase(slug)
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
