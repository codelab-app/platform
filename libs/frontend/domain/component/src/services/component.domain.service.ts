import type {
  IComponentDomainService,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'
import type { IComponentDto } from '@codelab/shared/abstract/core'

import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined'
import { mapEntitySelectOptions } from '@codelab/frontend-domain-atom/store'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/typebox'
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
} from 'mobx-keystone'
import { prop as rProp, sortBy } from 'remeda'

import { componentRepository } from '../repositories'
import { Component } from '../store'

@model('@codelab/ComponentDomainService')
export class ComponentDomainService
  extends Model({
    components: prop(() => objectMap<IComponentModel>()),
  })
  implements IComponentDomainService
{
  @computed
  get componentList() {
    return [...this.components.values()]
  }

  @computed
  get sortedComponentsList() {
    return sortBy(this.componentList, rProp('name'))
  }

  @modelFlow
  getSelectOptions = _async(function* (
    this: ComponentDomainService,
    component?: Pick<IComponentModel, 'id' | 'name'>,
  ) {
    const components = yield* _await(componentRepository.find())

    components.items.forEach((dto) => {
      this.hydrate(dto)
    })

    const filtered = this.sortedComponentsList.filter((comp) => {
      if (comp.id === component?.id) {
        return false
      }

      /**
       * Prevent circular references
       */
      const parentIsDescendant = comp.descendantComponents.some(
        ({ id }) => id === component?.id,
      )

      return !component?.id || !parentIsDescendant
    })

    return filtered.map((comp) => ({
      label: comp.name,
      value: comp.id,
    }))
  })

  @modelAction
  component(id: string) {
    const component = this.maybeComponent(id)

    if (!component) {
      throw new Error('Missing component')
    }

    return component
  }

  findById(id: string) {
    const found = this.components.get(id)

    Validator.assertsDefined(found)

    return found
  }

  getRenderTypeOptions(components?: Array<SelectOption>) {
    const fallbackComponents = this.componentList.map(mapEntitySelectOptions)
    const componentOptions = components ?? fallbackComponents

    return componentOptions.map(({ label, value }) => {
      return {
        __typename: IElementRenderTypeKind.Component,
        icon: CodeSandboxOutlined,
        label,
        text: label,
        value,
      }
    })
  }

  @modelAction
  hydrate(componentDto: IComponentDto) {
    let component = this.components.get(componentDto.id)

    if (component) {
      component.writeCache(componentDto)
    } else {
      component = Component.create(componentDto)

      this.components.set(component.id, component)
    }

    return component
  }

  @modelAction
  maybeComponent(id: string) {
    return this.components.get(id)
  }
}
