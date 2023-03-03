import type { IElement, IPropData } from '@codelab/frontend/abstract/core'
import {
  CUSTOM_TEXT_PROP_KEY,
  isComponentModel,
} from '@codelab/frontend/abstract/core'
import { AdminPropsPanel } from '@codelab/frontend/domain/admin'
import { PropsForm } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presenter/container'
import type { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import { ReactQuillField, Spinner } from '@codelab/frontend/view/components'
import { filterEmptyStrings, mergeProps } from '@codelab/shared/utils'
import type { JSONSchemaType } from 'ajv'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import tw from 'twin.macro'
import { getRenderTypeApi } from '../../../store'
import { isAtomModel } from "@codelab/frontend/domain/atom";

export interface UpdateElementPropsFormProps {
  element: IElement
  trackPromises?: UseTrackLoadingPromises
}

const withCustomTextSchema: JSONSchemaType<{
  [CUSTOM_TEXT_PROP_KEY]?: string
}> = {
  title: '',
  type: 'object',
  properties: {
    [CUSTOM_TEXT_PROP_KEY]: {
      type: 'string',
      label: 'Custom text',
      uniforms: {
        component: ReactQuillField,
      },
      nullable: true,
    },
  },
  required: [],
} as const

export const UpdateElementPropsForm = observer<UpdateElementPropsFormProps>(
  ({ element, trackPromises }) => {
    const { typeService, elementService } = useStore()
    const { trackPromise } = trackPromises ?? {}
    const apiId = element.renderType?.current.api.id

    const { value: interfaceType, loading } = useAsync(
      () => typeService.getInterfaceAndDescendants(apiId!),
      [apiId],
    )

    const onSubmit = (data: IPropData) => {
      const filteredData = filterEmptyStrings(data)
      console.log('Submitting: ', filteredData)

      const promise = elementService.patchElement(element, {
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

    const allowCustomInnerHtml =
      isAtomModel(element.renderType) &&
      element.renderType.current.allowCustomTextInjection &&
      element.children.length === 0

    const initialSchema = allowCustomInnerHtml ? withCustomTextSchema : {}

    // If element is a component type, we also show the component props
    // but should prioritize the element props
    const propsModel = mergeProps(
      isComponentModel(element.renderType)
        ? element.renderType.maybeCurrent?.props?.current.values
        : {},
      element.props?.current.values,
    )

    return (
      <Spinner isLoading={loading}>
        {interfaceType && (
          <Row css={tw`mb-5`} gutter={[0, 16]}>
            <Col span={24}>
              <PropsForm
                autosave
                initialSchema={initialSchema}
                interfaceType={interfaceType}
                key={element.id}
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
