import { Select } from 'antd'
import { Option } from 'antd/lib/mentions'

type Opt = {
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
      style={{ width: 100 }}
    >
      {options.map((option) => (
        <Option value={option.value}>{option.title}</Option>
      ))}
    </Select>
  )
}
