import React from 'react'
import tw from 'twin.macro'
import { useGetElementQuery } from '../store'
import { ElementHooksList, RemoveHookFromElementModal } from '../use-cases'
import {
  AddHookToElementButton,
  AddHookToElementModal,
} from '../use-cases/hooks/add-hook-to-element'

export interface ElementHookSectionProps {
  elementId: string
}

export const ElementHookSection = ({ elementId }: ElementHookSectionProps) => {
  const { data } = useGetElementQuery({
    variables: { input: { where: { id: elementId } } },
  })

  const element = data?.getElement

  if (!element) {
    return null
  }

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
