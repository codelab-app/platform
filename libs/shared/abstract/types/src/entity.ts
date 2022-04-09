export interface IIdentifiable {
  id: string
}

export interface IEntity extends IIdentifiable {
  updateFromFragment: (fragment: any) => void
}
