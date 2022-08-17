import { PageType } from '@codelab/frontend/abstract/types'
import { PropsForm } from '@codelab/frontend/modules/type'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
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
import React, { useEffect, useRef } from 'react'

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

    const [getInterfaceType, { data: interfaceType, isLoading }] =
      useStatefulExecutor((_id: string) =>
        typeService.getInterfaceAndDescendants(_id),
      )

    const apiId =
      element.atom?.current.api.id ||
      element.instanceOfComponent?.current.api.id

    useEffect(() => {
      if (apiId) {
        getInterfaceType(apiId)
      }
    }, [apiId, getInterfaceType])

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
      <Spinner isLoading={isLoading}>
        {interfaceType && (
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <PropsForm
                autosave
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
