import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { mapAtomOptions } from '@codelab/frontend-domain-atom/store'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsyncFn } from 'react-use'
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
    const fallbackAtomOptions = atomDomainService.atomsList.map(mapAtomOptions)

    const [state, getSelectAtomOptions] = useAsyncFn(() =>
      atomService.getSelectAtomOptions(parent),
    )

    return (
      <SelectField
        error={error || state.error}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        label={label}
        loading={state.loading}
        name={name}
        onDropdownVisibleChange={async (open) => {
          if (open && !state.loading && !state.value) {
            await getSelectAtomOptions()
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
        options={state.value ?? fallbackAtomOptions}
        showSearch
      />
    )
  },
)
