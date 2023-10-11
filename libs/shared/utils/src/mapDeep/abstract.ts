import type { IPropData } from '@codelab/shared/abstract/core'
import type { ArrayOrSingle } from 'ts-essentials'

export type ObjectKey = number | string | symbol
export type IOutput = ArrayOrSingle<IPropData>
export type IValueMapper = (value: IPropData, key: ObjectKey) => unknown
export type IKeyMapper = (value: IPropData, key: ObjectKey) => ObjectKey
