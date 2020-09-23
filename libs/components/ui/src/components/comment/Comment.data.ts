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
        type: 'React.Provider',
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
            type: 'React.Icon',
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
            type: 'React.Text',
            props: {
              value: { eval: true, value: 'return this.props.likes' },
            },
          },
          {
            type: 'React.Icon',
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
            type: 'React.Text',
            props: {
              value: { eval: true, value: 'return this.props.dislikes' },
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
