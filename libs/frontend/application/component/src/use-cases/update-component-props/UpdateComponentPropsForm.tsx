import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { AdminPropsPanel } from '@codelab/frontend/application/admin'
import { useStore } from '@codelab/frontend/application/shared/store'
import { PropsForm } from '@codelab/frontend/application/type'
import { getDefaultFieldProps, mergeProps } from '@codelab/frontend/domain/prop'
import { Spinner } from '@codelab/frontend/presentation/view'
import type { IPropData } from '@codelab/shared/abstract/core'
import { filterEmptyStrings } from '@codelab/shared/utils'
import { useAsync } from '@react-hookz/web'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'

export interface UpdateComponentPropsFormProps {
  component: IComponentModel
}

export const UpdateComponentPropsForm = observer<UpdateComponentPropsFormProps>(
  ({ component }) => {
    const { propService, typeService } = useStore()
    const apiId = component.api.id

    const [{ result: interfaceType, status }, getInterface] = useAsync(() =>
      typeService.getInterface(apiId),
    )

    useEffect(() => {
      void getInterface.execute()
    }, [apiId])

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
      getDefaultFieldProps(component),
      component.props.current.values,
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