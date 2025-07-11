'use client'

import type {
  IBuilderRoute,
  IRuntimeElementModel,
} from '@codelab/frontend-abstract-application'
import type { SubmitController } from '@codelab/frontend-abstract-types'
import type { IPropData } from '@codelab/shared-abstract-core'
import type { Maybe } from '@codelab/shared-abstract-types'

import { isComponent } from '@codelab/frontend-abstract-domain'
import { AdminPropsPanel } from '@codelab/frontend-application-admin/use-cases/admin-props-panel'
import { usePropService } from '@codelab/frontend-application-prop/services'
import { useTypeService } from '@codelab/frontend-application-type/services'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import { PropsForm } from '@codelab/frontend-presentation-components-interface-form'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'
import { evaluateObject } from '@codelab/shared-infra-eval'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { Fragment, useEffect, useMemo, useRef } from 'react'
import { useAsync } from 'react-use'

export interface UpdateElementPropsFormProps {
  context: IBuilderRoute
  runtimeElement: IRuntimeElementModel
}

/**
 * A `element` is associated with either `atom` api or `component` api, we load the API type so the prop form shows up.
 */
export const UpdateElementPropsForm = observer<UpdateElementPropsFormProps>(
  ({ context, runtimeElement }) => {
    const propService = usePropService()
    const typeService = useTypeService()
    const currentElement = runtimeElement.element.current
    const apiId = currentElement.renderType.current.api.id

    const { loading, value: interfaceType } = useAsync(async () => {
      // const rootElement = rendererService.activeElementTree?.rootElement.current
      // await loadAllTypesForElements(componentService, typeService, roots)
      // if (rootElement) {
      //   await elementService.loadDependantTypes(rootElement)
      // }

      return typeService.getInterface(apiId)
    }, [apiId])

    const onSubmit = (data: IPropData) => {
      const props = currentElement.props
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
    const propsModel = useMemo(
      () =>
        mergeProps(
          isComponent(currentElement.renderType.current)
            ? currentElement.renderType.current.props.values
            : {},
          currentElement.props.values,
        ),
      [currentElement.id],
    )

    const submitRef = useRef<Maybe<SubmitController>>(undefined)

    useEffect(() => {
      // to trigger validation when props tab opened
      submitRef.current?.validate?.()
    }, [submitRef.current])

    return (
      <Spinner isLoading={loading}>
        {interfaceType && (
          <Row className="mb-5" gutter={[0, 16]}>
            <Col span={24}>
              <PropsForm
                autocomplete={runtimeElement.runtimeProps.evaluationContext}
                autosave
                initialSchema={{}}
                interfaceType={interfaceType}
                key={runtimeElement.compositeKey}
                model={propsModel}
                modelTransform={(mode, model) => {
                  if (mode === 'validate') {
                    return evaluateObject(
                      model,
                      runtimeElement.runtimeProps.runtimeContext,
                    )
                  }

                  return model
                }}
                onSubmit={onSubmit}
                submitField={Fragment}
                submitRef={submitRef}
              />
            </Col>
            <Col span={24}>
              <AdminPropsPanel
                context={context}
                interfaceType={interfaceType}
              />
            </Col>
          </Row>
        )}
      </Spinner>
    )
  },
)
