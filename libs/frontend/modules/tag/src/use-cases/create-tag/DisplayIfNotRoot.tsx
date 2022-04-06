import { DisplayIfField } from '@codelab/frontend/view/components'
import { CreateTagData } from './createTagSchema'

export const DisplayIfNotRoot = ({
  children,
}: React.PropsWithChildren<unknown>) => (
  <DisplayIfField<CreateTagData> condition={(c) => !!c.model.parentTagId}>
    {children}
  </DisplayIfField>
)
