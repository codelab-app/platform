import React from 'react'
import tw from 'twin.macro'
import {
  ElementHooksList,
  RemoveHookFromElementModal,
  useGetElementQuery,
} from '../use-cases'
import {
  AddHookToElementButton,
  AddHookToElementModal,
} from '../use-cases/hooks/add-hook-to-element'

export interface ElementHookSectionProps {
  elementId: string
}

export const ElementHookSection = ({ elementId }: ElementHookSectionProps) => {
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
