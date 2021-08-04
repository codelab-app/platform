import { DgraphElement, Mapper } from '@codelab/backend'
import { AtomMapper } from '@codelab/modules/atom-api'
import { Injectable } from '@nestjs/common'
import { Element } from './models'

export type DgraphElementInput = Omit<
  DgraphElement,
  'component' | 'children' | 'children|order'
> & {
  component?: { uid: string }
}

@Injectable()
export class ElementMapper implements Mapper<DgraphElementInput, Element> {
  constructor(private atomMapper: AtomMapper) {}

  async map(element: DgraphElementInput) {
    return new Element({
      id: element.uid,
      name: element.name,
      atom: element.atom ? await this.atomMapper.map(element.atom) : undefined,
      css: element.css,
      props: element.props || '{}',
    })
  }
}
