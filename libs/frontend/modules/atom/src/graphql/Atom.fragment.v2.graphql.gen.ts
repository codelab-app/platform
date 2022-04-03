import * as Types from '@codelab/shared/abstract/codegen-v2'

export type AtomFragment = {
  __typename: 'Atom'
  id: string
  name: string
  type: Types.AtomType
  tags: Array<{ id: string; name: string }>
  api: { id: string; name: string }
}
