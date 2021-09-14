import {
  InterfaceForm,
  useGetTypeGraphQuery,
  useTypeTree,
} from '@codelab/frontend/modules/type'
import { ElementIdProvider } from '@codelab/frontend/presenter/container'
import { usePromisesLoadingIndicator } from '@codelab/frontend/view/components'
import { Spin } from 'antd'
import React, { useRef } from 'react'
import {
  refetchGetElementQuery,
  useGetElementQuery,
} from '../get-element/GetElement.api.graphql.gen'
import { useUpdateElementPropsMutation } from './UpdateElementProps.api.graphql.gen'

interface UpdateElementPropsFormInternalProps {
  elementId: string
  interfaceId: string
  existingProps: string
  loadingStateKey: string
}

const UpdateElementPropsFormInternal = ({
  interfaceId,
  elementId,
  existingProps,
  loadingStateKey,
}: UpdateElementPropsFormInternalProps) => {
  const { trackPromise } = usePromisesLoadingIndicator(loadingStateKey)

  const { data: interfaceData, loading: interfaceLoading } =
    useGetTypeGraphQuery({
      variables: { input: { where: { id: interfaceId } } },
    })

  const [mutate, { loading: updating, error, data: updateData }] =
    useUpdateElementPropsMutation({
      refetchQueries: [refetchGetElementQuery({ input: { elementId } })],
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
        onSubmit={(data: any) =>
          trackPromise(
            mutate({
              variables: {
                input: {
                  elementId,
                  props: JSON.stringify(data),
                },
              },
            }),
          )
        }
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
    variables: { input: { elementId } },
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
