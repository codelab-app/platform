import type {
  SelectElementOption,
  SelectElementOptions,
} from '@codelab/frontend/abstract/domain'
import { IElementTypeKind } from '@codelab/shared/abstract/core'
import { difference } from 'remeda'
import { mapElementOption } from '../use-cases/element-options'

export const getSelectElementOptions = ({
  allElementOptions,
  elementTree,
  kind,
  targetElementId,
}: SelectElementOptions) => {
  const targetElement = allElementOptions?.find(
    (element) => element.value === targetElementId,
  )

  const allActiveTreeElements = elementTree?.elements ?? []

  const allActiveTreeElementOptions =
    allActiveTreeElements.map(mapElementOption)

  const elementMap = (allElementOptions ?? []).reduce((acc, element) => {
    acc[element.value] = element

    return acc
  }, {} as Record<string, SelectElementOption>)

  let selectOptions: Array<SelectElementOption> = []

  if (!targetElement) {
    selectOptions = allElementOptions ?? allActiveTreeElementOptions
  } else {
    switch (kind) {
      case IElementTypeKind.AllElements: {
        selectOptions = allElementOptions ?? allActiveTreeElementOptions
        break
      }

      case IElementTypeKind.ChildrenOnly: {
        selectOptions = getElementChildren(targetElement, elementMap)
        break
      }

      case IElementTypeKind.DescendantsOnly: {
        selectOptions = getDescendants(targetElement, elementMap)
        break
      }

      case IElementTypeKind.ExcludeDescendantsElements: {
        selectOptions = difference(
          allElementOptions ?? [],
          getDescendants(targetElement, elementMap),
        ).filter(({ value }) => value !== targetElement.value)
        break
      }

      default:
        selectOptions = []
    }
  }

  return selectOptions
}

const getDescendants = (
  element: SelectElementOption,
  elementMap: Record<string, SelectElementOption>,
) => {
  const descendants: Array<SelectElementOption> = []

  const _getDescendants = (el: SelectElementOption) => {
    for (const child of getElementChildren(el, elementMap)) {
      descendants.push(child)
      _getDescendants(child)
    }
  }

  _getDescendants(element)

  return descendants
}

const getElementChildren = (
  element: SelectElementOption,
  elementMap: Record<string, SelectElementOption>,
) => {
  return (
    element.childrenIds
      ?.map((childId) => elementMap[childId])
      .filter(
        (selectElementOption): selectElementOption is SelectElementOption =>
          Boolean(selectElementOption),
      ) ?? []
  )
}
