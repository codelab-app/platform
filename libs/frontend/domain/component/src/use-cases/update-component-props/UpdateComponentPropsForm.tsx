import type { IComponent, IPropData } from '@codelab/frontend/abstract/core'
import { AdminPropsPanel } from '@codelab/frontend/domain/admin'
import { PropsForm } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presenter/container'
import type { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import { Spinner } from '@codelab/frontend/view/components'
import { filterEmptyStrings } from '@codelab/shared/utils'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'

export interface UpdateComponentPropsFormProps {
  component: IComponent
  trackPromises?: UseTrackLoadingPromises
}

export const UpdateComponentPropsForm = observer<UpdateComponentPropsFormProps>(
  ({ component, trackPromises }) => {
    const { typeService, componentService } = useStore()
    const { trackPromise } = trackPromises ?? {}
    const apiId = component.api.id

    const { value: interfaceType, loading } = useAsync(
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

    return (
      <Spinner isLoading={loading}>
        {interfaceType && (
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <PropsForm
                autosave
                interfaceType={interfaceType}
                key={component.id}
                model={component.props?.values ?? {}}
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
