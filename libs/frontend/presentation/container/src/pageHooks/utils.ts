import type {
  IComponentService,
  IElement,
  IPropData,
  ITypeService,
  TypedProp,
} from '@codelab/frontend/abstract/core'
import {
  extractTypedPropValue,
  isComponentInstance,
  isTypedProp,
} from '@codelab/frontend/abstract/core'
import { hasStateExpression } from '@codelab/frontend/shared/utils'
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
const getComponentIdsFromElements = (elements: Array<IElement>) =>
  elements
    .reduce<Array<string>>((acc, element) => {
      // Component as an element
      if (isComponentInstance(element.renderType)) {
        acc.push(element.renderType.id)
      }

      if (element.childMapperComponent?.id) {
        acc.push(element.childMapperComponent.id)
      }

      acc.push(
        ...getComponentIdsFromProp(element.props.current).filter(isString),
      )

      return acc
    }, [])
    .filter(Boolean)

/**
 * Get all api and field type ids from the elements
 */
const getTypeIdsFromElements = (elements: Array<IElement>) => {
  return elements.reduce<Array<string>>((acc, element) => {
    if (element.renderType?.current.api) {
      acc.push(element.renderType.current.api.id)

      element.renderType.current.api.current.fields.forEach((field) => {
        acc.push(field.type.id)
      })
    }

    return acc
  }, [])
}

export const loadAllTypesForElements = async (
  componentService: IComponentService,
  typeService: ITypeService,
  roots: Array<IElement>,
  isProduction = false,
) => {
  const loadedComponentElements: Array<IElement> = []

  const elements = [
    ...roots,
    ...flatMap(roots.map((root) => root.descendantElements)),
  ]

  // Loading custom components
  let componentsBatch = getComponentIdsFromElements(elements).filter(
    (id) => !componentService.components.has(id),
  )

  // This makes sure the deeply nested components will also be loaded
  // e.g. When an element has a render prop type with a component, and that component
  // also has render prop type with another component, and so on
  do {
    if (componentsBatch.length > 0) {
      const components = await componentService.getAll({
        id_IN: componentsBatch,
      })

      const componentElements = [
        ...components.map((comp) => comp.rootElement.current),
        ...flatMap(
          components.map((comp) => comp.rootElement.current.descendantElements),
        ),
      ]

      loadedComponentElements.push(...componentElements)

      componentsBatch = getComponentIdsFromElements(componentElements).filter(
        (id) => !componentService.components.has(id),
      )
    }
  } while (componentsBatch.length > 0)

  if (isProduction) {
    // Loading all the types of the elements that are used on the current page
    // This will also get the types of fields, not just interface types
    const typeIds = getTypeIdsFromElements([
      ...elements,
      ...loadedComponentElements,
    ]).filter((id) => !typeService.types.has(id))

    await typeService.getAll(typeIds)
  }
}
