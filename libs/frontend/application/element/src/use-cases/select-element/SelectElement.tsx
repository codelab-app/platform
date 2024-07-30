import type { SelectElementOption } from '@codelab/frontend/abstract/application'
import { useFormContext } from '@codelab/frontend-presentation-components-form'
import type { IElementTypeKind } from '@codelab/shared/abstract/core'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { SelectField, type SelectFieldProps } from 'uniforms-antd'
import { useElementService } from '../../services'

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
  const elementService = useElementService()

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
      // @ts-expect-error
      optionFilterProp="label"
      options={selectOptions}
      showSearch
    />
  )
}
