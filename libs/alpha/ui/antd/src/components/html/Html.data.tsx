import { AtomType, NodeI } from '@codelab/frontend'

export const divData: NodeI = {
  type: AtomType.ReactHtmlDiv,
  props: {
    visibility: '',
    parentprops: {
      renderProps: true,
    },
  },
  children: [
    {
      type: AtomType.ReactHtmlDiv,
      props: {
        childprops: {},
      },
    },
  ],
}
