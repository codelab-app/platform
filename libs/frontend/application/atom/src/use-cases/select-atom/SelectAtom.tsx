import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync } from '@react-hookz/web'
import React from 'react'
import { SelectField } from 'uniforms-antd'
import { atomListUseCase } from '../get-atoms/server'
import { useAtomOptionsList } from './useAtomOptionsList.hook'

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
  const [{ error: queryError, result, status }, getSelectAtomOptions] =
    useAsync(() => atomListUseCase())

  const atomOptionsList = useAtomOptionsList(result?.atoms ?? [], parent)

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
      options={atomOptionsList}
      showSearch
    />
  )
}
