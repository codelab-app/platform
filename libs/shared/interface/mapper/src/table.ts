import { Collection } from '@codelab/shared/interface/collections'
import { TableProps } from '@codelab/ui/antd'

export type TableMapper<TRecord> = (
  records: Collection<TRecord>,
) => Pick<TableProps, 'columns' | 'dataSource'>
