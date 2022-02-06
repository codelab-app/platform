import { ElementCreateInput } from '@codelab/shared/abstract/codegen-v2'

export type CreateElementInput = Omit<
  ElementCreateInput,
  'instanceOfComponent' | 'atom' | 'parentElement'
> & {
  order: number
  instanceOfComponentId: string
  atomId: string
  parentElementId: string
}
