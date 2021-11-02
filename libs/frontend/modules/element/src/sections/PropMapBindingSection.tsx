import { ElementTree } from '@codelab/shared/core'
import React from 'react'
import tw from 'twin.macro'
import {
  CreatePropMapBindingButton,
  CreatePropMapBindingModal,
  DeletePropMapBindingModal,
  PropMapBindingsTable,
  UpdatePropMapBindingModal,
  useGetElementQuery,
} from '../use-cases'

export interface PropMapBindingSectionProps {
  elementId: string
  tree: ElementTree
  providePropCompletion?: (searchValue: string) => Array<string>
}

export const PropMapBindingSection = ({
  elementId,
  tree,
  providePropCompletion,
}: PropMapBindingSectionProps) => {
  const { data } = useGetElementQuery({
    fetchPolicy: 'cache-first',
    variables: { input: { where: { id: elementId } } },
  })

  const element = data?.getElement

  if (!element) {
    return null
  }

  return (
    <>
      <PropMapBindingsTable element={element} tree={tree} />
      <div css={tw`text-center m-2`}>
        <CreatePropMapBindingButton />
      </div>
      <CreatePropMapBindingModal
        tree={tree}
        elementId={elementId}
        providePropCompletion={providePropCompletion}
      />
      <UpdatePropMapBindingModal
        tree={tree}
        elementId={elementId}
        providePropCompletion={providePropCompletion}
      />
      <DeletePropMapBindingModal elementId={elementId} />
    </>
  )
}

PropMapBindingSection.displayName = 'PropMapBindingSection'
