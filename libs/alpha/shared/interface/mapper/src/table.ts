import { Collection } from '@codelab/alpha/shared/interface/collections'
import { TableProps } from '@codelab/alpha/ui/antd'

export type TableMapper<TRecord> = (
  records: Collection<TRecord>,
) => Pick<TableProps, 'columns' | 'dataSource'>
