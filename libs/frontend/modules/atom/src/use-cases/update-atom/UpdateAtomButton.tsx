import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { atomRef, AtomService, WithAtomService } from '../../store'

export type UpdateAtomButtonProps = UpdateButtonProps & WithAtomService

export const UpdateAtomButton = observer<UpdateAtomButtonProps>(
  ({ id, disabled, atomService }) => {
    const onClick = () => {
      console.log('update')
      console.log(id)
      atomService.setSelectedAtom(id)
      atomService.updateModal.open()
    }

    return (
      <Button
        disabled={disabled}
        ghost
        icon={<EditOutlined />}
        onClick={onClick}
        size="small"
        type="primary"
      />
    )
  },
)
