import type { IElementModel } from '@codelab/frontend/abstract/domain'
import { isComponent } from '@codelab/frontend/abstract/domain'
import type { SubmitController } from '@codelab/frontend/abstract/types'
import { AdminPropsPanel } from '@codelab/frontend/application/admin'
import { useStore } from '@codelab/frontend/application/shared/store'
import { PropsForm } from '@codelab/frontend/application/type'
import { mergeProps } from '@codelab/frontend/domain/prop'
import { loadAllTypesForElements } from '@codelab/frontend/presentation/container'
import { Spinner } from '@codelab/frontend/presentation/view'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { useAsync } from '@react-hookz/web'
import { Col, Row } from 'antd'
import type { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'

export interface UpdateElementPropsFormProps {
  element: Ref<IElementModel>
}

/**
 * A `element` is associated with either `atom` api or `component` api, we load the API type so the prop form shows up.
 */
export const UpdateElementPropsForm = observer<UpdateElementPropsFormProps>(
  ({ element }) => {
    const { componentService, propService, rendererService, typeService } =
      useStore()

    const currentElement = element.current
    const apiId = currentElement.renderType.current.api.id

    const [{ result: interfaceType, status }, getInterface] = useAsync(
      async () => {
        const roots = rendererService.activeElementTree
          ? [rendererService.activeElementTree.rootElement.current]
          : []

        await loadAllTypesForElements(componentService, typeService, roots)

        return typeService.getInterface(apiId!)
      },
    )

    useEffect(() => {
      void getInterface.execute()
    }, [apiId])

    const onSubmit = (data: IPropData) => {
      const props = element.current.props
      const renderTypeApi = currentElement.renderType.current.api.current

      return propService.updateWithDefaultValuesApplied(props, {
        data,
        defaultValues: renderTypeApi.defaultValues,
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
          isComponent(currentElement.renderType.current)
            ? currentElement.renderType.current.props.values
            : {},
          currentElement.props.values,
        ),
      [currentElement.id],
    )

    const submitRef = useRef<Maybe<SubmitController>>()

    React.useEffect(() => {
      // to trigger validation when props tab opened
      submitRef.current?.validate?.()
    }, [submitRef.current])

    const runtimeElement = rendererService.runtimeElement(currentElement)
    const runtimeProps = runtimeElement?.runtimeProps

    return (
      <Spinner isLoading={status === 'loading'}>
        {interfaceType && (
          <Row className="mb-5" gutter={[0, 16]}>
            <Col span={24}>
              <PropsForm
                autocomplete={runtimeProps?.expressionEvaluationContext}
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
