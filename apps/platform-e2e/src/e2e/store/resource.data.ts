import {
  type ICreateResourceData,
  IResourceType,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

/**
 *  https://api.publicapis.org/entries?title=cat
 */
export const createResourceData: ICreateResourceData = {
  config: {
    url: 'http://some-api.com/api',
  },
  id: v4(),
  name: 'Rest Resource',
  type: IResourceType.Rest,
}

export const urlSegment = '/data/some-id'
