'use client'

/* eslint-disable react/jsx-props-no-spreading */
import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'
import type { IRef } from '@codelab/shared/abstract/core'
import type { SelectFieldProps } from 'uniforms-antd'

import { getSelectComponentOptions } from '@codelab/frontend-domain-component/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import { connectField, type FieldProps, type GuaranteedProps } from 'uniforms'
import { SelectField } from 'uniforms-antd'

export type SelectComponentProps = GuaranteedProps<IRef> & {
  component?: Pick<IComponentModel, 'id' | 'name'>
}

/**
 * Parent will pass the complete dot notation path to the field
 *
 * e.g.
 *
 * name="childMapperComponent.id"
 */
export const SelectComponent = connectField(
  ({ component, ...props }: SelectComponentProps) => {
    const { componentDomainService } = useDomainStore()

    const [
      { error: queryError, loading, value: result },
      selectComponentOptions,
    ] = useAsyncFn<() => Promise<Array<SelectOption> | undefined>>(
      () => componentDomainService.getSelectOptions(component),
      [],
      {
        // Start with loading state, so we don't show the initial value until label is fetched
        loading: true,
      },
    )

    useEffect(() => {
      void selectComponentOptions()
    }, [])

    const errors = props.error || queryError

    return (
      <SelectField
        {...props}
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
        // Don't show value until we load the labels
        value={loading ? undefined : props.value}
      />
    )
  },
  { kind: 'leaf' },
)
