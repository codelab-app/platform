'use client'

import { UpdateFieldForm } from '@codelab/frontend-application-type/use-cases/update-field'
import { Typography } from 'antd'

export const FieldForm = () => {
  return (
    <div className="flex size-full flex-col overflow-auto">
      <Typography className="text-2xl">Edit Field</Typography>
      <UpdateFieldForm />
    </div>
  )
}
