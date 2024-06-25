import type { IComponentRepository } from '@codelab/frontend/abstract/application'
import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type {
  ComponentOptions,
  ComponentUniqueWhere,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import { assertIsDefined } from '@codelab/shared/utils'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { componentApi } from './component.api'

@model('@codelab/ComponentRepository')
export class ComponentRepository
  extends Model({})
  implements IComponentRepository
{
  @modelFlow
  add = _async(function* (
    this: ComponentRepository,
    component: IComponentModel,
  ) {
    const {
      createComponents: { components },
    } = yield* _await(
      componentApi.CreateComponents({ input: component.toCreateInput() }),
    )

    const createdComponent = components[0]

    assertIsDefined(createdComponent)

    return createdComponent
  })

  @modelFlow
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

  @modelFlow
  find = _async(function* (
    this: ComponentRepository,
    where: ComponentWhere,
    options?: ComponentOptions,
  ) {
    return yield* _await(componentApi.GetComponents({ options, where }))
  })

  @modelFlow
  findOne = _async(function* (
    this: ComponentRepository,
    where: ComponentUniqueWhere,
  ) {
    return (yield* _await(this.find(where))).items[0]
  })

  @modelFlow
  update = _async(function* (
    this: ComponentRepository,
    component: IComponentModel,
  ) {
    const { id, name } = component

    const {
      updateComponents: { components },
    } = yield* _await(
      componentApi.UpdateComponents({
        update: {
          name,
        },
        where: { id },
      }),
    )

    const updatedComponent = components[0]

    assertIsDefined(updatedComponent)

    return updatedComponent
  })
}
