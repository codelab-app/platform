import type { ICreateTagData } from '@codelab/frontend/abstract/core'
import { DisplayIfField } from '@codelab/frontend/presentation/view'
import React from 'react'

export const DisplayIfNotRoot = ({
  children,
}: React.PropsWithChildren<unknown>) => (
  <DisplayIfField<ICreateTagData>
    condition={(context) => Boolean(context.model.parent?.id)}
  >
    {children}
  </DisplayIfField>
)
