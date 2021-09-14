import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphPropMapBinding } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { PropMapBinding } from './prop-map-binding.model'

@Injectable()
export class PropMapBindingAdapter extends BaseAdapter<
  DgraphPropMapBinding,
  PropMapBinding
> {
  mapItem(input: DgraphPropMapBinding) {
    return new PropMapBinding({
      id: input.uid,
      targetKey: input.targetKey,
      targetElementId: input.targetElement?.uid,
      sourceKey: input.sourceKey,
    })
  }
}
