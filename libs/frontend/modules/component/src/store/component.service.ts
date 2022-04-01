import { ModalService } from '@codelab/frontend/shared/utils'
import { ComponentWhere } from '@codelab/shared/abstract/codegen-v2'
import { computed } from 'mobx'
import {
  _async,
  _await,
  createContext,
  detach,
  ExtendedModel,
  Model,
  model,
  modelAction,
  modelClass,
  modelFlow,
  objectMap,
  prop,
  Ref,
  rootRef,
  transaction,
} from 'mobx-keystone'
import { ComponentFragment } from '../graphql/Component.fragment.v2.1.graphql.gen'
import type { CreateComponentInput } from '../use-cases/create-component/types'
import type { UpdateComponentInput } from '../use-cases/update-component/types'
import { mapCreateInput } from './apiUtils'
import { Component } from './component'
import { componentApi } from './componentApi'

export const componentRef = rootRef<Component>('ComponentRef', {
  onResolvedValueChange(ref, newComponent, oldComponent) {
    if (oldComponent && !newComponent) {
      detach(ref)
    }
  },
})

@model('codelab/ComponentModalService')
class ComponentModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Ref<Component>>>(ModalService),
  props: {},
})) {
  @computed
  get component() {
    return this.metadata?.current ?? null
  }
}

export interface WithComponentService {
  componentService: ComponentService
}

@model('codelab/ComponentStore')
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
        const componentModel = Component.fromFragment(component)
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
    input: CreateComponentInput,
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

    const componentModel = Component.fromFragment(component)

    this.components.set(componentModel.id, componentModel)

    return componentModel
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ComponentService,
    component: Component,
    { name }: UpdateComponentInput,
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
  addComponent(component: Component) {
    this.components.set(component.id, component)
  }

  @modelAction
  addOrUpdate(componentFragment: ComponentFragment) {
    const existing = this.component(componentFragment.id)

    if (existing) {
      existing.updateFromFragment(componentFragment)
    } else {
      this.addComponent(Component.fromFragment(componentFragment))
    }
  }

  @modelAction
  addOrUpdateAll(components: Array<ComponentFragment>) {
    for (const component of components) {
      this.addOrUpdate(component)
    }
  }
}

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const componentServiceContext = createContext<ComponentService>()

export const getComponentServiceFromContext = (thisModel: any) => {
  const componentService = componentServiceContext.get(thisModel)

  if (!componentService) {
    throw new Error('componentServiceContext is not set')
  }

  return componentService
}
