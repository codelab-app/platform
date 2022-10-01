import { DisplayIfField } from '@codelab/frontend/view/components'
import { ICreateTagDTO } from '@codelab/shared/abstract/core'
import React from 'react'

export const DisplayIfNotRoot = ({
  children,
}: React.PropsWithChildren<unknown>) => (
  <DisplayIfField<ICreateTagDTO>
    condition={(c) => Boolean(c.model.parentTagId)}
  >
    {children}
  </DisplayIfField>
)
