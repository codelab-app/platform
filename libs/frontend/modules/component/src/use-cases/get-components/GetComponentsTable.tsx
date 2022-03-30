import { useLoadingState } from '@codelab/frontend/shared/utils'
import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { Table, TableColumnProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import tw from 'twin.macro'
import { ComponentService } from '../../store/ComponentService'
import { ActionColumn } from './columns/ActionColumn'
import { NameColumn } from './columns/NameColumn'
import { ComponentColumnData } from './columns/types'

export interface GetComponentsTableProps {
  componentStore: ComponentService
}

export const GetComponentsTable = observer<GetComponentsTableProps>(
  ({ componentStore }) => {
    const [getComponents, { isLoading }] = useLoadingState(() =>
      componentStore.getAll(),
    )

    const components = componentStore.componentsList
    useEffect(() => {
      getComponents()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const headerCellProps = () => ({
      style: tw`font-semibold text-gray-900`,
    })

    const getComponentsTableColumns: Array<
      TableColumnProps<ComponentColumnData>
    > = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        onHeaderCell: headerCellProps,
        render: (_, component) => <NameColumn component={component} />,
      },
      {
        title: 'Action',
        key: 'action',
        onHeaderCell: headerCellProps,
        width: 100,
        render: (_, component) => (
          <ActionColumn component={component} componentStore={componentStore} />
        ),
      },
    ]

    const dataSource: Array<ComponentColumnData> = components.map((c) => ({
      name: c.name,
      id: c.id,
    }))

    return (
      <SpinnerWrapper isLoading={isLoading}>
        <Table
          columns={getComponentsTableColumns}
          dataSource={dataSource}
          pagination={{ position: ['bottomCenter'] }}
          rowKey={(component) => component.id}
        />
      </SpinnerWrapper>
    )
  },
)
