import { ELEMENT_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { IElement, IElementTree } from '@codelab/shared/abstract/core'
import React from 'react'
import tw from 'twin.macro'
import {
  CreatePropMapBindingButton,
  CreatePropMapBindingModal,
  DeletePropMapBindingModal,
  PropMapBindingsTable,
  UpdatePropMapBindingModal,
} from '../use-cases'

export type PropMapBindingSectionProps = WithServices<ELEMENT_SERVICE> & {
  element: IElement
  elementTree: IElementTree
  providePropCompletion?: (searchValue: string) => Array<string>
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
