import { BaseAdapter } from '@codelab/backend/abstract/core'
import { Injectable } from '@nestjs/common'
import { ReactNodeType } from '../../domain/types/react-node-type.model'

@Injectable()
export class ReactNodeAdapter extends BaseAdapter<any, ReactNodeType> {
  mapItem({ uid: id, name }: any) {
    return new ReactNodeType({ id, name })
  }
}
