import React from 'react'
import tw from 'twin.macro'
import { useGetElementById } from '../hooks'
import {
  AddHookToElementButton,
  AddHookToElementModal,
  HooksList,
  RemoveHookFromElementModal,
} from '../use-cases'

export interface ElementHookSectionProps {
  elementId: string
}

export const ElementHookSection = ({ elementId }: ElementHookSectionProps) => {
  const element = useGetElementById(elementId)

  if (!element) {
    return null
  }

  return (
    <>
      <HooksList element={element} />
      <div css={tw`text-center m-2`}>
        <AddHookToElementButton />
      </div>
      <AddHookToElementModal elementId={element.id} />
      <RemoveHookFromElementModal elementId={element.id} />
    </>
  )
}

ElementHookSection.displayName = 'ElementHookSection'
