'use client'

import type { TreeViewSearchParams } from '@codelab/frontend/abstract/types'

import { TypeConnector } from '@codelab/frontend/infra/connector'

import { UpdateTypePopover } from './UpdateTypePopover'

export const UpdateTypePopoverContainer = ({
  id,
  params,
}: {
  id: string
  params: TreeViewSearchParams
}) => {
  return (
    <TypeConnector id={id}>
      {(type) => <UpdateTypePopover params={params} type={type} />}
    </TypeConnector>
  )
}
