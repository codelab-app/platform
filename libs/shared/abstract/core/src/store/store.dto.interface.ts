export interface ICreateStoreDTO {
  name: string
  parentStore: { id: string; key: string }
  initialState: string
}

export type IUpdateStoreDTO = ICreateStoreDTO
