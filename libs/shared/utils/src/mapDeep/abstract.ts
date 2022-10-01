import { IPropData } from '@codelab/frontend/abstract/core'
import { MaybeArray } from '@codelab/shared/abstract/types'

export type IInput = IPropData
export type IOutput = MaybeArray<IInput>
export type Key = string | number
export type IValueMapper = (value: IInput, key: Key) => IOutput
export type IKeyMapper = (value: IInput, key: Key) => Key
