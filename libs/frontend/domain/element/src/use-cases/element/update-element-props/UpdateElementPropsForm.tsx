import type {
  IElement,
  IElementService,
  IPropData,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { CUSTOM_TEXT_PROP_KEY, isAdmin } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { PropsForm } from '@codelab/frontend/domain/type'
import type { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import { ReactQuillField, Spinner } from '@codelab/frontend/view/components'
import { filterEmptyStrings } from '@codelab/shared/utils'
import type { JSONSchemaType } from 'ajv'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React, { useRef } from 'react'
import { useAsync } from 'react-use'
import tw from 'twin.macro'

export interface UpdateElementPropsFormProps {
  typeService: ITypeService
  elementService: IElementService
  element: IElement
  trackPromises?: UseTrackLoadingPromises
  userService: IUserService
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
  ({ elementService, element, trackPromises, typeService, userService }) => {
    const { trackPromise } = trackPromises ?? {}
    // cache it to not confuse the user when auto-saving
    const initialPropsRef = useRef(element.props?.values ?? {})

    const apiId =
      element.atom?.current.api.id ||
      element.renderComponentType?.current.api.id

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

    const allowCustomText =
      element.atom?.current.allowCustomTextInjection &&
      element.children.length === 0

    const initialSchema = allowCustomText ? withCustomTextSchema : {}

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
                model={initialPropsRef.current}
                onSubmit={onSubmit}
                submitField={React.Fragment}
              />
            </Col>
            <Col span={24}>
              {isAdmin(userService.user) ? (
                <Row justify="center">
                  <Col>
                    <Link
                      href={{
                        pathname: PageType.Type,
                        query: { typeId: interfaceType.id },
                      }}
                      legacyBehavior
                    >
                      {`Edit ${interfaceType.name}`}
                    </Link>
                  </Col>
                </Row>
              ) : null}
            </Col>
          </Row>
        )}
      </Spinner>
    )
  },
)
