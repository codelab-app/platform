import {
  InterfaceForm,
  useGetTypeGraphQuery,
  useTypeTree,
} from '@codelab/frontend/modules/type'
import { ElementIdProvider } from '@codelab/frontend/presenter/container'
import { StatelessLoadingIndicator } from '@codelab/frontend/view/components'
import { Spin } from 'antd'
import React, { useRef } from 'react'
import tw from 'twin.macro'
import {
  refetchGetElementQuery,
  useGetElementQuery,
} from '../get-element/GetElement.api.graphql'
import { useUpdateElementPropsMutation } from './UpdateElementProps.api.graphql'

interface UpdateElementPropsFormInternalProps {
  elementId: string
  interfaceId: string
  existingProps: string
}

const UpdateElementPropsFormInternal = ({
  interfaceId,
  elementId,
  existingProps,
}: UpdateElementPropsFormInternalProps) => {
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
          mutate({
            variables: {
              input: {
                elementId,
                props: JSON.stringify(data),
              },
            },
          })
        }
      />

      <div css={tw`absolute top-0 right-0 m-8`}>
        <StatelessLoadingIndicator
          style={{ display: 'block', margin: '0.5rem' }}
          state={{
            isLoading: updating,
            isErrored: Boolean(
              error ||
                (updateData as any)?.errors ||
                (updateData as any)?.error,
            ),
          }}
        />
      </div>
    </div>
  )
}

export interface UpdateElementPropsFormProps {
  elementId: string
}

export const UpdateElementPropsForm = ({
  elementId,
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
      />
    </ElementIdProvider>
  )
}
