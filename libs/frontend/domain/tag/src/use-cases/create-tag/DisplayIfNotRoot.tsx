import type { ICreateTagDTO } from '@codelab/frontend/abstract/core'
import { DisplayIfField } from '@codelab/frontend/view/components'
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
