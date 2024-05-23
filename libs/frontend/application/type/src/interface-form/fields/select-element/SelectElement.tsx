/* eslint-disable react/jsx-props-no-spreading */
import type { SelectElementOption } from '@codelab/frontend/abstract/application'
import { useStore } from '@codelab/frontend/application/shared/store'
import { useFormContext } from '@codelab/frontend-presentation-view/components'
import { IElementTypeKind } from '@codelab/shared/abstract/core'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { SelectField } from 'uniforms-antd'
import type { SelectFieldProps } from 'uniforms-antd/cjs/SelectField'

export type SelectElementProps = UniformSelectFieldProps & {
  allElementOptions?: Array<SelectElementOption>
  disableWhenOneOpt?: boolean
  kind: IElementTypeKind
  targetElementId?: string
}

export const SelectElement = ({
  allElementOptions,
  disableWhenOneOpt = false,
  kind,
  name,
  targetElementId,
  ...props
}: SelectElementProps) => {
  const { elementTree } = useFormContext()
  const { elementService } = useStore()

  const selectOptions = elementService.getSelectElementOptions({
    allElementOptions,
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
      // @ts-ignore
      optionFilterProp="label"
      options={selectOptions}
      showSearch
    />
  )
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
