import type { IAuth0Owner, IStoreDTO } from '@codelab/shared/abstract/core'

// Owner is used for interface creation
export type ICreateStoreData = IAuth0Owner & IStoreDTO

export type IUpdateStoreData = IStoreDTO
