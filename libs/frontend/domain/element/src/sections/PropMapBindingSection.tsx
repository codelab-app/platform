import {
  IElement,
  IElementService,
  IElementTree,
} from '@codelab/shared/abstract/core'
import React from 'react'
import tw from 'twin.macro'
import {
  CreatePropMapBindingButton,
  CreatePropMapBindingModal,
  DeletePropMapBindingModal,
  PropMapBindingsTable,
  UpdatePropMapBindingModal,
} from '../use-cases'

export interface PropMapBindingSectionProps {
  element: IElement
  elementTree: IElementTree
  providePropCompletion?: (searchValue: string) => Array<string>
  elementService: IElementService
}

export const PropMapBindingSection = ({
  element,
  elementService,
  providePropCompletion,
  elementTree,
}: PropMapBindingSectionProps) => {
  return (
    <>
      <PropMapBindingsTable element={element} elementService={elementService} />
      <div css={tw`text-center m-2`}>
        <CreatePropMapBindingButton
          element={element}
          elementService={elementService}
        />
      </div>
      <CreatePropMapBindingModal
        elementService={elementService}
        elementTree={elementTree}
        providePropCompletion={providePropCompletion}
      />
      <UpdatePropMapBindingModal
        elementService={elementService}
        elementTree={elementTree}
        providePropCompletion={providePropCompletion}
      />
      <DeletePropMapBindingModal elementService={elementService} />
    </>
  )
}

PropMapBindingSection.displayName = 'PropMapBindingSection'
