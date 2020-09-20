import { Rate } from './Rate.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const rateData: NodeReactDtoI<Rate.Props> = {
  type: 'React.Rate',
  props: {
    defaultValue: 2,
  },
}
