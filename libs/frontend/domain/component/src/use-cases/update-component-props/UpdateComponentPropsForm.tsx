import type { IComponent, IPropData } from '@codelab/frontend/abstract/core'
import { AdminPropsPanel } from '@codelab/frontend/domain/admin'
import { PropsForm } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presenter/container'
import type { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import { Spinner } from '@codelab/frontend/view/components'
import { filterEmptyStrings, mergeProps } from '@codelab/shared/utils'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import { getDefaultComponentFieldProps } from '../../store'

export interface UpdateComponentPropsFormProps {
  component: IComponent
  trackPromises?: UseTrackLoadingPromises
}

export const UpdateComponentPropsForm = observer<UpdateComponentPropsFormProps>(
  ({ component, trackPromises }) => {
    const { componentService, typeService } = useStore()
    const { trackPromise } = trackPromises ?? {}
    const apiId = component.api.id

    const { loading, value: interfaceType } = useAsync(
      () => typeService.getInterfaceAndDescendants(apiId),
      [apiId],
    )

    const onSubmit = (data: IPropData) => {
      const filteredData = filterEmptyStrings(data)

      const promise = componentService.patchComponent(component, {
        props: {
          update: {
            node: {
              data: JSON.stringify(filteredData),
            },
          },
        },
      })

      return trackPromise?.(promise) ?? promise
    }

    // We only set the `defaultValues` as an initial value, not as `defaultValue` in the schema
    // so that the value of `defaultValues` wont show when the field is cleared
    const propsModel = mergeProps(
      getDefaultComponentFieldProps(component),
      component.props?.current.values,
    )

    return (
      <Spinner isLoading={loading}>
        {interfaceType && (
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <PropsForm
                autosave
                interfaceType={interfaceType}
                key={component.id}
                model={propsModel}
                onSubmit={onSubmit}
                submitField={React.Fragment}
              />
            </Col>
            <Col span={24}>
              <AdminPropsPanel interfaceType={interfaceType} />
            </Col>
          </Row>
        )}
      </Spinner>
    )
  },
)
