import { IElement } from '@codelab/frontend/abstract/core'
import { UseCaseFormWithRef } from '@codelab/frontend/abstract/props'
import { SelectAtom, SelectComponent } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  AutoCompleteField,
  Form,
  UseTrackLoadingPromises,
} from '@codelab/frontend/view/components'
import { UpdateElementData } from '@codelab/shared/abstract/codegen'
import { ElementTree } from '@codelab/shared/core'
import React, { useRef, useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useGetElementQuery, useUpdateElementMutation } from '../../../store'
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
  const { data: getElementData } = useGetElementQuery({
    variables: { input: { where: { id: elementId } } },
  })

  const element = getElementData?.getElement

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
