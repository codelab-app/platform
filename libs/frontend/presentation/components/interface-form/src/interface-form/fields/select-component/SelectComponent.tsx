'use client'

/* eslint-disable react/jsx-props-no-spreading */
import type { IRuntimeComponentModel } from '@codelab/frontend/abstract/application'
import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'
import type { IElementDto } from '@codelab/shared/abstract/core'
import type { SelectProps } from 'antd'
import type { Ref } from 'mobx-keystone'
import type { AsyncState } from 'react-use/lib/useAsyncFn'
import type { SelectFieldProps } from 'uniforms-antd'

import { logger, tracker } from '@codelab/frontend/infra/logger'
import { getSelectComponentOptions } from '@codelab/frontend-domain-component/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import { stringToPath } from 'remeda'
import { type FieldProps, useField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

export type SelectComponentProps = Pick<
  FieldProps<
    SelectOption,
    SelectFieldProps,
    {
      component?: Pick<IComponentModel, 'id' | 'name'>
    }
  >,
  'component' | 'label' | 'name'
>

export const SelectComponent = ({
  component,
  label,
  name,
}: SelectComponentProps) => {
  const { componentDomainService } = useDomainStore()

  /**
   * This takes the value from the field specified. We use this only to access the data field from the form
   *
   * This then becomes the source of data truth for the form
   */
  const [fieldProps] = useField(
    name,
    {
      value: component ? { id: component.id } : undefined,
    },
    { absoluteName: true, initialValue: true },
  )

  const [
    { error: queryError, loading, value: results },
    selectComponentOptions,
  ] = useAsyncFn<() => Promise<Array<SelectOption> | undefined>>(
    () => getSelectComponentOptions(componentDomainService, component),
    [],
    {
      loading: false,
      /**
       * The way to show the initial value is to add the data to options, uniform will automatically pick it up
       */
      value: component
        ? [
            {
              label: component.name,
              value: component.id,
            },
          ]
        : undefined,
    },
  )

  console.log('result', result)

  console.log('fieldProps', fieldProps)

  return (
    <SelectField
      {...fieldProps}
      // allowClear
      error={queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label={label}
      loading={loading}
      // We need to select the `id` here, so the select options can be rendered
      onChange={(selectedComponentId) => {
        // When clearing, selectedComponentId will be undefined/null
        fieldProps.onChange(
          selectedComponentId ? { id: selectedComponentId } : undefined,
        )
      }}
      onDropdownVisibleChange={async (open) => {
        if (open && !results) {
          await selectComponentOptions()
        }
      }}
      // The nested `SelectField` passes back the `SelectOption` to us
      optionFilterProp="label"
      options={results}
      // required={false}
      showSearch
      value={fieldProps.value?.id}
    />
  )
}
