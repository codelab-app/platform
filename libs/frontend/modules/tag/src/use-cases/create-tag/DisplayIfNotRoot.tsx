import { DisplayIfField } from '@codelab/frontend/view/components'
import { CreateTagInput } from '@codelab/shared/abstract/codegen'

export const DisplayIfNotRoot = ({
  children,
}: React.PropsWithChildren<unknown>) => (
  <DisplayIfField<CreateTagInput> condition={(c) => !!c.model.parentTagId}>
    {children}
  </DisplayIfField>
)
