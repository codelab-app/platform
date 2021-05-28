export interface FlattenRequestItem {
  uid: string
  'PageElement.name'?: string
  'PageElement.atom'?: FlattenRequestItem
  'PageElement.children'?: Array<FlattenRequestItem>
  'PageElement.children|order'?: number | Record<string, number>
  'Atom.label'?: string
  'Atom.type'?: string
}

export class FlattenPageElementTreeRequest {
  root: FlattenRequestItem

  constructor(root: FlattenRequestItem) {
    this.root = root
  }
}
