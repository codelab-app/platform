import type { IAtomModel } from '@codelab/frontend-abstract-domain'
import type { UniformSelectFieldProps } from '@codelab/shared-abstract-types'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { observer } from 'mobx-react-lite'
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

export const SelectAtom = observer<SelectAtomProps>(
  ({ error, label, name, parent }) => {
    const { atomDomainService } = useDomainStore()
    const [fieldProps] = useField<{ value?: Array<{ id: string }> }>(name, {})

    return (
      <SelectField
        error={error}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        label={label}
        name={name}
        onChange={(value) =>
          fieldProps.onChange(value.map((id: string) => ({ id })))
        }
        optionFilterProp="label"
        optionLabelProp="label"
        options={atomDomainService.getSelectOptions(parent)}
        showSearch
        value={fieldProps.value?.map((ref) => ref.id)}
      />
    )
  },
)
