'use client'

import type { SubmitController } from '@codelab/frontend/abstract/types'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'

import {
  IRouteType,
  type IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'
import { isComponent } from '@codelab/frontend/abstract/domain'
import { PropsForm } from '@codelab/frontend/presentation/components/interface-form'
import { AdminPropsPanel } from '@codelab/frontend-application-admin/use-cases/admin-props-panel'
import { usePropService } from '@codelab/frontend-application-prop/services'
import {
  useUrlParams,
  useValidatedUrlParams,
} from '@codelab/frontend-application-shared-store/router'
import { useTypeService } from '@codelab/frontend-application-type/services'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import { Fragment, useEffect, useMemo, useRef } from 'react'
import { useAsyncFn } from 'react-use'

import { useElementService } from '../../services'

export interface UpdateElementPropsFormProps {
  runtimeElement: IRuntimeElementModel
}

/**
 * A `element` is associated with either `atom` api or `component` api, we load the API type so the prop form shows up.
 */
export const UpdateElementPropsForm = observer<UpdateElementPropsFormProps>(
  ({ runtimeElement }) => {
    const { rendererService } = useApplicationStore()
    const elementService = useElementService()
    const propService = usePropService()
    const typeService = useTypeService()
    const { appId, pageId } = useValidatedUrlParams()
    const currentElement = runtimeElement.element.current
    const apiId = currentElement.renderType.current.api.id

    const [{ loading, value: interfaceType }, getInterface] = useAsyncFn(
      async () => {
        const rootElement =
          rendererService.activeElementTree?.rootElement.current

        // await loadAllTypesForElements(componentService, typeService, roots)

        if (rootElement) {
          await elementService.loadDependantTypes(rootElement)
        }

        return typeService.getInterface(apiId)
      },
    )

    useEffect(() => {
      void getInterface()
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
                onSubmit={onSubmit}
                submitField={Fragment}
                submitRef={submitRef}
              />
            </Col>
            <Col span={24}>
              <AdminPropsPanel
                context={(fieldId) => ({
                  params: {
                    appId,
                    fieldId,
                    pageId,
                  },
                  type: IRouteType.Page,
                })}
                interfaceType={interfaceType}
              />
            </Col>
          </Row>
        )}
      </Spinner>
    )
  },
)
