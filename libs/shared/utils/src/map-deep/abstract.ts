import type { IPropData } from '@codelab/shared-abstract-core'

export type ObjectKey = number | string

export type IOutput = IPropData

export type IValueMapper = (value: IPropData, key: ObjectKey) => unknown

export type IKeyMapper = (value: IPropData, key: ObjectKey) => ObjectKey
