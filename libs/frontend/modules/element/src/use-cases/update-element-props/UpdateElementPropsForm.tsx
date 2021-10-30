import {
  InterfaceForm,
  useGetTypeGraphQuery,
  useTypeTree,
} from '@codelab/frontend/modules/type'
import { ElementIdProvider } from '@codelab/frontend/presenter/container'
import { usePromisesLoadingIndicator } from '@codelab/frontend/view/components'
import { TypeKind } from '@codelab/shared/abstract/core'
import { Spin } from 'antd'
import React, { useRef } from 'react'
import { useElementGraphContext } from '../../providers'
import { refetchGetElementQuery, useGetElementQuery } from '../get-element'
import { refetchGetElementGraphQuery } from '../get-element-graph'
import { useUpdateElementPropsMutation } from './UpdateElementProps.web.graphql.gen'

interface UpdateElementPropsFormInternalProps {
  elementId: string
  interfaceId: string
  existingProps: string
  loadingStateKey: string
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
  loadingStateKey,
}: UpdateElementPropsFormInternalProps) => {
  const { trackPromise } = usePromisesLoadingIndicator(loadingStateKey)
  const { elementId: rootElementId } = useElementGraphContext()

  const { data: interfaceData, loading: interfaceLoading } =
    useGetTypeGraphQuery({
      variables: { input: { where: { id: interfaceId } } },
    })

  const [mutate] = useUpdateElementPropsMutation({
    refetchQueries: [
      refetchGetElementQuery({ input: { where: { id: elementId } } }),
      refetchGetElementGraphQuery({ input: { where: { id: rootElementId } } }),
    ],
  })

  const initialPropsRef = useRef(JSON.parse(existingProps))
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
          return trackPromise(
            mutate({
              variables: {
                input: {
                  elementId,
                  props: JSON.stringify(data),
                },
              },
            }),
          )
        }}
      />
    </div>
  )
}

export interface UpdateElementPropsFormProps {
  elementId: string
  loadingStateKey: string
}

export const UpdateElementPropsForm = ({
  elementId,
  loadingStateKey,
}: UpdateElementPropsFormProps) => {
  const { data } = useGetElementQuery({
    fetchPolicy: 'cache-first',
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
        loadingStateKey={loadingStateKey}
      />
    </ElementIdProvider>
  )
}
