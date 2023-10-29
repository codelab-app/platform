/* eslint-disable react/jsx-props-no-spreading */
import { useStore } from '@codelab/frontend/application/shared/store'
import { useAsync } from '@react-hookz/web'
import React from 'react'
import type { SelectFieldProps } from 'uniforms-antd'
import { SelectField } from 'uniforms-antd'

export type SelectComponentProps = Partial<
  Pick<SelectFieldProps, 'error' | 'label' | 'onChange'>
> &
  Pick<SelectFieldProps, 'name'>

export const SelectComponent = ({ ...fieldProps }: SelectComponentProps) => {
  const { componentService } = useStore()

  const [{ error: queryError, result, status }, getSelectComponentOptions] =
    useAsync(() => componentService.getSelectComponentOptions())

  const componentOptions = result || []
  const propOptions = componentService.getSelectActiveComponentPropOptions()

  return (
    <SelectField
      {...fieldProps}
      error={fieldProps.error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      loading={status === 'loading'}
      onDropdownVisibleChange={async (open) => {
        if (open && status === 'not-executed') {
          await getSelectComponentOptions.execute()
        }
      }}
      optionFilterProp="label"
      options={[...componentOptions, ...propOptions]}
      showSearch
    />
  )
}
