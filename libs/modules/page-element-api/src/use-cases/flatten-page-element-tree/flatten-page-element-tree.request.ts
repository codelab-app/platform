import { GetPropsQueryResult } from '@codelab/modules/prop-api'

export interface FlattenRequestItem extends GetPropsQueryResult {
  uid: string
  'PageElement.name'?: string
  'PageElement.css'?: string
  'PageElement.atom'?: FlattenRequestItem
  'PageElement.children'?: Array<FlattenRequestItem>
  'PageElement.props'?: Array<FlattenRequestItem>
  'PageElement.children|order'?: number | Record<string, number>
  'Atom.label'?: string
  'Atom.type'?: string
  'Atom.propTypes'?: FlattenRequestItem | null
}

export class FlattenPageElementTreeRequest {
  root: FlattenRequestItem

  constructor(root: FlattenRequestItem) {
    this.root = root
  }
}
