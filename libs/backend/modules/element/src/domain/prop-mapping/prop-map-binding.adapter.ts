import { BaseAdapter } from '@codelab/backend/abstract/core'
import { Injectable } from '@nestjs/common'
import { PropMapBinding } from './prop-map-binding.model'

@Injectable()
export class PropMapBindingAdapter extends BaseAdapter<any, PropMapBinding> {
  mapItem(input: any) {
    return new PropMapBinding({
      id: input.uid,
      targetKey: input.targetKey,
      targetElementId: input.targetElement?.uid,
      sourceKey: input.sourceKey,
    })
  }
}
