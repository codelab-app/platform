import type { IElementModel } from '@codelab/frontend-abstract-domain'
import type { Maybe } from '@codelab/shared-abstract-types'

import type { IRuntimeElementModel } from '../renderer'

export interface ICloneElementService {
  cloneElement(
    target: IElementModel,
    targetParent: IElementModel,
  ): Promise<Array<IElementModel>>
  convertElementToComponent(
    runtimeElement: IRuntimeElementModel,
  ): Promise<Maybe<IElementModel>>
}
