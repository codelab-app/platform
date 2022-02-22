import { ElementTree } from '@codelab/shared/core'
import React from 'react'
import tw from 'twin.macro'
import { useGetElementById } from '../hooks'
import {
  CreatePropMapBindingButton,
  CreatePropMapBindingModal,
  DeletePropMapBindingModal,
  PropMapBindingsTable,
  UpdatePropMapBindingModal,
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
  const element = useGetElementById(elementId)

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
        elementId={elementId}
        providePropCompletion={providePropCompletion}
        tree={tree}
      />
      <UpdatePropMapBindingModal
        elementId={elementId}
        providePropCompletion={providePropCompletion}
        tree={tree}
      />
      <DeletePropMapBindingModal elementId={elementId} />
    </>
  )
}

PropMapBindingSection.displayName = 'PropMapBindingSection'
