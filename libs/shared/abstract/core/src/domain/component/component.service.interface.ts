import { ComponentWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { DataNode } from 'antd/lib/tree'
import { ObjectMap, Ref } from 'mobx-keystone'
import { ICRUDModalService, ICRUDService, IQueryService } from '../../service'
import { IBuilderDataNode } from '../../ui'
import { IElementTree } from '../element'
import {
  IComponentDTO,
  ICreateComponentDTO,
  IUpdateComponentDTO,
} from './component.dto.interface'
import { IComponent } from './component.model.interface'

export interface IComponentService
  extends ICRUDService<IComponent, ICreateComponentDTO, IUpdateComponentDTO>,
    IQueryService<IComponent, ComponentWhere>,
    ICRUDModalService<Ref<IComponent>, { component: Maybe<IComponent> }> {
  components: ObjectMap<IComponent>
  component(id: string): Maybe<IComponent>
  componentAntdNode: DataNode
  componentAntdNodeV2: IBuilderDataNode
  elementTrees: ObjectMap<IElementTree>
  loadComponentTrees(): Promise<any>
  updateCaches(components: Array<IComponentDTO>): void
}
