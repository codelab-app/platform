/* eslint-disable react/jsx-props-no-spreading */
import { Space } from 'antd'

import type { ActionColumnProps } from './types'

import { DeleteLambdaButton } from '../../delete-lambda'
import { ExecuteLambdaButton } from '../../execute-lambda'
import { UpdateLambdaButton } from '../../update-lambda'

export const ActionColumn = ({ lambda }: ActionColumnProps) => {
  return (
    <Space size="middle">
      <ExecuteLambdaButton {...lambda} />
      <UpdateLambdaButton />
      <DeleteLambdaButton />
    </Space>
  )
}
