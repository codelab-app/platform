import * as Types from '@codelab/shared/abstract/codegen'

export type HookPropFragment = { data: string; id: string }

export type HookFragment = {
  id: string
  type: Types.AtomType
  config: HookPropFragment
  element: { id: string; name: string }
}

export const HookPropFragmentDoc = `
    fragment HookProp on Prop {
  data
  id
}
    `
export const HookFragmentDoc = `
    fragment Hook on Hook {
  config {
    ...HookProp
  }
  element {
    id
    name
  }
  id
  type
}
    ${HookPropFragmentDoc}`
