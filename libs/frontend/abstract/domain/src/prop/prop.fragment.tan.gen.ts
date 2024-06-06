import * as Types from '@codelab/shared/abstract/codegen'

export type PropFragment = { data: string; id: string }

export const PropFragmentDoc = `
    fragment Prop on Prop {
  data
  id
}
    `
