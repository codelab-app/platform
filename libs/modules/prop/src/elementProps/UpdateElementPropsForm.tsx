import {
  __AtomFragment,
  refetchGetElementQuery,
  useGetPropsQuery,
} from '@codelab/codegen/graphql'
import React from 'react'
import { UpdatePropsForm } from '../updateProps'

// that name
export interface UpdatePageElementPropsFormProps {
  elementId: string
  atom: __AtomFragment
}

export const UpdateElementPropsForm = ({
  elementId,
  atom,
}: UpdatePageElementPropsFormProps) => {
  const { data } = useGetPropsQuery({
    variables: {
      input: { byElement: { elementIds: [elementId] } },
    },
  })

  const props = data?.getProps

  if (!props) {
    return null
  }

  return (
    <UpdatePropsForm
      initialProps={props}
      interfaceId={atom.propTypes.id}
      extraInput={{ elementId: elementId }}
      mutationOptions={{
        refetchQueries: [
          refetchGetElementQuery({
            input: { elementId: elementId },
          }),
        ],
      }}
    />
  )
}

UpdateElementPropsForm.displayName = 'UpdatePageElementPropsForm'
