import { Select } from 'antd'
import { Option } from 'antd/lib/mentions'

interface Opt {
  title: string
  value: string
}

export const makeAddonAfterNumber = (
  options: Array<Opt>,
  defaultValue: string,
  onChange: (val: string) => void,
) => {
  return (
    <Select
      defaultValue={defaultValue}
      onChange={onChange}
      style={{ width: 80 }}
    >
      {options.map((option) => (
        <Option value={option.value}>{option.title}</Option>
      ))}
    </Select>
  )
}
