import type { IElementDTO } from '@codelab/shared/abstract/core'
import type { IElementModel } from '../element.model.interface'

export interface ICreateElementService {
  createElementAsFirstChild(data: IElementDTO): Promise<IElementModel>
  createElementAsNextSibling(data: IElementDTO): Promise<IElementModel>
}
