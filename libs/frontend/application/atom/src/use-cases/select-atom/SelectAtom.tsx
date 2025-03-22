import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'

import { mapEntitySelectOptions } from '@codelab/frontend-domain-atom/store'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useAsyncFn } from 'react-use'
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
    const [fieldProps] = useField<{ value?: Array<{ id: string }> }>(name, {})

    const fallbackAtomOptions = atomDomainService.atomsList.map(
      mapEntitySelectOptions,
    )

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
        onChange={(value) =>
          fieldProps.onChange(value.map((id: string) => ({ id })))
        }
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
        value={fieldProps.value?.map((ref) => ref.id)}
      />
    )
  },
)
