import type { Typebox } from '@codelab/shared/infra/validation'

import { type Static } from '@sinclair/typebox'

export type IRef = Static<typeof Typebox.Ref>

export type IDiscriminatedRef<T extends string> = Static<
  ReturnType<typeof Typebox.DiscriminatedRef<T>>
>
