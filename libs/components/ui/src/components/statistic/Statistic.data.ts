import { Statistic } from './Statistic.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const statisticData: NodeDtoReactI<
  Statistic.Props | Statistic.CountdownProps
> = {
  type: 'React.Statistic',
  props: {
    title: 'Active Users',
    value: 545465,
  },
}
