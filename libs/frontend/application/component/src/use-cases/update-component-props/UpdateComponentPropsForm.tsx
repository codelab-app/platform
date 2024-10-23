'use client'

import type { IRuntimeComponentModel } from '@codelab/frontend/abstract/application'
import type { IPropData } from '@codelab/shared/abstract/core'

import { PropsForm } from '@codelab/frontend/presentation/components/interface-form'
import { AdminPropsPanel } from '@codelab/frontend-application-admin/use-cases/admin-props-panel'
import { usePropService } from '@codelab/frontend-application-prop/services'
import { useTypeService } from '@codelab/frontend-application-type/services'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { filterEmptyStrings } from '@codelab/shared/utils'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { Fragment, useEffect } from 'react'
import { useAsyncFn } from 'react-use'

export interface UpdateComponentPropsFormProps {
  runtimeComponent: IRuntimeComponentModel
}

export const UpdateComponentPropsForm = observer<UpdateComponentPropsFormProps>(
  ({ runtimeComponent }) => {
    const typeService = useTypeService()
    const propService = usePropService()
    const component = runtimeComponent.component.current
    const api = component.api.current

    const [{ loading, value: interfaceType }, getInterface] = useAsyncFn(() =>
      typeService.getInterface(api.id),
    )

    useEffect(() => {
      void getInterface()
    }, [api.id, getInterface])

    const onSubmit = async (data: IPropData) => {
      const filteredData = filterEmptyStrings(data)

      return propService.update({
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
