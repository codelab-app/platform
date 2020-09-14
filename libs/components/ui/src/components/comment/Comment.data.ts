import { ReactNodeI } from '@codelab/shared/interface/node'
import { Comment } from './Comment.types'
import { Text } from '../text'
import { Icon } from '../icon'

export const commentData: ReactNodeI<
  Comment.Props | Text.Props | Icon.Props
> = {
  type: 'Comment',
  nodeType: 'React',
  props: {
    author: 'Han Solo',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    datetime: '1 July 2020',
    avatar: {
      type: 'Avatar',
      nodeType: 'React',
      props: {
        src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        alt: 'Han Solo',
      },
    },
    actions: [
      {
        type: 'Provider',
        nodeType: 'React',
        props: {
          ctx: {
            eval: true,
            value:
              'const [likes, setLikes] = this.React.useState(0); const [dislikes, setDislikes] = this.React.useState(0); const [action, setAction] = this.React.useState(null); return { likes, setLikes, dislikes, setDislikes, action, setAction }',
          },
          likes: {
            eval: true,
            value: 'return this.likes',
          },
          setLikes: {
            eval: true,
            value: 'return (value) => this.setLikes(value)',
          },
          dislikes: {
            eval: true,
            value: 'return this.dislikes',
          },
          setDislikes: {
            eval: true,
            value: 'return (value) => this.setDislikes(value)',
          },
          action: {
            eval: true,
            value: 'return this.action',
          },
          setAction: {
            eval: true,
            value: 'return (value) => this.setAction(value)',
          },
        },
        children: [
          {
            type: 'Icon',
            nodeType: 'React',
            props: {
              type: 'like',
              theme: {
                eval: true,
                value:
                  'return this.props.action === "like" ? "filled" : "outlined"',
              },
              onClick: {
                eval: true,
                value:
                  'return () => { this.props.setLikes(1); this.props.setDislikes(0); this.props.setAction("like") }',
              },
            },
          },
          {
            type: 'Text',
            nodeType: 'React',
            props: {
              value: { eval: true, value: 'return this.props.likes' },
            },
          },
          {
            type: 'Icon',
            nodeType: 'React',
            props: {
              type: 'dislike',
              theme: {
                eval: true,
                value:
                  'return this.props.action === "dislike"? "filled" : "outlined"',
              },
              style: { paddingLeft: '8px' },
              onClick: {
                eval: true,
                value:
                  'return () => { this.props.setLikes(0); this.props.setDislikes(1); this.props.setAction("dislike") }',
              },
            },
          },
          {
            type: 'Text',
            nodeType: 'React',
            props: {
              value: { eval: true, value: 'return this.props.dislikes' },
            },
          },
          {
            type: 'Html.span',
            nodeType: 'React',
            props: { style: { paddingLeft: '8px' } },
            children: [
              { type: 'Text', nodeType: 'React', props: { value: 'Reply to' } },
            ],
          },
        ],
      },
    ],
  },
}
