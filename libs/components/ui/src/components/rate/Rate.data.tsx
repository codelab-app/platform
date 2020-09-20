import { Rate } from './Rate.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const rateData: NodeDtoReactI<Rate.Props> = {
  type: 'React.Rate',
  props: {
    defaultValue: 2,
  },
}
