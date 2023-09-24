import type { App } from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import { slugify } from '@codelab/shared/utils'
import type { DeepPick } from 'ts-essentials'

interface AppData {
  compositeKey: never
  owner: { id: never }
}

export class AppProperties {
  static appCompositeKey = (appName: string, user: IEntity) => {
    return `${user.id}-${appName}`
  }

  static appNameFromCompositeKey = (app: DeepPick<App, AppData>) => {
    return app.compositeKey.replace(`${app.owner.id}-`, '')
  }

  static appSlugFromCompositeKey = (app: DeepPick<App, AppData>) => {
    return slugify(AppProperties.appNameFromCompositeKey(app))
  }
}
