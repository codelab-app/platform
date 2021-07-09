import { GetPropsQueryResult } from '@codelab/modules/prop-api'

export interface FlattenRequestItem extends GetPropsQueryResult {
  uid: string
  'Element.name'?: string
  'Element.css'?: string
  'Element.atom'?: FlattenRequestItem
  'Element.children'?: Array<FlattenRequestItem>
  'Element.props'?: Array<FlattenRequestItem>
  'Element.children|order'?: number | Record<string, number>
  'Atom.label'?: string
  'Atom.type'?: string
  'Atom.propTypes'?: FlattenRequestItem | null
}

export class FlattenElementTreeRequest {
  root: FlattenRequestItem

  constructor(root: FlattenRequestItem) {
    this.root = root
  }
}
