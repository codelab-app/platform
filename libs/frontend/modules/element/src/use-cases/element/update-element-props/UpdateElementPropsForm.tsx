import { InterfaceForm, WithTypeService } from '@codelab/frontend/modules/type'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import {
  SpinnerWrapper,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { PropsData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import { ElementModel, ElementService } from '../../../store'

export interface UpdateElementPropsFormProps extends WithTypeService {
  element: ElementModel
  elementService: ElementService
  trackPromises?: UseTrackLoadingPromises
}

export const UpdateElementPropsForm = observer(
  ({
    elementService,
    element,
    trackPromises,
    typeService,
  }: UpdateElementPropsFormProps) => {
    const { trackPromise } = trackPromises ?? {}
    const initialPropsRef = useRef(element?.props?.propsData ?? {}) // cache it to not confuse the user when auto-saving

    const [getInterfaceType, { data: interfaceType, isLoading }] =
      useLoadingState((_id: string) =>
        typeService.getInterfaceAndDescendants({ id: _id }),
      )

    const apiId = element.atom?.current.api.id

    useEffect(() => {
      if (apiId) {
        getInterfaceType(apiId)
      }
    }, [getInterfaceType, apiId])

    const onSubmit = (data: PropsData) => {
      const promise = elementService.updateElementProps(element, data)

      return trackPromise?.(promise) ?? promise
    }

    return (
      <SpinnerWrapper isLoading={isLoading}>
        {interfaceType && (
          <InterfaceForm
            autosave
            interfaceType={interfaceType}
            key={element.id}
            model={initialPropsRef.current}
            onSubmit={onSubmit}
            submitRef={undefined}
          />
        )}
      </SpinnerWrapper>
    )
  },
)
