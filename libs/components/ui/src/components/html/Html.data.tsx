import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const divData: NodeDtoReactI = {
  type: 'React.Html.div',
  props: {
    visibility: '',
    parentprops: {
      renderProps: true,
    },
  },
  children: [
    {
      type: 'React.Html.div',
      props: {
        childprops: {},
      },
    },
  ],
}
