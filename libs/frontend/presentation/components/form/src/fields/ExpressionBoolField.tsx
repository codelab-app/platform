import type { BoolFieldProps } from 'uniforms-antd'

import Checkbox from 'antd/lib/checkbox'
import Switch from 'antd/lib/switch'
import { connectField, filterDOMProps } from 'uniforms'

import type { WithExpressionFieldProps } from './ToggleExpression'

import { ToggleExpressionWrapper } from './ToggleExpression'

type WrappedBoolProps = WithExpressionFieldProps<boolean, BoolFieldProps>

const WrappedBool = (props: WrappedBoolProps) => {
  const {
    checkbox,
    checkedChildren,
    disabled,
    inputRef,
    name,
    onChange,
    readOnly,
    unCheckedChildren,
    value,
  } = props

  const Component = checkbox ? Checkbox : Switch

  return (
    <ToggleExpressionWrapper<boolean> {...props}>
      <Component
        checked={value || false}
        checkedChildren={checkedChildren}
        disabled={disabled}
        name={name}
        onChange={() => (readOnly ? undefined : onChange(!value))}
        ref={inputRef}
        unCheckedChildren={unCheckedChildren}
        {...filterDOMProps(props)}
      />
    </ToggleExpressionWrapper>
  )
}

export const ExpressionBoolField = connectField(WrappedBool, { kind: 'leaf' })
