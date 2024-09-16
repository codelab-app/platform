import { Checkbox } from './Checkbox'

export default {
  component: Checkbox,
  title: 'Atoms/Checkbox',
}

export const Default = {
  args: {},
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor="terms"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}
