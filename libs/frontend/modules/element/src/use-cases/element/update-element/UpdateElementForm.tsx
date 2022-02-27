import React from 'react'
import {
  UpdateElementFormInternal,
  UpdateElementFormInternalProps,
} from './UpdateELementFormInternal'

export type UpdateElementFormProps = Omit<
  UpdateElementFormInternalProps,
  'element'
> & { elementId: string }

/** Not intended to be used in a modal */
export const UpdateElementForm = ({
  elementId,
  tree,
  trackPromises,
  providePropCompletion,
}: UpdateElementFormProps) => {
  const element = tree.getVertex(elementId)

  if (!element) {
    return null
  }

  return (
    <UpdateElementFormInternal
      element={element}
      key={`${elementId}-UpdateElementFormInternal`}
      model={{}}
      providePropCompletion={providePropCompletion}
      submitRef={undefined}
      trackPromises={trackPromises}
      tree={tree}
    />
  )
}
