import type {
  IComponent,
  IComponentRepository,
} from '@codelab/frontend/abstract/core'
import type {
  ComponentUpdateInput,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import { reconnectNodeId } from '@codelab/shared/domain/mapper'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { mapCreateInput } from '../store'
import { componentApi } from '../store/component.api'

@model('@codelab/ComponentRepository')
export class ComponentRepository
  extends Model({})
  implements IComponentRepository
{
  @modelFlow
  add = _async(function* (this: ComponentRepository, component: IComponent) {
    const input = mapCreateInput(component)

    const {
      createComponents: { components },
    } = yield* _await(
      componentApi.CreateComponents({
        input,
      }),
    )

    return components[0]!
  })

  @modelFlow
  update = _async(function* (this: ComponentRepository, component: IComponent) {
    const { childrenContainerElement, id, name } = component

    const {
      updateComponents: { components },
    } = yield* _await(
      componentApi.UpdateComponents({
        update: {
          childrenContainerElement: reconnectNodeId(
            childrenContainerElement.id,
          ),
          name,
        },
        where: { id },
      }),
    )

    return components[0]!
  })

  @modelFlow
  find = _async(function* (this: ComponentRepository, where: ComponentWhere) {
    const { components } = yield* _await(componentApi.GetComponents({ where }))

    return components
  })

  @modelFlow
  delete = _async(function* (
    this: ComponentRepository,
    components: Array<IComponent>,
  ) {
    const {
      deleteComponents: { nodesDeleted },
    } = yield* _await(
      componentApi.DeleteComponents({
        delete: {
          api: {},
        },
        where: { id_IN: components.map((component) => component.id) },
      }),
    )

    return nodesDeleted
  })

  @modelFlow
  patch = _async(function* (
    this: ComponentRepository,
    entity: IEntity,
    input: ComponentUpdateInput,
  ) {
    const {
      updateComponents: { components },
    } = yield* _await(
      componentApi.UpdateComponents({
        update: input,
        where: { id: entity.id },
      }),
    )

    return components[0]!
  })
}
