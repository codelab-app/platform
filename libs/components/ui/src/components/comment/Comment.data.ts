import { Icon } from '../icon'
import { Text } from '../text'
import { Comment } from './Comment.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const commentData: NodeReactI<
  Comment.Props | Text.Props | Icon.Props
> = {
  type: 'React.Comment',
  props: {
    author: 'Han Solo',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    datetime: '1 July 2020',
    avatar: {
      type: 'React.Avatar',
      props: {
        src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        alt: 'Han Solo',
      },
    },
    actions: [
      {
        type: 'React.Fragment',
        props: {
          ctx: {
            __type: ['eval', 'single'],
            value:
              'const [likes, setLikes] = this.React.useState(0); const [dislikes, setDislikes] = this.React.useState(0); const [action, setAction] = this.React.useState(null); return { likes, setLikes, dislikes, setDislikes, action, setAction }',
          },
        },
        children: [
          {
            type: 'React.Icon',
            props: {
              type: 'like',
              theme: {
                __type: 'eval',
                value: 'return this.action === "like" ? "filled" : "outlined"',
              },
              onClick: {
                __type: 'eval',
                value:
                  'return () => { this.setLikes(1); this.setDislikes(0); this.setAction("like") }',
              },
            },
          },
          {
            type: 'React.Text',
            props: {
              value: { __type: 'eval', value: 'return this.likes' },
            },
          },
          {
            type: 'React.Icon',
            props: {
              type: 'dislike',
              theme: {
                __type: 'eval',
                value:
                  'return this.action === "dislike"? "filled" : "outlined"',
              },
              style: { paddingLeft: '8px' },
              onClick: {
                __type: 'eval',
                value:
                  'return () => { this.setLikes(0); this.setDislikes(1); this.setAction("dislike") }',
              },
            },
          },
          {
            type: 'React.Text',
            props: {
              value: { __type: 'eval', value: 'return this.dislikes' },
            },
          },
          {
            type: 'React.Html.span',
            props: { style: { paddingLeft: '8px' } },
            children: [
              {
                type: 'React.Text',
                props: { value: 'Reply to' },
              },
            ],
          },
        ],
      },
    ],
  },
}
