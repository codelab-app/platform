import {
  InterfaceForm,
  useGetInterfaceTypeGraphsQuery,
  useTypeTree,
} from '@codelab/frontend/modules/type'
import { ElementIdProvider } from '@codelab/frontend/presenter/container'
import { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import { Prop } from '@codelab/shared/abstract/codegen'
import { Spin } from 'antd'
import { useRef } from 'react'
import { useGetElementById } from '../../../hooks'
<<<<<<< HEAD
import { useUpdateElementsMutation } from '../../../store'
=======
import { useUpdateElementPropsMutation } from '../../../store'
>>>>>>> 043f55ce (fix: most of error throwing)

interface UpdateElementPropsFormInternalProps {
  elementId: string
  interfaceId: string
  existingProps: Prop
  trackPromises?: UseTrackLoadingPromises
}

export const UpdateElementPropsFormInternal = ({
  interfaceId,
  elementId,
  existingProps,
  trackPromises,
}: UpdateElementPropsFormInternalProps) => {
  const { trackPromise } = trackPromises ?? {}

  const { data: interfaceData, isLoading: interfaceLoading } =
    useGetInterfaceTypeGraphsQuery({
      variables: { where: { id: interfaceId } },
    })

<<<<<<< HEAD
  const [mutate] = useUpdateElementsMutation()
=======
  const [mutate] = useUpdateElementPropsMutation()
>>>>>>> 043f55ce (fix: most of error throwing)
  const initialPropsRef = useRef(JSON.parse(existingProps?.data || '{}'))
  const tree = useTypeTree(interfaceData?.types?.[0]?.graph)

  if (interfaceLoading) {
    return <Spin />
  }

  if (!interfaceData) {
    return null
  }

  return (
    <InterfaceForm
      autosave
      interfaceTree={tree}
      key={elementId}
      model={initialPropsRef.current}
      onSubmit={(data: any) => {
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
      }}
      submitRef={undefined}
    />
  )
}

export interface UpdateElementPropsFormProps {
  elementId: string
  trackPromises?: UseTrackLoadingPromises
}

export const UpdateElementPropsForm = ({
  elementId,
  trackPromises,
}: UpdateElementPropsFormProps) => {
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
      />
    </ElementIdProvider>
  )
}
