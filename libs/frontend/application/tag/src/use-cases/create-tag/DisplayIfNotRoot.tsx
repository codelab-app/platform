import type { ICreateTagData } from '@codelab/shared/abstract/core'

import { DisplayIfField } from '@codelab/frontend-presentation-components-form'

export const DisplayIfNotRoot = ({
  children,
}: React.PropsWithChildren<unknown>) => (
  <DisplayIfField<ICreateTagData>
    condition={(context) => Boolean(context.model.parent?.id)}
  >
    {children}
  </DisplayIfField>
)
