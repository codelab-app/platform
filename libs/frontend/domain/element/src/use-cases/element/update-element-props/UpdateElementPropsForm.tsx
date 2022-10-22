import {
  IElement,
  IElementService,
  IPropData,
  isAdmin,
  ITypeService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { PropsForm } from '@codelab/frontend/domain/type'
import {
  Spinner,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { Col, Row } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React, { useRef } from 'react'
import { useAsync } from 'react-use'

export interface UpdateElementPropsFormProps {
  typeService: ITypeService
  elementService: IElementService
  element: IElement
  trackPromises?: UseTrackLoadingPromises
  autocomplete?: IPropData
  userService: IUserService
}

export const UpdateElementPropsForm = observer<UpdateElementPropsFormProps>(
  ({
    elementService,
    element,
    trackPromises,
    typeService,
    autocomplete,
    userService,
  }) => {
    const { trackPromise } = trackPromises ?? {}
    // cache it to not confuse the user when auto-saving
    console.log(element.props)

    const initialPropsRef = useRef(element.props?.values ?? {})

    const apiId =
      element.atom?.current.api.id ||
      element.renderComponentType?.current.api.id

    const { value: interfaceType, loading } = useAsync(
      () => typeService.getInterfaceAndDescendants(apiId!),
      [apiId],
    )

    const onSubmit = (data: IPropData) => {
      console.log('Submitting: ', data)

      const promise = elementService.patchElement(element, {
        props: {
          update: {
            node: {
              data: JSON.stringify(data),
            },
          },
        },
      })

      return trackPromise?.(promise) ?? promise
    }

    return (
      <Spinner isLoading={loading}>
        {interfaceType && (
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <PropsForm
                autosave
                context={{ autocomplete }}
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
