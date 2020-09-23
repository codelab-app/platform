import { Statistic } from './Statistic.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const statisticData: NodeReactI<
  Statistic.Props | Statistic.CountdownProps
> = {
  type: 'React.Statistic',
  props: {
    title: 'Active Users',
    value: 545465,
  },
}
