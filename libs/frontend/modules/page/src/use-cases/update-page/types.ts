import { PageUpdateInput } from '@codelab/shared/abstract/codegen-v2'

export type UpdatePageInput = Omit<PageUpdateInput, 'app' | 'rootElement'>
