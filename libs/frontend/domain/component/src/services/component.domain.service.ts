import type {
  IComponentDomainService,
  IComponentModel,
} from '@codelab/frontend-abstract-domain'
import type { SelectOption } from '@codelab/frontend-abstract-types'
import type { IComponentDto, IRef } from '@codelab/shared-abstract-core'

import CodeSandboxOutlined from '@ant-design/icons/CodeSandboxOutlined'
import { mapEntitySelectOptions } from '@codelab/frontend-domain-atom/store'
import { IElementRenderTypeKind } from '@codelab/shared-abstract-core'
import { Validator } from '@codelab/shared-infra-typebox'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { prop as rProp, sortBy } from 'remeda'

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

  getSelectOptions(currentComponent?: IRef) {
    return this.sortedComponentsList
      .filter((option) => {
        if (currentComponent?.id) {
          return (
            option.id !== currentComponent.id &&
            !option.descendantComponents
              .map((component) => component.id)
              .includes(currentComponent.id)
          )
        }

        return true
      })
      .map(mapEntitySelectOptions)
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
