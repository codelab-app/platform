import { ReactNodeI } from '@codelab/node'
import { TextProps } from '../text/Text.types'
import { DivProps } from '../html/Html.types'
import { AnchorProps, LinkProps } from './Anchor.types'

export const anchorData: ReactNodeI<
  AnchorProps | LinkProps | TextProps | DivProps
> = {
  type: 'Html.div',
  nodeType: 'React',
  children: [
    {
      type: 'Anchor',
      nodeType: 'React',
      props: {},
      children: [
        {
          type: 'Anchor.Link',
          nodeType: 'React',
          props: {
            href: '#1',
            title: '1',
          },
        },
        {
          type: 'Anchor.Link',
          nodeType: 'React',
          props: {
            href: '#2',
            title: '2',
          },
        },
        {
          type: 'Anchor.Link',
          nodeType: 'React',
          props: {
            href: '#3',
            title: '3',
          },
        },
      ],
    },

    {
      type: 'Html.div',
      nodeType: 'React',
      props: { id: '1' },
      children: [
        {
          type: 'Html.div',
          nodeType: 'React',
          props: { style: { fontSize: 30, fontWeight: 'bold' } },
          children: [
            { type: 'Text', nodeType: 'React', props: { value: '1' } },
          ],
        },
        {
          type: 'Html.p',
          nodeType: 'React',
          children: [
            {
              type: 'Text',
              nodeType: 'React',
              props: {
                value:
                  ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a orci acdiam pharetra viverra sit amet eget arcu. Ut sit amet efficitur elit. Suspendisse pulvinar pulvinar lectus ac malesuada. Curabitur ac dictumelit. Nam lectus ex, suscipit nec aliquet vel, molestie sed justo. Nullam commodo dui viverra sem hendrerit, eget iaculis nisi commodo. Aliquam at mauris porta libero mattis convallis et posuere leo. Vivamus vehicula libero lacus, ac molestie mi varius eu. Nam vel libero odio. Nulla sollicitudin dignissim pellentesque. Praesent eleifend tortor ac dapibus efficitur. Nunc eleifend augue vel laoreet rutrum. Mauris eros lorem, tempus et dapibus sed, auctor sit amet turpis. Aenean in ex quis nisl dignissim consectetur. Vestibulum tristique, risus sed luctus egestas, nibh purus fringilla orci, at molestie sem dui a urna. Mauris eu risus gravida, pellentesque est vitae, finibus urna. Nulla non posuere leo. Curabitur nec feugiat nunc. In elementum sem tellus, eget tempus sapien imperdiet ac. ',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'Html.div',
      nodeType: 'React',
      props: { id: '2' },
      children: [
        {
          type: 'Html.div',
          nodeType: 'React',
          props: { style: { fontSize: 30, fontWeight: 'bold' } },
          children: [
            { type: 'Text', nodeType: 'React', props: { value: '2' } },
          ],
        },
        {
          type: 'Html.p',
          nodeType: 'React',
          children: [
            {
              type: 'Text',
              nodeType: 'React',
              props: {
                value:
                  ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a orci acdiam pharetra viverra sit amet eget arcu. Ut sit amet efficitur elit. Suspendisse pulvinar pulvinar lectus ac malesuada. Curabitur ac dictumelit. Nam lectus ex, suscipit nec aliquet vel, molestie sed justo. Nullam commodo dui viverra sem hendrerit, eget iaculis nisi commodo. Aliquam at mauris porta libero mattis convallis et posuere leo. Vivamus vehicula libero lacus, ac molestie mi varius eu. Nam vel libero odio. Nulla sollicitudin dignissim pellentesque. Praesent eleifend tortor ac dapibus efficitur. Nunc eleifend augue vel laoreet rutrum. Mauris eros lorem, tempus et dapibus sed, auctor sit amet turpis. Aenean in ex quis nisl dignissim consectetur. Vestibulum tristique, risus sed luctus egestas, nibh purus fringilla orci, at molestie sem dui a urna. Mauris eu risus gravida, pellentesque est vitae, finibus urna. Nulla non posuere leo. Curabitur nec feugiat nunc. In elementum sem tellus, eget tempus sapien imperdiet ac. ',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'Html.div',
      nodeType: 'React',
      props: { id: '3' },
      children: [
        {
          type: 'Html.div',
          nodeType: 'React',
          props: { style: { fontSize: 30, fontWeight: 'bold' } },
          children: [
            { type: 'Text', nodeType: 'React', props: { value: '3' } },
          ],
        },
        {
          type: 'Html.p',
          nodeType: 'React',
          children: [
            {
              type: 'Text',
              nodeType: 'React',
              props: {
                value:
                  ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a orci acdiam pharetra viverra sit amet eget arcu. Ut sit amet efficitur elit. Suspendisse pulvinar pulvinar lectus ac malesuada. Curabitur ac dictumelit. Nam lectus ex, suscipit nec aliquet vel, molestie sed justo. Nullam commodo dui viverra sem hendrerit, eget iaculis nisi commodo. Aliquam at mauris porta libero mattis convallis et posuere leo. Vivamus vehicula libero lacus, ac molestie mi varius eu. Nam vel libero odio. Nulla sollicitudin dignissim pellentesque. Praesent eleifend tortor ac dapibus efficitur. Nunc eleifend augue vel laoreet rutrum. Mauris eros lorem, tempus et dapibus sed, auctor sit amet turpis. Aenean in ex quis nisl dignissim consectetur. Vestibulum tristique, risus sed luctus egestas, nibh purus fringilla orci, at molestie sem dui a urna. Mauris eu risus gravida, pellentesque est vitae, finibus urna. Nulla non posuere leo. Curabitur nec feugiat nunc. In elementum sem tellus, eget tempus sapien imperdiet ac. ',
              },
            },
          ],
        },
      ],
    },
  ],
}
