'use client'

import type { ITypeUpdateRoute } from '@codelab/frontend/abstract/application'

import { TypeConnector } from '@codelab/frontend/infra/connector'

import { UpdateTypePopover } from './UpdateTypePopover'

export const UpdateTypePopoverContainer = ({
  context,
}: {
  context: ITypeUpdateRoute
}) => {
  const {
    params: { typeId },
  } = context

  return (
    <TypeConnector id={typeId}>
      {(type) => <UpdateTypePopover context={context} type={type} />}
    </TypeConnector>
  )
}

UpdateTypePopoverContainer.displayName = 'UpdateTypePopoverContainer'
