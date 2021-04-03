import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { atomState } from '../useAtom'
import { useDeleteAtomMutation, GetAtomsListGql } from '@codelab/hasura'

export type DeleteAtomButtonProps = {
  onSuccess: () => void
}

export const DeleteAtomButton = ({ onSuccess }: DeleteAtomButtonProps) => {
  const detailAtomId = useRecoilValue(atomState)

  const [deleteAtom] = useDeleteAtomMutation({
    refetchQueries: [
      {
        query: GetAtomsListGql,
      },
    ],
  })

  return (
    <Button
      danger
      type="primary"
      icon={<DeleteOutlined />}
      onClick={() =>
        deleteAtom({
          variables: { atomId: detailAtomId },
        }).then(() => onSuccess())
      }
    >
      Delete
    </Button>
  )
}
