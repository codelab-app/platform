/* eslint-disable react/jsx-props-no-spreading */
import type { IRuntimeComponentModel } from '@codelab/frontend/abstract/application'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { getSelectComponentOptions } from '@codelab/frontend-domain-component/repositories'
import { useAsync } from '@react-hookz/web'
import type { Ref } from 'mobx-keystone'
import React from 'react'
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

  const [{ error: queryError, result, status }, selectComponentOptions] =
    useAsync(() =>
      getSelectComponentOptions(componentDomainService, activeComponent),
    )

  return (
    <SelectField
      {...fieldProps}
      error={fieldProps.error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      loading={status === 'loading'}
      onDropdownVisibleChange={async (open) => {
        if (open && status === 'not-executed') {
          await selectComponentOptions.execute()
        }
      }}
      optionFilterProp="label"
      options={result}
      showSearch
    />
  )
}
