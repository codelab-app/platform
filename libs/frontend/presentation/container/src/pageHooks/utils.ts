import type {
  IComponentApplicationService,
  ITypeService,
} from '@codelab/frontend/abstract/application'
import type {
  IElementModel,
  TypedProp,
} from '@codelab/frontend/abstract/domain'
import {
  extractTypedPropValue,
  isComponent,
  isTypedProp,
} from '@codelab/frontend/abstract/domain'
import { hasStateExpression } from '@codelab/frontend/application/shared/core'
import type { IPropData } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import flatMap from 'lodash/flatMap'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import values from 'lodash/values'

const hasComponentId = (prop: TypedProp): boolean =>
  !hasStateExpression(prop.value) &&
  [ITypeKind.ReactNodeType, ITypeKind.RenderPropType].includes(prop.kind)

const getComponentIdsFromProp = (prop: IPropData): Array<string> =>
  isTypedProp(prop) && hasComponentId(prop) && extractTypedPropValue(prop)
    ? [extractTypedPropValue(prop)!]
    : isObject(prop)
    ? values(prop).flatMap((childProp) => getComponentIdsFromProp(childProp))
    : []

/**
 * Get all component ids that could be an element or a render prop type
 */
const getComponentIdsFromElements = (elements: Array<IElementModel>) =>
  elements
    .reduce<Array<string>>((acc, element) => {
      // Component as an element
      if (isComponent(element.renderType)) {
        acc.push(element.renderType.id)
      }

      if (element.childMapperComponent?.id) {
        acc.push(element.childMapperComponent.id)
      }

      acc.push(...getComponentIdsFromProp(element.props).filter(isString))

      return acc
    }, [])
    .filter(Boolean)

/**
 * Get all api and field type ids from the elements
 */
const getTypeIdsFromElements = (elements: Array<IElementModel>) => {
  return elements.reduce<Array<string>>((acc, element) => {
    acc.push(element.renderType.current.api.id)

    element.renderType.current.api.current.fields.forEach((field) => {
      acc.push(field.type.id)
    })

    return acc
  }, [])
}

export const loadAllTypesForElements = async (
  componentService: IComponentApplicationService,
  typeService: ITypeService,
  elements: Array<IElementModel>,
) => {
  const loadedComponentElements: Array<IElementModel> = []

  // Loading custom components
  let componentsBatch = getComponentIdsFromElements(elements).filter(
    (id) => !componentService.componentDomainService.components.has(id),
  )

  // This makes sure the deeply nested components will also be loaded
  // e.g. When an element has a render prop type with a component, and that component
  // also has render prop type with another component, and so on
  do {
    if (componentsBatch.length > 0) {
      const components = await componentService.getAll({
        id_IN: componentsBatch,
      })

      const componentElements = flatMap(components.map((comp) => comp.elements))

      loadedComponentElements.push(...componentElements)

      componentsBatch = getComponentIdsFromElements(componentElements).filter(
        (id) => !componentService.componentDomainService.components.has(id),
      )
    }
  } while (componentsBatch.length > 0)

  // Loading all the types of the elements that are used on the current page
  // This will also get the types of fields, not just interface types
  const typeIds = getTypeIdsFromElements([
    ...elements,
    ...loadedComponentElements,
  ]).filter((id) => !typeService.typeDomainService.types.has(id))

  await typeService.getAll(typeIds)
}
