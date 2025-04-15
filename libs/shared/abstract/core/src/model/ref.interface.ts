import type { Typebox } from '@codelab/shared-infra-typebox'

import { type Static } from '@sinclair/typebox'

export type IRef = Static<typeof Typebox.RefSchema>

export type IDiscriminatedRef<T extends string> = Static<
  ReturnType<typeof Typebox.DiscriminatedRef<T>>
>
