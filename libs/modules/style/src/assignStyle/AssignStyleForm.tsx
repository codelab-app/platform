import { AppContext, notify } from '@codelab/frontend/shared'
import { Button, Select } from 'antd'
import React, { useContext, useState } from 'react'

export const AssignStyleForm = ({ vertexId }: { vertexId: string }) => {
  const { appId } = useContext(AppContext)
  const [selection, setSelection] = useState<string | undefined>(undefined)

  // const [mutate] = useAssignStyleMutation({
  //   refetchQueries: [
  //     {
  //       query: GetVertexGql,
  //       variables: {
  //         input: {
  //           id: vertexId,
  //         },
  //       },
  //     },
  //     {
  //       query: GetStylesGql,
  //       variables: {
  //         input: {
  //           appId,
  //         },
  //       },
  //     },
  //   ],
  // })

  const assign = async () => {
    if (!selection) {
      notify({
        type: 'error',
        title: 'You must select a style first',
      })

      return
    }

    // await mutate({
    //   variables: {
    //     input: {
    //       vertexId,
    //       styleId: selection,
    //     },
    //   },
    // })
  }

  return (
    <>
      <Select
        style={{ width: 120 }}
        onChange={(styleId: string) => setSelection(styleId)}
      >
        {/*TODO: assign styles form*/}
        {/*{styles.map((s) => {*/}
        {/*  return (*/}
        {/*    <Select.Option key={s.id} value={s.id}>*/}
        {/*      {s.name}*/}
        {/*    </Select.Option>*/}
        {/*  )*/}
        {/*})}*/}
      </Select>
      <Button type="primary" onClick={() => assign()}>
        Assign style
      </Button>
    </>
  )
}
