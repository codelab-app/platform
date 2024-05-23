import type { ICreateTagData } from '@codelab/frontend/abstract/domain'
import { DisplayIfField } from '@codelab/frontend-presentation-view/components'
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
