import { CreateTagInput } from '@codelab/frontend/abstract/codegen'
import { DisplayIfField } from '@codelab/frontend/view/components'

export const DisplayIfNotRoot = ({
  children,
}: React.PropsWithChildren<any>) => (
  <DisplayIfField<CreateTagInput> condition={(c) => !!c.model.parentTagId}>
    {children}
  </DisplayIfField>
)
