import { Empty } from './Empty.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const emptyData: NodeReactDtoI<Empty.Props> = {
  type: 'React.Empty',
  props: {
    description: 'No Data',
  },
}
