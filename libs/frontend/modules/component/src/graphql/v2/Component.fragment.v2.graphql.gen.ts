import * as Types from '@codelab/shared/abstract/codegen-v2'

export type ComponentFragment = {
  id: string
  name: string
  rootElement: { id: string; name?: string | null | undefined }
  owner: { id: string; auth0Id: string }
}
