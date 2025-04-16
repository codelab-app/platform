import type { IRef } from '@codelab/shared-abstract-core'

export interface ICreateDomainData {
  app: IRef
  id: string
  name: string
}

export type IUpdateDomainData = ICreateDomainData
