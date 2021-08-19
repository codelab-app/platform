import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphElement } from '@codelab/backend/infra'
import { AtomAdapter } from '@codelab/backend/modules/atom'
import { Injectable } from '@nestjs/common'
import { Element } from '../domain/element/element.model'

export type DgraphElementInput = Omit<
  DgraphElement,
  'component' | 'children' | 'children|order'
> & {
  component?: { uid: string }
}

@Injectable()
export class ElementAdapter extends BaseAdapter<DgraphElementInput, Element> {
  constructor(private atomAdapter: AtomAdapter) {
    super()
  }

  mapItem(element: DgraphElementInput) {
    return new Element({
      id: element.uid,
      name: element.name ?? '',
      atom: element.atom ? this.atomAdapter.map(element.atom) : undefined,
      css: element.css,
      props: element.props || '{}',
    })
  }
}
