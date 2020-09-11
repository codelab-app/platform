import { ReactNodeI } from '@codelab/shared/interface/node'
import { Divider } from './Divider.types'
import { Text } from '../text'

export const dividerData: ReactNodeI<Divider.Props | Text.Props> = {
  type: 'Provider',
  nodeType: 'React',
  children: [
    {
      type: 'Text',
      nodeType: 'React',
      props: {
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo',
      },
    },
    {
      type: 'Divider',
      nodeType: 'React',
      props: {
        orientation: 'center',
        type: 'horizontal',
      },
    },
    {
      type: 'Text',
      nodeType: 'React',
      props: {
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo',
      },
    },
  ],
}
