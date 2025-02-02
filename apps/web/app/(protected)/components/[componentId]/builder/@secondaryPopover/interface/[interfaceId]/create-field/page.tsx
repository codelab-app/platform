'use client';
import { use } from "react";

import { CreateFieldPopover } from '@codelab/frontend-application-type/use-cases/create-field'
import { DashboardPopover } from '@codelab/frontend-presentation-view/templates'

const Page = (
  props: {
    params: Promise<{ interfaceId: string }>
  }
) => {
  const params = use(props.params);

  const {
    interfaceId
  } = params;

  return (
    <DashboardPopover>
      <CreateFieldPopover interfaceId={interfaceId} />
    </DashboardPopover>
  )
}

export default Page
