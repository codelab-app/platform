import { Empty } from './Empty.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const emptyData: NodeDtoReactI<Empty.Props> = {
  type: 'React.Empty',
  props: {
    description: 'No Data',
  },
}
