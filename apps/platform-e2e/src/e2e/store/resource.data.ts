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
    url: 'https://api.publicapis.org',
  },
  id: v4(),
  name: 'Public Rest Resource',
  type: IResourceType.Rest,
}

export const resourceUrlSegment = 'entries'
