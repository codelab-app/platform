import type { IElementModel } from '@codelab/frontend/abstract/domain'

export interface IElementApplicationValidationService {
  propsHaveErrors(element?: IElementModel): boolean
}
