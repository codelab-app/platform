import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
/* import { Prop, useGetPropsQuery } from '@codelab/graphql' */
import { Button, Space, Spin, Table, TableColumnProps, Tag } from 'antd'
import React from 'react'
import tw from 'twin.macro'

export const GetPropsList = () => {
  const { openDeleteModal, openUpdateModal } = useCRUDModalForm(EntityType.Prop)

  const headerCellProps = () => ({
    style: tw`font-semibold text-gray-900`,
  })

  const columns: Array<TableColumnProps<any>> = [
    {
      title: 'Property',
      dataIndex: 'property',
      key: 'property',
      onHeaderCell: headerCellProps,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      onHeaderCell: headerCellProps,
    },
    {
      title: 'Component',
      dataIndex: 'component',
      key: 'component',
      onHeaderCell: headerCellProps,
      filters: [
        {
          text: 'Button',
          value: 'Button',
        },
        {
          text: 'Div',
          value: 'Div',
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      render: (component = 'Button') => {
        const color = component === 'Button' ? 'geekblue' : 'orange'

        return (
          <Tag color={color} key={component}>
            {component}
          </Tag>
        )
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      onHeaderCell: headerCellProps,
    },
    {
      title: 'Default',
      dataIndex: 'default',
      key: 'default',
      width: 100,
      onHeaderCell: headerCellProps,
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <Button
            size="small"
            type="primary"
            css={tw`flex justify-center items-center`}
            icon={<EditFilled />}
            onClick={() => openUpdateModal(record.id, record)}
          />
          <Button
            size="small"
            type="primary"
            danger
            css={tw`flex justify-center items-center`}
            icon={<DeleteFilled />}
            onClick={() => openDeleteModal([record.id], record)}
          />
        </Space>
      ),
    },
  ]

  /* const { data, loading } = useGetPropsQuery()

     * if (loading) {
     *   return <Spin />
     * }

     * const props = data?.props ?? [] */

  const props = [
    {
      property: 'block',
      description: 'Option to fit button width to its parent width',
      component: 'Button',
      type: 'boolean',
      default: 'false',
    },
    {
      property: 'danger',
      description: 'Set the danger status of button',
      component: 'Button',
      type: 'boolean',
      default: 'false',
    },
    {
      property: 'disabled',
      description: 'Disabled state of button',
      component: 'Button',
      type: 'boolean',
      default: 'false',
    },
  ]

  return (
    <Table
      pagination={{ position: ['bottomCenter'] }}
      dataSource={props}
      columns={columns}
    />
  )
}
