import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { mapAtomOptions } from '@codelab/frontend/domain/atom'
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

  const fallbackAtomOptions =
    atomService.atomDomainService.atomsList.map(mapAtomOptions)

  const [{ error: queryError, result, status }, getSelectAtomOptions] =
    useAsync(() => atomService.getSelectAtomOptions(fieldProps, parent))

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
      onSelect={(value, option) => {
        /**
         * Api will be used in subsequent steps such as the `ElementTreeItemElementTitle` for field validation.
         *
         * Fetch here instead of createElement so we save some time
         */
        // return atomService.loadApi(value)
      }}
      optionFilterProp="label"
      optionLabelProp="label"
      options={result ?? fallbackAtomOptions}
      showSearch
    />
  )
}
