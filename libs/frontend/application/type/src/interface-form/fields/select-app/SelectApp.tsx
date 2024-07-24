'use client'

import {
  AppListDocument,
  type AppListQuery,
  type AppListQueryVariables,
} from '@codelab/frontend/infra/gql'
import { useLazySwr } from '@codelab/frontend/infra/graphql/client'
import type { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { SelectField } from 'uniforms-antd'

export const SelectApp = ({ error, name }: UniformSelectFieldProps) => {
  // const [
  //   { error: queryError, result: selectAppOptions = [], status },
  //   useSelectAppOptions,
  // ] = useAsync(() => useSelectAppOptions())

  const [trigger, { data, error: queryError, isLoading }] = useLazySwr<
    AppListQuery,
    AppListQueryVariables
  >(AppListDocument)

  return (
    <SelectField
      error={error || queryError}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      loading={isLoading}
      name={name}
      onDropdownVisibleChange={async (open) => {
        if (open) {
          await trigger()
        }
      }}
      optionFilterProp="label"
      options={data?.apps}
      showSearch
    />
  )
}
