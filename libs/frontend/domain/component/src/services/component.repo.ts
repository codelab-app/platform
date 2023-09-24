import type {
  IComponentModel,
  IComponentRepository,
} from '@codelab/frontend/abstract/core'
import type {
  ComponentOptions,
  ComponentUniqueWhere,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import { reconnectNodeId } from '@codelab/shared/domain/mapper'
import { _async, _await, Model, model } from 'mobx-keystone'
import { componentApi } from '../store/component.api'

@model('@codelab/ComponentRepository')
export class ComponentRepository
  extends Model({})
  implements IComponentRepository
{
  add = _async(function* (
    this: ComponentRepository,
    component: IComponentModel,
  ) {
    const {
      createComponents: { components },
    } = yield* _await(
      componentApi.CreateComponents({ input: component.toCreateInput() }),
    )

    return components[0]!
  })

  delete = _async(function* (
    this: ComponentRepository,
    components: Array<IComponentModel>,
  ) {
    const {
      deleteComponents: { nodesDeleted },
    } = yield* _await(
      componentApi.DeleteComponents({
        delete: {
          api: {},
          props: {},
          store: {},
        },
        where: { id_IN: components.map((component) => component.id) },
      }),
    )

    return nodesDeleted
  })

  find = _async(function* (
    this: ComponentRepository,
    where: ComponentWhere,
    options?: ComponentOptions,
  ) {
    return yield* _await(componentApi.GetComponents({ options, where }))
  })

  findOne = _async(function* (
    this: ComponentRepository,
    where: ComponentUniqueWhere,
  ) {
    return (yield* _await(this.find(where))).items[0]
  })

  update = _async(function* (
    this: ComponentRepository,
    component: IComponentModel,
  ) {
    const { childrenContainerElement, id, keyGenerator, name } = component

    const {
      updateComponents: { components },
    } = yield* _await(
      componentApi.UpdateComponents({
        update: {
          childrenContainerElement: reconnectNodeId(
            childrenContainerElement.current.id,
          ),
          keyGenerator,
          name,
        },
        where: { id },
      }),
    )

    return components[0]!
  })
}
