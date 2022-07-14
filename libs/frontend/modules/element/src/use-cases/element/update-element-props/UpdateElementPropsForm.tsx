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
import {
  IAnyAction,
  IBuilderState,
  IElement,
  IPropData,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'

export interface UpdateElementPropsFormProps
  extends WithServices<TYPE_SERVICE | ELEMENT_SERVICE> {
  element: IElement
  trackPromises?: UseTrackLoadingPromises
  autocomplete?: IPropData
  builderState: IBuilderState

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
    }, [apiId])

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
          <PropsForm
            autosave
            context={{ autocomplete, builderState, actionList }}
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
