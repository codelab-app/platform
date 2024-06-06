import { DisplayIfField } from '@codelab/frontend-presentation-view/components/form'
import type { ICreateTagData } from '@codelab/shared/abstract/core'
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
