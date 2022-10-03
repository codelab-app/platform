import { IPreRenderType } from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import { ICacheService } from '../../service'
import { IPreRenderDTO } from './pre-render.dto.interface'

export interface IPreRender
  extends IEntity,
    ICacheService<IPreRenderDTO, IPreRender> {
  name: string
  code: string
  page: IEntity
  type: IPreRenderType
}
