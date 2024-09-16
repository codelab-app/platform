import { Label } from '../Label'
import { Switch } from './Switch'

export default {
  component: Switch,
  title: 'Atoms/Switch',
}

export const Default = {
  args: {},
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}
