'use client'

import { TypeConnector } from '@codelab/frontend/infra/connector'

import { UpdateTypePopover } from './UpdateTypePopover'

export const UpdateTypePopoverContainer = ({ id }: { id: string }) => {
  return (
    <TypeConnector id={id}>
      {(type) => <UpdateTypePopover type={type} />}
    </TypeConnector>
  )
}
