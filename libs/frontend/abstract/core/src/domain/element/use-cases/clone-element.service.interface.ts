import { IEntity, Maybe } from '@codelab/shared/abstract/types'
import type { IElementModel } from '../element.model.interface'

export interface ICloneElementService {
  cloneElement(
    target: IElementModel,
    targetParent: IElementModel,
  ): Promise<Array<IElementModel>>
  convertElementToComponent(
    element: IElementModel,
    owner: IEntity,
  ): Promise<Maybe<IElementModel>>
}
