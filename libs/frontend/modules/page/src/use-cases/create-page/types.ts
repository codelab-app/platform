import { PageCreateInput } from '@codelab/shared/abstract/codegen-v2'

export type CreatePageInput = Omit<PageCreateInput, 'app' | 'rootElement'> & {
  appId: string
  name: string
}
