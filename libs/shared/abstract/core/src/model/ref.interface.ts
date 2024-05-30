import type { Typebox } from '@codelab/shared/abstract/typebox'
import { type Static, Type } from '@sinclair/typebox'

export type IRef = Static<typeof Typebox.Ref>

export type IDiscriminatedRef<T extends string> = Static<
  ReturnType<typeof Typebox.DiscriminatedRef<T>>
>
