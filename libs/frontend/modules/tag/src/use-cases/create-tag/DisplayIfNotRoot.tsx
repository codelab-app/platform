import { DisplayIfField } from '@codelab/frontend/view/components'
import { ICreateTagDTO } from '@codelab/shared/abstract/core'

export const DisplayIfNotRoot = ({
  children,
}: React.PropsWithChildren<unknown>) => (
  <DisplayIfField<ICreateTagDTO> condition={(c) => !!c.model.parentTagId}>
    {children}
  </DisplayIfField>
)
