import { Input } from './Input'

export default {
  component: Input,
  title: 'Atoms/Input',
}

export const Default = {
  args: {},
  render: () => <Input placeholder="Email" type="email" />,
}
