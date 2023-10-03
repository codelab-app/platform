import { PlusOutlined } from '@ant-design/icons'
<<<<<<< HEAD
import { useStore } from '@codelab/frontend/application/shared/store'
=======
import type { ITypeService } from '@codelab/frontend/abstract/domain'
>>>>>>> 6a8128374 (wip: separate interface to application & domain layer)
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateTypeButton = observer(() => {
  const { typeService } = useStore()

  return (
    <Button
      className="flex items-center justify-center"
      icon={<PlusOutlined />}
      onClick={() => typeService.createModal.open()}
      type="primary"
    >
      Create
    </Button>
  )
})
