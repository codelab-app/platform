'use client'

import type { IRuntimeComponentModel } from '@codelab/frontend/abstract/application'
import { AdminPropsPanel } from '@codelab/frontend-application-admin/use-cases/admin-props-panel'
import { useStore } from '@codelab/frontend/infra/mobx'
import { PropsForm } from '@codelab/frontend-application-type/props-form'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import type { IPropData } from '@codelab/shared/abstract/core'
import { filterEmptyStrings } from '@codelab/shared/utils'
import { useAsync } from '@react-hookz/web'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { Fragment, useEffect } from 'react'

export interface UpdateComponentPropsFormProps {
  runtimeComponent: IRuntimeComponentModel
}

export const UpdateComponentPropsForm = observer<UpdateComponentPropsFormProps>(
  ({ runtimeComponent }) => {
    const { propService, typeService } = useStore()
    const component = runtimeComponent.component.current
    const api = component.api.current

    const [{ result: interfaceType, status }, getInterface] = useAsync(() =>
      typeService.getInterface(api.id),
    )

    useEffect(() => {
      void getInterface.execute()
    }, [api.id])

    const onSubmit = async (data: IPropData) => {
      const filteredData = filterEmptyStrings(data)

      return propService.update(component.props, {
        data: JSON.stringify(filteredData),
        id: component.props.id,
      })
    }

    // We only set the `defaultValues` as an initial value, not as `defaultValue` in the schema
    // so that the value of `defaultValues` wont show when the field is cleared
    const propsModel = mergeProps(
      component.api.current.defaultValues,
      component.props.values,
    )

    return (
      <Spinner isLoading={status === 'loading'}>
        {interfaceType && (
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <PropsForm
                autosave
                interfaceType={interfaceType}
                key={component.id}
                model={propsModel}
                onSubmit={onSubmit}
                submitField={Fragment}
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
