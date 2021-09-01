import { ITypeGraph } from '@codelab/shared/core'

export type ImportApiInput = {
  // We specify the root interface for easier access
  api: string
  typeGraph: ITypeGraph
}
