'use client'

/* eslint-disable react/jsx-props-no-spreading */
import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'
import type { FieldProps } from 'uniforms'
import type { SelectFieldProps } from 'uniforms-antd'

import { getSelectComponentOptions } from '@codelab/frontend-domain-component/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import { SelectField } from 'uniforms-antd'

export type SelectComponentProps = Pick<
  FieldProps<
    string,
    SelectFieldProps,
    {
      component?: Pick<IComponentModel, 'id' | 'name'>
    }
  >,
  'component' | 'error' | 'label' | 'name' | 'onChange'
>

export const SelectComponent = ({
  component,
  ...fieldProps
}: SelectComponentProps) => {
  const { componentDomainService } = useDomainStore()

  const [
    { error: queryError, loading, value: result },
    selectComponentOptions,
  ] = useAsyncFn<() => Promise<Array<SelectOption> | undefined>>(
    () => getSelectComponentOptions(componentDomainService, component),
    [],
    {
      // Start with loading state, so we don't show the initial value until label is fetched
      loading: true,
    },
  )

  useEffect(() => {
    void selectComponentOptions()
  }, [])

  const errors = fieldProps.error || queryError

  console.log(errors)

  return (
    <SelectField
      {...fieldProps}
      error={errors}
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
