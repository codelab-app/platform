import { Drawer } from 'antd'
import React from 'react'
import { AddGridForm } from './AddGridForm'
import { useLayoutMachine } from '@codelab/modules/layout-stories'

export const AddGridDrawer = () => {
  const layout = useLayoutMachine()

  return (
    <Drawer
      title="Add Grid"
      placement="right"
      closable={false}
      width={480}
      onClose={() => layout.send('TOGGLE_DRAWER')}
      visible={layout.state.value.drawer === 'active'}
    >
      <AddGridForm />
    </Drawer>
  )
}
