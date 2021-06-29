import {
  __AtomFragment,
  refetchGetPageElementQuery,
  refetchGetPropsQuery,
  useGetPropsQuery,
} from '@codelab/codegen/graphql'
import React from 'react'
import { UpdatePropsForm } from '../updateProps'

// that name
export interface UpdatePageElementPropsFormProps {
  pageElementId: string
  atom: __AtomFragment
}

export const UpdatePageElementPropsForm = ({
  pageElementId,
  atom,
}: UpdatePageElementPropsFormProps) => {
  const { data } = useGetPropsQuery({
    variables: {
      input: { byPageElement: { pageElementIds: [pageElementId] } },
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
      extraInput={{ pageElementId }}
      mutationOptions={{
        refetchQueries: [
          refetchGetPageElementQuery({
            input: { pageElementId },
          }),
        ],
      }}
    />
  )
}

UpdatePageElementPropsForm.displayName = 'UpdatePageElementPropsForm'
