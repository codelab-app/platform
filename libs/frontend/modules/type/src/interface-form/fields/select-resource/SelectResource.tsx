import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import React, { useEffect } from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'

export type SelectResourcesApiProps = HTMLFieldProps<string, SelectFieldProps> &
  WithServices<RESOURCE_SERVICE>

export const SelectResource = ({
  name,
  error,
  resourceService,
}: SelectResourcesApiProps) => {
  const [getResources, { isLoading }] = useStatefulExecutor(() =>
    resourceService.getAll(),
  )

  useEffect(() => {
    getResources()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const options =
    resourceService?.resourceList.map((resource) => ({
      label: resource.name,
      value: resource.id,
    })) ?? []

  return (
    <SelectField
      error={error}
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={options}
      showSearch={true}
    />
  )
}
