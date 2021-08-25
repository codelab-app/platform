import { ElementFragment } from '@codelab/shared/codegen/graphql'
import React from 'react'
import tw from 'twin.macro'
import { ElementHooksList, RemoveHookFromElementModal } from '../use-cases'
import {
  AddHookToElementButton,
  AddHookToElementModal,
} from '../use-cases/hooks/add-hook-to-element'

export interface ElementHookSectionProps {
  element: ElementFragment
}

export const ElementHookSection = ({ element }: ElementHookSectionProps) => {
  return (
    <>
      <ElementHooksList element={element} />
      <div css={tw`text-center m-2`}>
        <AddHookToElementButton />
      </div>
      <AddHookToElementModal elementId={element.id} />
      <RemoveHookFromElementModal elementId={element.id} />
    </>
  )
}

ElementHookSection.displayName = 'ElementHookSection'
