import { IElement } from '@codelab/frontend/abstract/core'
import { useElementIdContext } from '@codelab/frontend/presenter/container'
import { ElementTypeKind } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { difference } from 'lodash'
import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { useSelectElementContext } from './SelectElementContext'

export type SelectElementProps = HTMLFieldProps<string, SelectFieldProps> & {
  kind: ElementTypeKind
}

export const SelectElement = ({ name, kind, ...props }: SelectElementProps) => {
  const context = useSelectElementContext()
  const tree = context?.tree

  if (!tree) {
    throw new Error('A SelectElementProvider is needed for SelectElement')
  }

  let elements: Array<IElement>
  const elementIdContext = useElementIdContext()

  if (!elementIdContext) {
    console.warn(
      'SelectElement needs ElementIdContext, but it was not found. Will display All Elements',
    )
    elements = tree.getAllVertices()
  } else {
    switch (kind) {
      case ElementTypeKind.AllElements:
        elements = tree.getAllVertices(ElementTree.isElement)
        break
      case ElementTypeKind.ChildrenOnly:
        elements = tree.getChildren(elementIdContext.elementId)
        break
      case ElementTypeKind.DescendantsOnly:
        elements = tree.getDescendants(elementIdContext.elementId)
        break
      case ElementTypeKind.ExcludeDescendantsElements:
        elements = difference(
          tree.getAllVertices(ElementTree.isElement),
          tree.getDescendants(elementIdContext.elementId),
        ).filter((x) => x.id !== elementIdContext.elementId) // remove the element itself
        break
      default:
        elements = []
    }
  }

  const elementOptions = elements.map(({ id, name: elementName, atom }) => ({
    label: elementName || atom?.type,
    value: id,
  }))

  return (
    <SelectField
      name={name}
      optionFilterProp="label"
      options={elementOptions}
      showSearch
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(props as any)}
      disabled={elementOptions.length === 1 || !elementOptions.length}
    />
  )
}

export const SelectChildElement = (props: Omit<SelectElementProps, 'kind'>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <SelectElement kind={ElementTypeKind.ChildrenOnly} {...props} />
)

export const SelectExcludeDescendantsElements = (
  props: Omit<SelectElementProps, 'kind'>,
) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <SelectElement kind={ElementTypeKind.ExcludeDescendantsElements} {...props} />
)

export const SelectDescendantElement = (
  props: Omit<SelectElementProps, 'kind'>,
) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <SelectElement kind={ElementTypeKind.DescendantsOnly} {...props} />
}

export const SelectAnyElement = (props: Omit<SelectElementProps, 'kind'>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
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
