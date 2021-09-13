import React from 'react'
import tw from 'twin.macro'
import { ElementTreeGraphql } from '../tree'
import { useGetElementQuery } from '../use-cases'
import {
  CreatePropMapBindingButton,
  CreatePropMapBindingModal,
  PropMapBindingsTable,
  UpdatePropMapBindingModal,
} from '../use-cases/prop-mapping'
import { DeletePropMapBindingModal } from '../use-cases/prop-mapping/delete-prop-map-binding'

export interface PropMapBindingSectionProps {
  elementId: string
  tree: ElementTreeGraphql
  providePropCompletion?: (searchValue: string) => Array<string>
}

export const PropMapBindingSection = ({
  elementId,
  tree,
  providePropCompletion,
}: PropMapBindingSectionProps) => {
  const { data } = useGetElementQuery({
    fetchPolicy: 'cache-first',
    variables: { input: { elementId } },
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
