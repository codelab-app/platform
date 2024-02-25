import { createRootStore } from '@codelab/frontend/infra/mobx'
import type { IApp } from '@codelab/shared/abstract/core'
import { appData, auth0IdToken, userDto } from '@codelab/shared/data/test'

// export const cypressApp: IApp = appData(userDto)
export const rootStore = createRootStore({
  routerQuery: {},
  user: auth0IdToken,
})
