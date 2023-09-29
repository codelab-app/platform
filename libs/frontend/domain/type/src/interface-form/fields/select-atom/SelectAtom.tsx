import type { IAtomModel } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync } from '@react-hookz/web'
import React from 'react'
import { useField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

export type SelectAtomProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name'
> & {
  /**
   * Used for atom validation
   */
  parent?: IAtomModel
}

export const SelectAtom = ({ error, label, name, parent }: SelectAtomProps) => {
  const { atomService } = useStore()
  const [fieldProps] = useField<{ value?: string }>(name, {})

  const [{ error: queryError, result, status }, getSelectAtomOptions] =
    useAsync(() => atomService.getSelectAtomOptions(fieldProps, parent))

  console.log(fieldProps)

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label={label}
      loading={status === 'loading'}
      name={name}
      onDropdownVisibleChange={async (open) => {
        if (open && status === 'not-executed') {
          await getSelectAtomOptions.execute()
        }
      }}
      optionLabelProp="label"
      options={result ?? []}
      showSearch
    />
  )
}
