import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React, { FunctionComponent } from 'react'
import { useStylesPane } from '../useStylesPane'

type Props = ButtonProps

const CreateStyleButton: FunctionComponent<Props> = (props) => {
  const { openCreateStyle } = useStylesPane()

  return (
    <Button
      key="1"
      icon={<PlusOutlined />}
      onClick={() => openCreateStyle()}
      {...props}
    />
  )
}

export default CreateStyleButton
