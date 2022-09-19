import { COMPONENT_TAG_NAME } from '@codelab/shared/data'
import { v4 } from 'uuid'

export const builderComponentUsecaseTag = {
  id: v4(),
  name: COMPONENT_TAG_NAME,
  // children are connected in importAtom statement
  children: [],
  parent: undefined,
}
