import {
  IComponent,
  IComponentService,
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

export interface UpdateComponentPropsFormProps {
  typeService: ITypeService
  componentService: IComponentService
  component: IComponent
  trackPromises?: UseTrackLoadingPromises
  autocomplete?: IPropData
  userService: IUserService
}

// TOOD: maybe refactor UpdateElmentPropsForm to be more generic, instead of creating a new form
export const UpdateComponentPropsForm = observer<UpdateComponentPropsFormProps>(
  ({
    componentService,
    component,
    trackPromises,
    typeService,
    autocomplete,
    userService,
  }) => {
    const { trackPromise } = trackPromises ?? {}
    // cache it to not confuse the user when auto-saving
    const initialPropsRef = useRef(component.props?.values ?? {})

    console.log(component.name, component)

    const apiId = component.api.id

    const { value: interfaceType, loading } = useAsync(
      () => typeService.getInterfaceAndDescendants(apiId),
      [apiId],
    )

    const onSubmit = (data: IPropData) => {
      const promise = componentService.patchComponent(component, {
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
                key={component.id}
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
