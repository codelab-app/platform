'use client';
import { use } from "react";

import { UpdateActionPopover } from '@codelab/frontend-application-store/use-cases/update-action'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = (props: { params: Promise<{ actionId: string }> }) => {
  const params = use(props.params);

  const {
    actionId
  } = params;

  return (
    <DashboardPopover>
      <UpdateActionPopover id={actionId} />
    </DashboardPopover>
  )
}

export default Page
