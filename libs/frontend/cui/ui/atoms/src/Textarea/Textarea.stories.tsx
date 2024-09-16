import { Textarea } from './Textarea'

export default {
  component: Textarea,
  title: 'Atoms/Textarea',
}

export const Default = {
  args: {},
  render: () => <Textarea placeholder="Type your message here." />,
}
