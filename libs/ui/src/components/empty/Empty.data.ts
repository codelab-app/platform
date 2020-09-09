import { ReactNodeI } from '@codelab/node'
import { PropsFromKeys } from '@codelab/shared/interface'

export const emptyPropKeys = ['description', 'imageStyle', 'image']

type EmptyProps = PropsFromKeys<typeof emptyPropKeys[number]>

export const emptyData: ReactNodeI<EmptyProps> = {
  type: 'Empty',
  nodeType: 'React',
  props: {
    description: 'No Data',
  },
}
