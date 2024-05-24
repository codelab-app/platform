import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { useAsync } from '@react-hookz/web'
import compact from 'lodash/compact'
import uniqBy from 'lodash/uniqBy'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

export interface TypeSelectProps {
  label: string
  name: string
}

export const TypeSelect = observer<TypeSelectProps>(({ label, name }) => {
  const { typeService } = useStore()
  const [fieldProps] = useField<{ value?: string }>(name, {})

  const [{ error, result = [], status }, getTypes] = useAsync(() =>
    typeService.getOptions(),
  )

  // On update mode, the current selected type can be used
  // to show the type name instead of showing just the id
  const currentType = fieldProps.value
    ? typeService.typeDomainService.types.get(fieldProps.value)
    : undefined

  const typeOptions = uniqBy(compact([currentType, ...result]), 'id').map(
    ({ id, name: optionLabel }) => ({
      label: optionLabel,
      value: id,
    }),
  )

  return (
    <SelectField
      error={error}
      label={label}
      loading={status === 'loading'}
      name={name}
      onDropdownVisibleChange={async (open) => {
        if (open && status === 'not-executed') {
          await getTypes.execute()
        }
      }}
      optionFilterProp="label"
      options={typeOptions}
      showSearch
    />
  )
})
