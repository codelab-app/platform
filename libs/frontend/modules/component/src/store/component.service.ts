import { ModalService } from '@codelab/frontend/shared/utils'
import { ComponentWhere } from '@codelab/shared/abstract/codegen'
import {
  IComponentDTO,
  ICreateComponentDTO,
  IUpdateComponentDTO,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  createContext,
  detach,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  rootRef,
  transaction,
} from 'mobx-keystone'
import { mapCreateInput } from './api.utils'
import { componentApi } from './component.api'
import { Component } from './component.model'
import { ComponentModalService } from './component-modal.service'

export const componentRef = rootRef<Component>('ComponentRef', {
  onResolvedValueChange(ref, newComponent, oldComponent) {
    if (oldComponent && !newComponent) {
      detach(ref)
    }
  },
})

export interface WithComponentService {
  componentService: ComponentService
}

@model('@codelab/ComponentStore')
export class ComponentService extends Model({
  components: prop(() => objectMap<Component>()),
  createModal: prop(() => new ModalService({})),
  updateModal: prop(() => new ComponentModalService({})),
  deleteModal: prop(() => new ComponentModalService({})),
}) {
  @computed
  get componentsList() {
    return [...this.components.values()]
  }

  component(id: string) {
    return this.components.get(id)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ComponentService, where?: ComponentWhere) {
    const { components } = yield* _await(componentApi.GetComponents({ where }))

    return components.map((component) => {
      if (this.components.get(component.id)) {
        return this.components.get(component.id)
      } else {
        const componentModel = Component.hydrate(component)
        this.components.set(component.id, componentModel)

        return componentModel
      }
    })
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: ComponentService, id: string) {
    if (this.components.has(id)) {
      return this.components.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  @modelFlow
  @transaction
  createComponent = _async(function* (
    this: ComponentService,
    input: ICreateComponentDTO,
    ownerId: string,
  ) {
    const createComponentInput = mapCreateInput(input, ownerId)

    const {
      createComponents: { components },
    } = yield* _await(
      componentApi.CreateComponents({
        input: createComponentInput,
      }),
    )

    const component = components[0]

    if (!component) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Component was not created')
    }

    const componentModel = Component.hydrate(component)

    this.components.set(componentModel.id, componentModel)

    return componentModel
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
    if (this.components.has(id)) {
      this.components.delete(id)
    }

    const { deleteComponents } = yield* _await(
      componentApi.DeleteComponents({ where: { id } }),
    )

    if (deleteComponents.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Component was not deleted')
    }

    return deleteComponents
  })

  @modelAction
  updateCache(componentFragment: IComponentDTO) {
    const existing = this.component(componentFragment.id)

    if (existing) {
      existing.updateCache(componentFragment)
    } else {
      const component = Component.hydrate(componentFragment)
      this.components.set(component.id, component)
    }
  }

  @modelAction
  updateCaches(components: Array<IComponentDTO>) {
    for (const component of components) {
      this.updateCache(component)
    }
  }
}

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const componentServiceContext = createContext<ComponentService>()

export const getComponentService = (self: any) => {
  const componentService = componentServiceContext.get(self)

  if (!componentService) {
    throw new Error('componentServiceContext is not set')
  }

  return componentService
}
