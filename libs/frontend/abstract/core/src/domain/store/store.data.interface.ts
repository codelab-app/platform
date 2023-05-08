import type { IOwner, IStoreDTO } from '@codelab/shared/abstract/core'

// Owner is used for interface creation
export type ICreateStoreData = IOwner & IStoreDTO

export type IUpdateStoreData = IStoreDTO
