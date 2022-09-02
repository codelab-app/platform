import { componentTagName } from '@codelab/shared/data'
import { v4 } from 'uuid'

export const builderComponentUsecaseTag = {
  id: v4(),
  name: componentTagName,
  // children are connected in importAtom statement
  children: [],
  parent: undefined,
}
