import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from 'antd'
import React from 'react'
import { useDashboardLayout } from './state/useDashboardLayout'

export type MetaPaneToggleButtonProps = ButtonProps

export const MetaPaneToggleButton = (props: MetaPaneToggleButtonProps) => {
  const { metaPaneIsOpen, toggleMetaPane } = useDashboardLayout()

  return (
    <Button
      size="small"
      onClick={() => toggleMetaPane()}
      icon={metaPaneIsOpen ? <CaretDownOutlined /> : <CaretUpOutlined />}
      {...props}
    />
  )
}

MetaPaneToggleButton.displayName = 'MetaPaneToggleButton'
