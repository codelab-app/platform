import { Rate } from './Rate.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const rateData: NodeReactI<Rate.Props> = {
  type: 'React.Rate',
  props: {
    defaultValue: 2,
  },
}
