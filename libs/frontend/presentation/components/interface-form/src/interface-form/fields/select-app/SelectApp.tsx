'use client'

import type { SelectOption } from '@codelab/frontend-abstract-types'
import type { UniformSelectFieldProps } from '@codelab/shared-abstract-types'

import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { useAsyncFn } from 'react-use'
import { SelectField } from 'uniforms-antd'

export const SelectApp = ({ error, name }: UniformSelectFieldProps) => {
  const [{ error: queryError, loading, value: options }, loadOptions] =
    useAsyncFn<() => Promise<Array<SelectOption> | undefined>>(
      () =>
        appRepository.find().then((data) =>
          data.items.map((app) => ({
            label: app.name,
            value: app.id,
          })),
        ),
      [],
    )

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      loading={loading}
      name={name}
      onDropdownVisibleChange={async (open) => {
        if (open) {
          await loadOptions()
        }
      }}
      optionFilterProp="label"
      options={options}
      showSearch
    />
  )
}
