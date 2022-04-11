export interface ICreatePropMapBindingDTO {
  elementId: string
  sourceKey: string
  targetKey: string
  targetElementId?: string
}

export interface IUpdatePropMapBindingDTO {
  sourceKey: string
  targetKey: string
  targetElementId: string
}
