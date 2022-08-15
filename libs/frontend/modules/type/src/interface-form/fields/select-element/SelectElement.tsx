/* eslint-disable react/jsx-props-no-spreading */
import { ElementTypeKind } from '@codelab/shared/abstract/core'
import { difference } from 'lodash'
import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'

export interface SelectElementOption {
  label: string
  // id
  value: string
  childrenIds?: Array<string>
}

export type SelectElementProps = HTMLFieldProps<string, SelectFieldProps> & {
  kind: ElementTypeKind
  allElementOptions: Array<SelectElementOption>
  targetElementId?: string
  disableWhenOneOpt?: boolean
}

export const SelectElement = ({
  targetElementId,
  allElementOptions,
  name,
  kind,
  disableWhenOneOpt = false,
  ...props
}: SelectElementProps) => {
  let elements: Array<SelectElementOption>

  const targetElement = allElementOptions.find(
    (element) => element.value === targetElementId,
  )

  const elementMap = allElementOptions.reduce((acc, element) => {
    acc[element.value] = element

    return acc
  }, {} as Record<string, SelectElementOption>)

  if (!targetElement) {
    elements = allElementOptions
  } else {
    switch (kind) {
      case ElementTypeKind.AllElements:
        elements = allElementOptions
        break

      case ElementTypeKind.ChildrenOnly: {
        elements = getElementChildren(targetElement, elementMap)

        break
      }

      case ElementTypeKind.DescendantsOnly: {
        elements = getDescendants(targetElement, elementMap)

        break
      }

      case ElementTypeKind.ExcludeDescendantsElements:
        elements = difference(
          allElementOptions,
          getDescendants(targetElement, elementMap),
        )
          // remove the element itself
          .filter((x) => x.value !== targetElement.value)
        break
      default:
        elements = []
    }
  }

  return (
    <SelectField
      name={name}
      optionFilterProp="label"
      options={elements}
      showSearch
      {...(props as any)}
      disabled={
        disableWhenOneOpt && (elements.length === 1 || !elements.length)
      }
    />
  )
}

const getElementChildren = (
  el: SelectElementOption,
  elementMap: Record<string, SelectElementOption>,
) => el.childrenIds?.map((childId) => elementMap[childId]) || []

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

export const SelectChildElement = (props: Omit<SelectElementProps, 'kind'>) => (
  <SelectElement kind={ElementTypeKind.ChildrenOnly} {...props} />
)

export const SelectExcludeDescendantsElements = (
  props: Omit<SelectElementProps, 'kind'>,
) => (
  <SelectElement kind={ElementTypeKind.ExcludeDescendantsElements} {...props} />
)

export const SelectDescendantElement = (
  props: Omit<SelectElementProps, 'kind'>,
) => {
  return <SelectElement kind={ElementTypeKind.DescendantsOnly} {...props} />
}

export const SelectAnyElement = (props: Omit<SelectElementProps, 'kind'>) => (
  <SelectElement kind={ElementTypeKind.AllElements} {...props} />
)

export const getSelectElementComponent = (kind: ElementTypeKind) => {
  switch (kind) {
    case ElementTypeKind.AllElements:
      return SelectAnyElement
    case ElementTypeKind.DescendantsOnly:
      return SelectDescendantElement
    case ElementTypeKind.ChildrenOnly:
      return SelectChildElement
    case ElementTypeKind.ExcludeDescendantsElements:
      return SelectExcludeDescendantsElements
    default:
      throw new Error(`ElementTypeKind ${kind} not recognized`)
  }
}
