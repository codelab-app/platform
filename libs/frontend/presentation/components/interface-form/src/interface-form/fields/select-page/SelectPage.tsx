'use client'
import type { IAppModel } from '@codelab/frontend-abstract-domain'
import type { UniformSelectFieldProps } from '@codelab/shared-abstract-types'
import { getSelectPageOptions } from '@codelab/frontend-domain-page/repositories'
import { useAsyncFn } from 'react-use'
import { SelectField } from 'uniforms-antd'

export type SelectPageProps = SelectFieldProps & {
  app: IAppModel
}

export const SelectPage = ({ app, error, label, name }: SelectPageProps) => {
  const [
    { error: queryError, loading, value: selectPageOptions = [] },
    executeGetSelectPageOptions,
  ] = useAsyncFn(() => getSelectPageOptions(app.id))

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      label={label}
      loading={loading}
      name={name}
      onOpenChange={async (open) => {
        if (open && !selectPageOptions.length) {
          await executeGetSelectPageOptions()
        }
      }}
      optionFilterProp="label"
      options={selectPageOptions}
      showSearch
    />
  )
}
