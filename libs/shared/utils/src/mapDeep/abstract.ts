import { IPropData } from '@codelab/frontend/abstract/core'
import { Key } from 'react'
import { ArrayOrSingle } from 'ts-essentials'

export type IOutput = ArrayOrSingle<IPropData>
export type IValueMapper = (value: IPropData, key: Key) => unknown
export type IKeyMapper = (value: IPropData, key: Key) => Key
