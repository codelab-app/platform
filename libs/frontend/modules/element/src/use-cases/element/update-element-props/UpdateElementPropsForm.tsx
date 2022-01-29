import {
  InterfaceForm,
  useGetTypeGraphQuery,
  useTypeTree,
} from '@codelab/frontend/modules/type'
import { ElementIdProvider } from '@codelab/frontend/presenter/container'
import { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import { Prop } from '@codelab/shared/abstract/codegen'
import { Spin } from 'antd'
import { useRef } from 'react'
import {
  useGetElementQuery,
  useUpdateElementPropsMutation,
} from '../../../store'

interface UpdateElementPropsFormInternalProps {
  elementId: string
  interfaceId: string
  existingProps: Prop
  trackPromises?: UseTrackLoadingPromises
}

const UpdateElementPropsFormInternal = ({
  interfaceId,
  elementId,
  existingProps,
  trackPromises,
}: UpdateElementPropsFormInternalProps) => {
  const { trackPromise } = trackPromises ?? {}

  const { data: interfaceData, isLoading: interfaceLoading } =
    useGetTypeGraphQuery({
      variables: { input: { where: { id: interfaceId } } },
    })

  const [mutate] = useUpdateElementPropsMutation()
  const initialPropsRef = useRef(JSON.parse(existingProps.data))
  const tree = useTypeTree(interfaceData?.getTypeGraph)

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
        const promise = mutate({
          variables: {
            input: { elementId, data: JSON.stringify(data) },
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
  const { data } = useGetElementQuery({
    variables: { input: { where: { id: elementId } } },
  })

  const element = data?.getElement

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
