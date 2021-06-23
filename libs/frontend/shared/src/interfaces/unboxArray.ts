import { Maybe } from '@codelab/codegen/dgraph'

export type UnboxItem<P> = P extends Maybe<Array<Maybe<infer T>>> | undefined
  ? T
  : unknown
