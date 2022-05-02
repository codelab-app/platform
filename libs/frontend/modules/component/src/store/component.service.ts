import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { ComponentWhere } from '@codelab/shared/abstract/codegen'
import {
  IComponentDTO,
  IComponentService,
  ICreateComponentDTO,
  IUpdateComponentDTO,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { mapCreateInput } from './api.utils'
import { componentApi } from './component.api'
import { Component } from './component.model'
import { ComponentModalService } from './component-modal.service'

@model('@codelab/ComponentStore')
export class ComponentService
  extends Model({
    _components: prop(() => objectMap<Component>()),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new ComponentModalService({})),
    deleteModal: prop(() => new ComponentModalService({})),
  })
  implements IComponentService
{
  @computed
  get components() {
    return [...this._components.values()]
  }

  component(id: string) {
    return this._components.get(id)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ComponentService, where?: ComponentWhere) {
    const { components } = yield* _await(componentApi.GetComponents({ where }))

    return components
      .map((component) => {
        if (this._components.get(component.id)) {
          return this._components.get(component.id)
        } else {
          const componentModel = Component.hydrate(component)
          this._components.set(component.id, componentModel)

          return componentModel
        }
      })
      .filter((component): component is Component => !component)
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: ComponentService, id: string) {
    if (this._components.has(id)) {
      return this._components.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  @modelFlow
  @transaction
  create = _async(function* (
    this: ComponentService,
    data: Array<ICreateComponentDTO>,
  ) {
    const input = data.map((component) => mapCreateInput(component))

    const {
      createComponents: { components },
    } = yield* _await(
      componentApi.CreateComponents({
        input,
      }),
    )

    if (!components.length) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Component was not created')
    }

    return components.map((component) => {
      const componentModel = Component.hydrate(component)

      this._components.set(componentModel.id, componentModel)

      return componentModel
    })
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ComponentService,
    component: Component,
    { name }: IUpdateComponentDTO,
  ) {
    component.setName(name)

    const { updateComponents } = yield* _await(
      componentApi.UpdateComponents({
        update: { name },
        where: { id: component.id },
      }),
    )

    const updatedComponent = updateComponents?.components[0]

    if (!component) {
      throw new Error('Failed to update component')
    }

    component.setName(updatedComponent.name)

    return component
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ComponentService, id: string) {
    const existing = throwIfUndefined(this._components.get(id))

    if (this._components.has(id)) {
      this._components.delete(id)
    }

    const { deleteComponents } = yield* _await(
      componentApi.DeleteComponents({ where: { id } }),
    )

    if (deleteComponents.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Component was not deleted')
    }

    return existing
  })

  @modelAction
  updateCache(componentFragment: IComponentDTO) {
    const existing = this.component(componentFragment.id)

    if (existing) {
      existing.updateCache(componentFragment)
    } else {
      const component = Component.hydrate(componentFragment)
      this._components.set(component.id, component)
    }
  }

  @modelAction
  updateCaches(components: Array<IComponentDTO>) {
    for (const component of components) {
      this.updateCache(component)
    }
  }
}
