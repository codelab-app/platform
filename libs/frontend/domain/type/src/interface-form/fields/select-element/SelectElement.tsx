/* eslint-disable react/jsx-props-no-spreading */
import { useFormContext } from '@codelab/frontend/view/components'
import { IElementTypeKind } from '@codelab/shared/abstract/core'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import difference from 'lodash/difference'
import React from 'react'
import { SelectField } from 'uniforms-antd'
import type { SelectFieldProps } from 'uniforms-antd/cjs/SelectField'

export interface SelectElementOption {
  label: string
  value: string
  childrenIds?: Array<string>
}

export type SelectElementProps = UniformSelectFieldProps & {
  kind: IElementTypeKind
  allElementOptions?: Array<SelectElementOption>
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
  const { elementTree } = useFormContext()
  let elements: Array<SelectElementOption>

  allElementOptions ??=
    elementTree?.elementsList.map(({ id, label, children }) => ({
      value: id,
      label: label,
      childrenIds: children.map((child) => child.id),
    })) ?? []

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
      case IElementTypeKind.AllElements:
        elements = allElementOptions
        break

      case IElementTypeKind.ChildrenOnly: {
        elements = getElementChildren(targetElement, elementMap)

        break
      }

      case IElementTypeKind.DescendantsOnly: {
        elements = getDescendants(targetElement, elementMap)

        break
      }

      case IElementTypeKind.ExcludeDescendantsElements:
        elements = difference(
          allElementOptions,
          getDescendants(targetElement, elementMap),
        )
          // remove the element itself
          .filter(({ value }) => value !== targetElement.value)
        break
      default:
        elements = []
    }
  }

  return (
    <SelectField
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      {...(props as SelectFieldProps)}
      disabled={
        disableWhenOneOpt && (elements.length === 1 || !elements.length)
      }
      name={name}
      optionFilterProp="label"
      options={elements}
      showSearch
    />
  )
}

const getElementChildren = (
  el: SelectElementOption,
  elementMap: Record<string, SelectElementOption>,
) =>
  el.childrenIds
    ?.map((childId) => elementMap[childId])
    .filter((selectElementOption): selectElementOption is SelectElementOption =>
      Boolean(selectElementOption),
    ) ?? []

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
  <SelectElement kind={IElementTypeKind.ChildrenOnly} {...props} />
)

export const SelectExcludeDescendantsElements = (
  props: Omit<SelectElementProps, 'kind'>,
) => (
  <SelectElement
    kind={IElementTypeKind.ExcludeDescendantsElements}
    {...props}
  />
)

export const SelectDescendantElement = (
  props: Omit<SelectElementProps, 'kind'>,
) => {
  return <SelectElement kind={IElementTypeKind.DescendantsOnly} {...props} />
}

export const SelectAnyElement = (props: Omit<SelectElementProps, 'kind'>) => (
  <SelectElement kind={IElementTypeKind.AllElements} {...props} />
)

export const getSelectElementComponent = (kind: IElementTypeKind) => {
  switch (kind) {
    case IElementTypeKind.AllElements:
      return SelectAnyElement
    case IElementTypeKind.DescendantsOnly:
      return SelectDescendantElement
    case IElementTypeKind.ChildrenOnly:
      return SelectChildElement
    case IElementTypeKind.ExcludeDescendantsElements:
      return SelectExcludeDescendantsElements
    default:
      throw new Error(`IElementTypeKind ${kind} not recognized`)
  }
}
