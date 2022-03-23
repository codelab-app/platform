import {
  InterfaceForm,
  TypeService,
  WithTypeService,
} from '@codelab/frontend/modules/type'
import { ElementIdProvider } from '@codelab/frontend/presenter/container'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import {
  SpinnerWrapper,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { IProp } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import { useGetElementById } from '../../../hooks'
import { useUpdateElementsMutation } from '../../../store'

type UpdateElementPropsFormInternalProps = {
  elementId: string
  interfaceId: string
  existingProps: Nullish<IProp>
  trackPromises?: UseTrackLoadingPromises
} & WithTypeService

export const UpdateElementPropsFormInternal =
  observer<UpdateElementPropsFormInternalProps>(
    ({ interfaceId, elementId, existingProps, trackPromises, typeService }) => {
      const { trackPromise } = trackPromises ?? {}
      const [mutate] = useUpdateElementsMutation()
      const initialPropsRef = useRef(JSON.parse(existingProps?.data || '{}'))

      const [getInterfaceType, { data: interfaceType, isLoading }] =
        useLoadingState((_id: string) =>
          typeService.getInterfaceAndDescendants({ id: _id }),
        )

      useEffect(() => {
        getInterfaceType(interfaceId)
      }, [getInterfaceType, interfaceId])

      const onSubmit = (data: any) => {
        const createOrUpdate = existingProps ? 'update' : 'create'

        const promise = mutate({
          variables: {
            where: { id: elementId },
            update: {
              props: {
                [createOrUpdate]: { node: { data: JSON.stringify(data) } },
              },
            },
          },
        }).unwrap()

        return trackPromise?.(promise) ?? promise
      }

      return (
        <SpinnerWrapper isLoading={isLoading}>
          {interfaceType && (
            <InterfaceForm
              autosave
              interfaceType={interfaceType}
              key={elementId}
              model={initialPropsRef.current}
              onSubmit={onSubmit}
              submitRef={undefined}
            />
          )}
        </SpinnerWrapper>
      )
    },
  )

export type UpdateElementPropsFormProps = {
  elementId: string
  trackPromises?: UseTrackLoadingPromises
} & WithTypeService

export const UpdateElementPropsForm = observer<UpdateElementPropsFormProps>(
  ({ elementId, trackPromises, typeService }) => {
    const element = useGetElementById(elementId)

    if (!element) {
      return null
    }

    if (!element.atom) {
      return <>Add an atom to this element to update its props</>
    }

    return (
      <ElementIdProvider elementId={element.id}>
        <UpdateElementPropsFormInternal
          elementId={element.id}
          existingProps={element.props}
          interfaceId={element.atom.api.id}
          trackPromises={trackPromises}
          typeService={typeService}
        />
      </ElementIdProvider>
    )
  },
)
