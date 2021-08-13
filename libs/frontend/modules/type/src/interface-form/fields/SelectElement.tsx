import {
  ComponentContext,
  PageContext,
  useElementIdContext,
} from '@codelab/frontend/presenter/container'
import {
  ElementFragment,
  ElementTypeKind,
} from '@codelab/shared/codegen/graphql'
import React, { useContext } from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'

export type SelectElementProps = HTMLFieldProps<string, SelectFieldProps> & {
  kind: ElementTypeKind
}

export const SelectElement = ({ name, kind }: SelectElementProps) => {
  const pageContext = useContext(PageContext)
  const componentContext = useContext(ComponentContext)
  const tree = pageContext?.tree ?? componentContext?.tree

  if (!tree) {
    throw new Error(
      'Either a PageContext or a ComponentContext is needed for SelectElement',
    )
  }

  let elements: Array<ElementFragment>
  const elementIdContext = useElementIdContext()

  if (!elementIdContext) {
    console.warn(
      'SelectElement needs ElementIdContext, but it was not found. Will display All Elements',
    )
    elements = tree.getAllNodes()
  } else {
    switch (kind) {
      case ElementTypeKind.AllElements:
        elements = tree.getAllNodes()
        break
      case ElementTypeKind.ChildrenOnly:
        elements = tree.getChildren(elementIdContext.elementId)
        break
      case ElementTypeKind.DescendantsOnly:
        elements = tree.getDescendants(elementIdContext.elementId)
        break
      default:
        elements = []
    }
  }

  const elementOptions = elements.map(({ id, name: elementName }) => ({
    label: elementName,
    value: id,
  }))

  return (
    <SelectField
      options={elementOptions}
      name={name}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      showSearch={true}
      optionFilterProp="label"
    />
  )
}

export const SelectChildElement = (props: Omit<SelectElementProps, 'kind'>) => (
  <SelectElement kind={ElementTypeKind.ChildrenOnly} {...props} />
)

export const SelectDescendantElement = (
  props: Omit<SelectElementProps, 'kind'>,
) => <SelectElement kind={ElementTypeKind.DescendantsOnly} {...props} />

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
  }

  throw new Error(`ElementTypeKind ${kind} not recognized`)
}
