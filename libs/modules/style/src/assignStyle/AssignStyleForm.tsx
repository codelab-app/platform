import { Button, Select } from 'antd'
import React, { useContext, useState } from 'react'
import {
  GetStylesGql,
  GetVertexGql,
  useAssignStyleMutation,
} from '@codelab/generated'
import { AppContext, notify } from '@codelab/frontend/shared'

export const AssignStyleForm = ({ vertexId }: { vertexId: string }) => {
  const { styles, appId } = useContext(AppContext)

  const [selection, setSelection] = useState<string | undefined>(undefined)

  const [mutate] = useAssignStyleMutation({
    refetchQueries: [
      {
        query: GetVertexGql,
        variables: {
          input: {
            id: vertexId,
          },
        },
      },
      {
        query: GetStylesGql,
        variables: {
          input: {
            appId,
          },
        },
      },
    ],
  })

  const assign = async () => {
    if (!selection) {
      notify({
        type: 'error',
        title: 'You must select a style first',
      })

      return
    }

    await mutate({
      variables: {
        input: {
          vertexId,
          styleId: selection,
        },
      },
    })
  }

  return (
    <>
      <Select
        style={{ width: 120 }}
        onChange={(styleId: string) => setSelection(styleId)}
      >
        {styles?.map((s) => {
          return (
            <Select.Option key={s.id} value={s.id}>
              {s.name}
            </Select.Option>
          )
        })}
      </Select>
      <Button type="primary" onClick={() => assign()}>
        Assign style
      </Button>
    </>
  )
}
