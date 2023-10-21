import type { IPropData } from '@codelab/shared/abstract/core'
import type { Key } from 'react'

export type IOutput = IPropData

export type IValueMapper = (value: IPropData, key: Key) => unknown

export type IKeyMapper = (value: IPropData, key: Key) => Key
