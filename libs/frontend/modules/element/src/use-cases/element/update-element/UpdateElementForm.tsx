import React from 'react'
import {
  UpdateElementFormInternal,
  UpdateElementFormInternalProps,
} from './UpdateELementFormInternal'

export type UpdateElementFormProps = Omit<
  UpdateElementFormInternalProps,
  'element'
> & {
  elementId: string
  key: React.Key
}

/** Not intended to be used in a modal */
export const UpdateElementForm = ({
  key,
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
      key={key}
      model={{}}
      providePropCompletion={providePropCompletion}
      submitRef={undefined}
      trackPromises={trackPromises}
      tree={tree}
    />
  )
}
