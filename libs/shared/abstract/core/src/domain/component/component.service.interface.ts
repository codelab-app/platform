import { ComponentWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ICRUDModalService, ICRUDService, IQueryService } from '../../service'
import {
  ICreateComponentDTO,
  IUpdateComponentDTO,
} from './component.dto.interface'
import { IComponent } from './component.interface'

export interface IComponentService
  extends ICRUDService<IComponent, ICreateComponentDTO, IUpdateComponentDTO>,
    IQueryService<IComponent, ComponentWhere>,
    ICRUDModalService<Ref<IComponent>, { component: Maybe<IComponent> }> {
  components: Array<IComponent>
}
