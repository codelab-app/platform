import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
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

  const [{ error, loading, value: result = [] }, getTypes] = useAsyncFn(() =>
    typeService.getOptions(),
  )

  // On update mode, the current selected type can be used
  // to show the type name instead of showing just the id
  const currentType = fieldProps.value
    ? typeDomainService.types.get(fieldProps.value)
    : undefined

  const typeOptions = pipe(
    [currentType, ...result],
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
      onDropdownVisibleChange={async (open) => {
        if (open && !result.length) {
          await getTypes()
        }
      }}
      optionFilterProp="label"
      options={typeOptions}
      showSearch
    />
  )
})
