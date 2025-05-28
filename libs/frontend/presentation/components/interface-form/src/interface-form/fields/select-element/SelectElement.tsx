'use client'

/* eslint-disable react/jsx-props-no-spreading */
import type { SelectElementOption } from '@codelab/frontend-abstract-domain'
import type { SelectFieldProps } from 'uniforms-antd/cjs/SelectField'

import { getSelectElementOptions } from '@codelab/frontend-domain-element/repositories'
import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import { useApplicationStore } from '@codelab/frontend-infra-mobx-context'
import { useFormContext } from '@codelab/frontend-presentation-components-form'
import { IElementTypeKind } from '@codelab/shared-abstract-core'
import { SelectField } from 'uniforms-antd'

export type SelectElementProps = SelectFieldProps & {
  elementOptions?: Array<SelectElementOption>
  disableWhenOneOpt?: boolean
  kind: IElementTypeKind
  targetElementId?: string
}

export const SelectElement = ({
  disableWhenOneOpt = false,
  elementOptions,
  kind,
  name,
  targetElementId,
  ...props
}: SelectElementProps) => {
  const { elementTree } = useFormContext()

  const selectOptions = getSelectElementOptions({
    elementOptions,
    elementTree,
    kind,
    targetElementId,
  })

  return (
    <SelectField
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      {...(props as SelectFieldProps)}
      disabled={disableWhenOneOpt && !selectOptions.length}
      name={name}
      /**
       * Prop seems to exist but not in interface
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      optionFilterProp="label"
      options={selectOptions}
      showSearch
    />
  )
}

export const SelectChildElement = (props: SelectElementProps) => (
  <SelectElement {...props} kind={IElementTypeKind.ChildrenOnly} />
)

export const SelectExcludeDescendantsElements = (props: SelectElementProps) => (
  <SelectElement
    {...props}
    kind={IElementTypeKind.ExcludeDescendantsElements}
  />
)

export const SelectDescendantElement = (props: SelectElementProps) => {
  return <SelectElement {...props} kind={IElementTypeKind.DescendantsOnly} />
}

/**
 * Moved the `elementOptions` to the `SelectElement` component, so that it won't cause form to re-render
 */
export const SelectElementField = (props: SelectElementProps) => {
  const { rendererService } = useApplicationStore()
  const treeElements = rendererService.activeElementTree?.elements
  const elementOptions = treeElements?.map(mapElementOption)

  return (
    <SelectElement
      {...props}
      elementOptions={elementOptions}
      kind={IElementTypeKind.AllElements}
    />
  )
}

export const getSelectElementComponent = (kind: IElementTypeKind) => {
  switch (kind) {
    case IElementTypeKind.AllElements:
      return SelectElementField
    case IElementTypeKind.ChildrenOnly:
      return SelectChildElement
    case IElementTypeKind.DescendantsOnly:
      return SelectDescendantElement
    case IElementTypeKind.ExcludeDescendantsElements:
      return SelectExcludeDescendantsElements
    default:
      throw new Error(`IElementTypeKind ${kind} not recognized`)
  }
}
