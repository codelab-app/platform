import type { IPageModel } from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'

export interface IRuntimePageDTO {
  page: IPageModel
  runtimeProviderStore?: IRef
}
