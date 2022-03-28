import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import { WithTagService } from '../../store'

export const GetTagsTable = observer<WithTagService>(({ tagService }) => {
  const columns = [{}]
  const dataSource = [{}]

  console.log('table', tagService.tags.values())

  return <Table columns={columns} dataSource={dataSource} />
})
