import type {
  IAnyType,
  IElement,
  IField,
  IPropData,
} from '@codelab/frontend/abstract/core'
import { CUSTOM_TEXT_PROP_KEY, isAdmin } from '@codelab/frontend/abstract/core'
import type { InterfaceType } from '@codelab/frontend/domain/type'
import { fieldRef, PropsForm, typeRef } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presenter/container'
import type { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import { ReactQuillField, Spinner } from '@codelab/frontend/view/components'
import { filterEmptyStrings } from '@codelab/shared/utils'
import type { JSONSchemaType } from 'ajv'
import { Button, Col, Dropdown, Menu, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { useAsync } from 'react-use'
import tw from 'twin.macro'

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
    const { typeService, fieldService, elementService, userService } =
      useStore()

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

    const onEdit = (field: IField<IAnyType>) => {
      fieldService.updateModal.open(fieldRef(field.id))
    }

    const onDelete = (field: IField<IAnyType>) => {
      fieldService.deleteModal.open(fieldRef(field.id))
    }

    const editMenuItems = interfaceType?.fields.map((field) => {
      return {
        label: field.name,
        key: field.key,
        onClick: () => onEdit(field),
      }
    })

    const deleteMenuItems = interfaceType?.fields.map((field) => {
      return {
        label: field.name,
        key: field.key,
        onClick: () => onDelete(field),
      }
    })

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
                <Row gutter={[16, 16]} justify="center">
                  <Col>
                    <Button
                      onClick={() =>
                        fieldService.createModal.open(
                          typeRef<InterfaceType>(interfaceType.id),
                        )
                      }
                    >
                      Add
                    </Button>
                  </Col>
                  <Col>
                    <Dropdown.Button overlay={<Menu items={editMenuItems} />}>
                      Edit
                    </Dropdown.Button>
                  </Col>
                  <Col>
                    <Dropdown.Button
                      danger
                      overlay={<Menu items={deleteMenuItems} />}
                    >
                      Delete
                    </Dropdown.Button>
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
