import { __TypeGraphFragment } from '@codelab/shared/codegen/graphql'

export type ImportApiInput = {
  // We specify the root interface for easier access
  api: string
  typeGraph: __TypeGraphFragment
}
