import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphElement } from '@codelab/backend/infra'
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
  mapItem(element: DgraphElementInput) {
    return new Element({
      id: element.uid,
      name: element.name ?? '',
      atom: element.atom,
      css: element.css,
      props: element.props || '{}',
    })
  }
}
