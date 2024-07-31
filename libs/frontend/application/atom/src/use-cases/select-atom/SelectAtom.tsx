import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { mapAtomOptions } from '@codelab/frontend-domain-atom/store'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { useAsync } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useField } from 'uniforms'
import { SelectField } from 'uniforms-antd'
import { useAtomService } from '../../services'

export type SelectAtomProps = Pick<
  UniformSelectFieldProps,
  'error' | 'label' | 'name'
> & {
  /**
   * Used for atom validation
   */
  parent?: IAtomModel
}

export const SelectAtom = observer<SelectAtomProps>(
  ({ error, label, name, parent }) => {
    const atomService = useAtomService()
    const { atomDomainService } = useDomainStore()
    const [fieldProps] = useField<{ value?: string }>(name, {})
    const fallbackAtomOptions = atomDomainService.atomsList.map(mapAtomOptions)

    const [{ error: queryError, result, status }, getSelectAtomOptions] =
      useAsync(() =>
        atomService.getSelectAtomOptions({ ...fieldProps, label }, parent),
      )

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
  },
)
