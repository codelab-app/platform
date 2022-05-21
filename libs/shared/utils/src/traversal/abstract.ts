import { IPropData } from '@codelab/shared/abstract/core'
import { MaybeArray } from '@codelab/shared/abstract/types'

export type IInput = IPropData
export type IOutput = MaybeArray<IInput>
export type RefSet = WeakSet<IOutput>

export type TransformFn = (
  value: IInput,
  key: string,
  innerObj: IOutput,
) => IOutput

export type TraverseFn = (
  obj: IInput,
  transformFn: TransformFn,
  _refs: RefSet,
) => IOutput
