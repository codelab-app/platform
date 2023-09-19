import type { IElementModel, IPropData } from '@codelab/frontend/abstract/core'
import { isComponentInstance } from '@codelab/frontend/abstract/core'
import type { SubmitController } from '@codelab/frontend/abstract/types'
import { AdminPropsPanel } from '@codelab/frontend/domain/admin'
import { PropsForm } from '@codelab/frontend/domain/type'
import {
  loadAllTypesForElements,
  useStore,
} from '@codelab/frontend/presentation/container'
import { Spinner } from '@codelab/frontend/presentation/view'
import type { Maybe } from '@codelab/shared/abstract/types'
import { getDefaultFieldProps, mergeProps } from '@codelab/shared/utils'
import { useAsync } from '@react-hookz/web'
import { Col, Row } from 'antd'
import type { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'

export interface UpdateElementPropsFormProps {
  element: Ref<IElementModel>
}

export const UpdateElementPropsForm = observer<UpdateElementPropsFormProps>(
  ({ element }) => {
    const { builderService, componentService, propService, typeService } =
      useStore()

    const currentElement = element.current
    const apiId = currentElement.renderType?.current.api?.id

    const [{ result: interfaceType, status }, getInterface] = useAsync(
      async () => {
        const roots = builderService.activeElementTree
          ? [builderService.activeElementTree.rootElement.current]
          : []

        await loadAllTypesForElements(componentService, typeService, roots)

        return typeService.getInterface(apiId!)
      },
    )

    useEffect(() => {
      void getInterface.execute()
    }, [apiId])

    const onSubmit = (data: IPropData) => {
      const props = element.current.props.current

      return propService.updateWithDefaultValuesApplied({
        data,
        defaultValues: getDefaultFieldProps(currentElement.renderType?.current),
        id: props.id,
      })
    }

    // If element is a component type, we also show the component props
    // but should prioritize the element props
    // Since the prop values are observable and changes after the update, we need to prevent
    // re-rendering the form so the focus is not lost, so the use of `useMemo` here
    const propsModel = React.useMemo(
      () =>
        mergeProps(
          isComponentInstance(currentElement.renderType)
            ? currentElement.renderType.maybeCurrent?.props.current.values
            : {},
          currentElement.props.current.values,
        ),
      [currentElement.id],
    )

    const submitRef = useRef<Maybe<SubmitController>>()
    React.useEffect(() => {
      // to trigger validation when props tab opened
      submitRef.current?.validate?.()
    }, [submitRef.current])

    return (
      <Spinner isLoading={status === 'loading'}>
        {interfaceType && (
          <Row className="mb-5" gutter={[0, 16]}>
            <Col span={24}>
              <PropsForm
                autocomplete={element.current.propsEvaluationContext}
                autosave
                initialSchema={{}}
                interfaceType={interfaceType}
                key={element.id}
                model={propsModel}
                onSubmit={onSubmit}
                submitField={React.Fragment}
                submitRef={submitRef}
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
