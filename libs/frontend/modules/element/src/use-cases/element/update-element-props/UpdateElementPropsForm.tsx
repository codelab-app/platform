import {
  ELEMENT_SERVICE,
  TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { PropsForm } from '@codelab/frontend/modules/type'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import {
  Spinner,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { IElement, IPropData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'

export type UpdateElementPropsFormProps = {
  element: IElement
  trackPromises?: UseTrackLoadingPromises
  autocompleteContext?: any
} & WithServices<TYPE_SERVICE | ELEMENT_SERVICE>

export const UpdateElementPropsForm = observer<UpdateElementPropsFormProps>(
  ({
    elementService,
    element,
    trackPromises,
    typeService,
    autocompleteContext,
  }) => {
    const { trackPromise } = trackPromises ?? {}
    // cache it to not confuse the user when auto-saving
    const initialPropsRef = useRef(element?.props?.values ?? {})

    const [getInterfaceType, { data: interfaceType, isLoading }] =
      useStatefulExecutor((_id: string) =>
        typeService.getInterfaceAndDescendants(_id),
      )

    const apiId = element.atom?.current.api.id

    useEffect(() => {
      if (apiId) {
        getInterfaceType(apiId)
      }
    }, [getInterfaceType, apiId])

    const onSubmit = (data: IPropData) => {
      const promise = elementService.updateElementProps(element, data)

      return trackPromise?.(promise) ?? promise
    }

    return (
      <Spinner isLoading={isLoading}>
        {interfaceType && (
          <PropsForm
            autocompleteContext={autocompleteContext}
            autosave
            initialValue={initialPropsRef.current}
            interfaceType={interfaceType}
            key={element.id}
            onSubmit={onSubmit}
          />
        )}
      </Spinner>
    )
  },
)
