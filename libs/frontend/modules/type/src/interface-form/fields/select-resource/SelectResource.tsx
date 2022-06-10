import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { SelectField } from 'uniforms-antd'

export type SelectResourcesProps = WithServices<RESOURCE_SERVICE> & {
  name: string
}

export const SelectResource = observer<SelectResourcesProps>(
  ({ name, resourceService }) => {
    const [getResources, { isLoading, error }] = useStatefulExecutor(() =>
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
        showSearch
      />
    )
  },
)
