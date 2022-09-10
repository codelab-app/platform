import { ICacheService } from '../../../../service'
import { IActionBase } from '../../action-base.interface'
import { IActionKind } from '../../action-kind.enum'
import { ICustomActionDTO } from './custom-action.dto.interface'

export interface ICustomAction
  extends IActionBase,
    ICacheService<ICustomActionDTO, ICustomAction> {
  type: IActionKind.CustomAction
  code: string
}
