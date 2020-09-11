import { ReactNodeI } from '@codelab/shared/interface/node'
import { Statistic } from './Statistic.types'

export const statisticData: ReactNodeI<
  Statistic.Props | Statistic.CountdownProps
> = {
  type: 'Statistic',
  nodeType: 'React',
  props: {
    title: 'Active Users',
    value: 545465,
  },
}
