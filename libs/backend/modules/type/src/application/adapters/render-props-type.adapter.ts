import { BaseAdapter } from '@codelab/backend/abstract/core'
import { Injectable } from '@nestjs/common'
import { RenderPropsType } from '../../domain/types/render-props-type.model'

@Injectable()
export class RenderPropsAdapter extends BaseAdapter<any, RenderPropsType> {
  mapItem({ uid: id, name }: any) {
    return new RenderPropsType({ id, name })
  }
}
