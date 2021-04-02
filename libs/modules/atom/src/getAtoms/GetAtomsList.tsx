import { List, Space } from 'antd'
import React from 'react'
import { useGetAtomsListQuery } from '@codelab/hasura'
import {useAtom} from '../useAtom'
import { RightOutlined, SettingOutlined } from '@ant-design/icons'

export const GetAtomsList = () => {
  const { data } = useGetAtomsListQuery({})
  const { detailAtomId, toggleAtomDetailPane } = useAtom()

  return (
    <>
      <List
        size="small"
        dataSource={data?.atom}
        renderItem={(atom: any) => (
          <List.Item onMouseOver={() => null} style={{ paddingLeft: 0 }}>
            <Space style={{ width: '100%' }}>{atom.type}</Space>
            {detailAtomId === atom.id ? (
              // Clicking on icon for currently opened page
              <RightOutlined onClick={() => toggleAtomDetailPane(atom.id)} />
            ) : (
              <SettingOutlined onClick={() => toggleAtomDetailPane(atom.id)} />
            )}
          </List.Item>
        )}
      />
    </>
  )
}
