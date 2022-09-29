import { PreRenderWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import {
  ICreatePreRenderDTO,
  IPreRenderDTO,
  IUpdatePreRenderDTO,
} from './pre-render.dto.interface'
import { IPreRender } from './pre-render.model.interface'

export interface IPreRenderService
  extends ICRUDService<IPreRender, ICreatePreRenderDTO, IUpdatePreRenderDTO>,
    IQueryService<IPreRender, PreRenderWhere>,
    ICRUDModalService<Ref<IPreRender>, { preRender: Maybe<IPreRender> }>,
    ICacheService<IPreRenderDTO, IPreRender> {
  /**
   * Properties
   */
  preRenders: ObjectMap<IPreRender>
}
