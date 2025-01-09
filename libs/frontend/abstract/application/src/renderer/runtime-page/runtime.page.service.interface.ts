import type { IPageModel } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'

import type { IRuntimePageModel } from './runtime-page.model.interface'

export interface IRuntimePageService {
  pages: ObjectMap<IRuntimePageModel>
  pagesList: Array<IRuntimePageModel>
  add(page: IPageModel): IRuntimePageModel
  delete(runtimePage: IRuntimePageModel): void
  maybeRuntimePage(compositeKey: string): Maybe<IRuntimePageModel>
  runtimePage(compositeKey: string): IRuntimePageModel
}
