import type { IApp } from '@codelab/shared/abstract/core'

export type ICreateAppData = Pick<IApp, 'id' | 'name'>

export type IUpdateAppData = Pick<IApp, 'id' | 'name'>
