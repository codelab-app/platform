import { ATOM_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { AtomRecord } from './columns'
import { useAtomTable } from './useAtomTable'

export const GetAtomsTable = observer<WithServices<ATOM_SERVICE>>(
  ({ atomService }) => {
    const { columns, rowSelection, pagination } = useAtomTable(atomService)

    const [getAtoms, { isLoading }] = useStatefulExecutor(() =>
      atomService.getAll(),
    )

    const atomsList = atomService.atoms

    const atomsData: Array<AtomRecord> = atomsList.map((a) => ({
      id: a.id,
      type: a.type,
      apiId: a.api.id,
      name: a.name,
      tags: a.tags.map((tag) => tag.current),
    }))

    useEffect(() => {
      getAtoms()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <Table
        columns={columns}
        dataSource={atomsData}
        loading={isLoading}
        pagination={pagination}
        rowKey={(atom) => atom.id}
        rowSelection={rowSelection}
      />
    )
  },
)
