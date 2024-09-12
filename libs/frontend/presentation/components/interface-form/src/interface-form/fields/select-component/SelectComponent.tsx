/* eslint-disable react/jsx-props-no-spreading */
import type { IRuntimeComponentModel } from '@codelab/frontend/abstract/application'
import { getSelectComponentOptions } from '@codelab/frontend-domain-component/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import type { Ref } from 'mobx-keystone'
import { useAsyncFn } from 'react-use'
import type { SelectFieldProps } from 'uniforms-antd'
import { SelectField } from 'uniforms-antd'

export type SelectComponentProps = Partial<
  Pick<SelectFieldProps, 'error' | 'label' | 'onChange'>
> &
  Pick<SelectFieldProps, 'name'> & {
    activeComponent?: Ref<IRuntimeComponentModel>
  }

export const SelectComponent = ({
  activeComponent,
  ...fieldProps
}: SelectComponentProps) => {
  const { componentDomainService } = useDomainStore()

  const [
    { error: queryError, loading, value: result },
    selectComponentOptions,
  ] = useAsyncFn(() =>
    getSelectComponentOptions(componentDomainService, activeComponent),
  )

  return (
    <SelectField
      {...fieldProps}
      error={fieldProps.error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      loading={loading}
      onDropdownVisibleChange={async (open) => {
        if (open && !result) {
          await selectComponentOptions()
        }
      }}
      optionFilterProp="label"
      options={result}
      showSearch
    />
  )
}
