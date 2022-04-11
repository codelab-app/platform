export interface ICreateFieldDTO {
  key: string
  name: string | null
  description?: string | null
  existingTypeId: string
}

export type IUpdateFieldDTO = ICreateFieldDTO
