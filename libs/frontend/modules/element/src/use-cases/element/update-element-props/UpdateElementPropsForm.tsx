import { Prop } from '@codelab/frontend/abstract/codegen'
import {
  InterfaceForm,
  useGetTypeGraphQuery,
  useTypeTree,
} from '@codelab/frontend/modules/type'
import { ElementIdProvider } from '@codelab/frontend/presenter/container'
import { UseTrackLoadingPromises } from '@codelab/frontend/view/components'
import { TypeKind } from '@codelab/shared/abstract/core'
import { Spin } from 'antd'
import { useRef } from 'react'
import { useElementGraphContext } from '../../../providers'
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

const hasDataType = (
  data: Record<string, any>,
  typeKinds: Array<TypeKind>,
  typeKindsById: Record<string, TypeKind>,
) => {
  return Object.values(data).some((value) => {
    const valueTypeKind = typeKindsById[value?.type]

    if (!valueTypeKind) {
      return false
    }

    return typeKinds.includes(valueTypeKind)
  })
}

const UpdateElementPropsFormInternal = ({
  interfaceId,
  elementId,
  existingProps,
  trackPromises,
}: UpdateElementPropsFormInternalProps) => {
  const { trackPromise } = trackPromises ?? {}
  const { elementId: rootElementId } = useElementGraphContext()

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
    <div>
      <InterfaceForm
        autosave
        autosaveDelay={500}
        key={elementId}
        interfaceTree={tree}
        model={initialPropsRef.current}
        onSubmit={(data: any) => {
          const promise = mutate({
            variables: {
              input: {
                elementId,
                data: JSON.stringify(data),
                propsId: existingProps.id,
              },
            },
          }).unwrap()

          return trackPromise?.(promise) ?? promise
        }}
      />
    </div>
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
        interfaceId={element.atom.api.id}
        elementId={element.id}
        existingProps={element.props}
        trackPromises={trackPromises}
      />
    </ElementIdProvider>
  )
}
