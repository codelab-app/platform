import type { IElement, IPropData } from '@codelab/frontend/abstract/core'
import {
  CUSTOM_TEXT_PROP_KEY,
  isComponentInstance,
} from '@codelab/frontend/abstract/core'
import { AdminPropsPanel } from '@codelab/frontend/domain/admin'
import { isAtomInstance } from '@codelab/frontend/domain/atom'
import { PropsForm } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presenter/container'
import type { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import { ReactQuillField, Spinner } from '@codelab/frontend/view/components'
import { filterEmptyStrings, mergeProps } from '@codelab/shared/utils'
import type { JSONSchemaType } from 'ajv'
import { Col, Row } from 'antd'
import type { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import tw from 'twin.macro'

export interface UpdateElementPropsFormProps {
  element: Ref<IElement>
  trackPromises?: UseTrackLoadingPromises
}

const withCustomTextSchema: JSONSchemaType<{
  [CUSTOM_TEXT_PROP_KEY]?: string
}> = {
  properties: {
    [CUSTOM_TEXT_PROP_KEY]: {
      label: 'Custom text',
      nullable: true,
      type: 'string',
      uniforms: {
        component: ReactQuillField,
      },
    },
  },
  required: [],
  title: '',
  type: 'object',
} as const

export const UpdateElementPropsForm = observer<UpdateElementPropsFormProps>(
  ({ element, trackPromises }) => {
    const { typeService, elementService, propService } = useStore()
    const { trackPromise } = trackPromises ?? {}
    const currentElement = element.current
    const apiId = currentElement.renderType?.current.api.id

    const { value: interfaceType, loading } = useAsync(
      () => typeService.getInterfaceAndDescendants(apiId!),
      [apiId],
    )

    const onSubmit = (data: IPropData) => {
      const filteredData = filterEmptyStrings(data)
      console.log('Submitting: ', filteredData)

      const props = element.current.props.current

      const promise = propService.update({
        data: JSON.stringify(filteredData),
        id: props.id,
      })

      return trackPromise?.(promise) ?? promise
    }

    const allowCustomInnerHtml =
      isAtomInstance(currentElement.renderType) &&
      currentElement.renderType.current.allowCustomTextInjection &&
      currentElement.children.length === 0

    const initialSchema = allowCustomInnerHtml ? withCustomTextSchema : {}

    // If element is a component type, we also show the component props
    // but should prioritize the element props
    const propsModel = mergeProps(
      isComponentInstance(currentElement.renderType)
        ? currentElement.renderType.maybeCurrent?.props?.current.values
        : {},
      currentElement.props.current.values,
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
