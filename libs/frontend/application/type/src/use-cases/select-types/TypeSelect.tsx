import type { SelectOption } from '@codelab/frontend-abstract-types'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { observer } from 'mobx-react-lite'
import { useAsyncFn } from 'react-use'
import { filter, isTruthy, map, pipe, prop, uniqueBy } from 'remeda'
import { useField } from 'uniforms'
import { SelectField } from 'uniforms-antd'

import { useTypeService } from '../../services'

export interface TypeSelectProps {
  label: string
  name: string
}

export const TypeSelect = observer<TypeSelectProps>(({ label, name }) => {
  const typeService = useTypeService()
  const { typeDomainService } = useDomainStore()
  const [fieldProps] = useField<{ value?: string }>(name, {})

  const [{ error, loading, value: data = [] }, getTypes] = useAsyncFn(() =>
    typeService.getSelectOptions(),
  )

  const fieldValue = Array.isArray(fieldProps.value)
    ? fieldProps.value
    : [fieldProps.value]

  // On update mode, the current selected type can be used
  // to show the type name instead of showing just the id
  const currentTypes = fieldValue.map((typeId) =>
    typeDomainService.types.get(typeId),
  )

  const typeOptions: Array<SelectOption> = pipe(
    [...currentTypes, ...data],
    filter(isTruthy),
    uniqueBy(prop('id')),
    map(({ id, name: optionLabel }) => ({
      label: optionLabel,
      value: id,
    })),
  )

  return (
    <SelectField
      error={error}
      label={label}
      loading={loading}
      name={name}
      onChange={async (value) => {
        // loadType in case it is not alerady loaded
        await typeService.getAll([value])
        fieldProps.onChange(value)
      }}
      onDropdownVisibleChange={async (open) => {
        if (open && !data.length) {
          await getTypes()
        }
      }}
      optionFilterProp="label"
      options={typeOptions}
      showSearch
    />
  )
})
