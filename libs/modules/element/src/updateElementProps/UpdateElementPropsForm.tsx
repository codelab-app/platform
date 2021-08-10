import {
  ElementFragment,
  refetchGetElementGraphQuery,
  useGetTypeGraphQuery,
  useUpdateElementPropsMutation,
} from '@codelab/codegen/graphql'
import { InterfaceForm, useTypeTree } from '@codelab/modules/type'
import { Spin } from 'antd'
import React, { useRef } from 'react'

export interface UpdateElementPropsFormProps {
  element: ElementFragment
}

export interface _UpdateElementPropsFormProps {
  elementId: string
  interfaceId: string
  existingProps: string
}

const _UpdateElementPropsForm = ({
  interfaceId,
  elementId,
  existingProps,
}: _UpdateElementPropsFormProps) => {
  const { data: interfaceData, loading: interfaceLoading } =
    useGetTypeGraphQuery({
      variables: { input: { where: { id: interfaceId } } },
    })

  const [mutate] = useUpdateElementPropsMutation({
    refetchQueries: [refetchGetElementGraphQuery({ input: { elementId } })],
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
    <InterfaceForm
      key={elementId}
      interfaceTree={tree}
      model={initialPropsRef.current}
      onSubmit={(data) =>
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
  )
}

export const UpdateElementPropsForm = ({
  element,
}: UpdateElementPropsFormProps) => {
  if (!element.atom) {
    return <>Add an atom to this element to update its props</>
  }

  return (
    <_UpdateElementPropsForm
      interfaceId={element.atom.api.id}
      elementId={element.id}
      existingProps={element.props}
    />
  )
}
