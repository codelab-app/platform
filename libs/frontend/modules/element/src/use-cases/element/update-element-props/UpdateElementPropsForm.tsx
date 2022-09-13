import { PageType } from '@codelab/frontend/abstract/types'
import { PropsForm } from '@codelab/frontend/modules/type'
import {
  Spinner,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import {
  IAnyAction,
  IBuilderState,
  IElement,
  IElementService,
  IPropData,
  isAdmin,
  ITypeService,
  IUserService,
} from '@codelab/shared/abstract/core'
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
  builderState: IBuilderState
  userService: IUserService

  actionList?: Array<IAnyAction>
}

export const UpdateElementPropsForm = observer<UpdateElementPropsFormProps>(
  ({
    elementService,
    element,
    trackPromises,
    builderState,
    typeService,
    autocomplete,
    actionList,
    userService,
  }) => {
    const { trackPromise } = trackPromises ?? {}
    // cache it to not confuse the user when auto-saving
    const initialPropsRef = useRef(element?.props?.values ?? {})

    const apiId =
      element.atom?.current.api.id ||
      element.renderComponentType?.current.api.id

    const { value: interfaceType, loading } = useAsync(
      (id: string) => typeService.getInterfaceAndDescendants(id),
      [apiId],
    )

    const onSubmit = (data: IPropData) => {
      console.log(data)

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
                autoSave
                context={{ autocomplete, builderState, actionList }}
                initialValue={initialPropsRef.current}
                interfaceType={interfaceType}
                key={element.id}
                onSubmit={onSubmit}
              />
            </Col>
            <Col span={24}>
              {isAdmin(userService.user) ? (
                <Row justify="center">
                  <Col>
                    <Link
                      href={{
                        pathname: PageType.InterfaceDetail,
                        query: { interfaceId: interfaceType.id },
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
