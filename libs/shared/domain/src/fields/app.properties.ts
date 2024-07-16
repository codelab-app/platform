import type { App } from '@codelab/shared/abstract/codegen'
import type { IApp, IAppDto, IUserDto } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import type { DeepPick } from 'ts-essentials'

interface AppData {
  compositeKey: never
  owner: { id: never }
}

const appCompositeKey = (app: Pick<IApp, 'slug'>, user: Pick<IUserDto, 'id'>) =>
  `${user.id}-${app.slug}`

const appNameFromCompositeKey = (app: DeepPick<App, AppData>) => {
  return app.compositeKey.replace(`${app.owner.id}-`, '')
}

const appSlugFromCompositeKey = (app: DeepPick<App, AppData>) => {
  return slugify(AppProperties.appNameFromCompositeKey(app))
}

export const AppProperties = {
  appCompositeKey,
  appNameFromCompositeKey,
  appSlugFromCompositeKey,
}
