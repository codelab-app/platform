'use client';
import { use } from "react";

import { CreateActionPopover } from '@codelab/frontend-application-store/use-cases/create-action'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = (props: { params: Promise<{ storeId: string }> }) => {
  const params = use(props.params);

  const {
    storeId
  } = params;

  return (
    <DashboardPopover>
      <CreateActionPopover id={storeId} />
    </DashboardPopover>
  )
}

export default Page
