import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphElement } from '@codelab/backend/infra'
import { AtomAdapter } from '@codelab/backend/modules/atom'
import { HookAdapter } from '@codelab/backend/modules/hook'
import { Injectable } from '@nestjs/common'
import { Element } from '../domain/element/element.model'
import { PropMapBindingAdapter } from '../domain/prop-mapping/prop-map-binding.adapter'

export type DgraphElementInput = Omit<
  DgraphElement,
  'component' | 'children' | 'children|order'
> & {
  component?: { uid: string }
}

@Injectable()
export class ElementAdapter extends BaseAdapter<DgraphElementInput, Element> {
  constructor(
    private atomAdapter: AtomAdapter,
    private hookAdapter: HookAdapter,
    private propMapBindingAdapter: PropMapBindingAdapter,
  ) {
    super()
  }

  mapItem(element: DgraphElementInput) {
    return new Element({
      id: element.uid,
      name: element.name ?? '',
      atom: element.atom,
      css: element.css,
      props: element.props || '{}',
      hooks: this.hookAdapter.map(element.hooks ?? []),
      renderForEachPropKey: element.renderForEachPropKey,
      renderIfPropKey: element.renderIfPropKey,
      propMapBindings: this.propMapBindingAdapter.map(
        element.propMapBindings ?? [],
      ),
    })
  }
}
