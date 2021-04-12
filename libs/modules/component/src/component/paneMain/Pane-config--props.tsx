import React from 'react'
import { PageElementPropsForm } from '@codelab/modules/prop'

export const PaneConfigProps = ({
  pageElementId,
}: {
  pageElementId: string
}) => {
  return (
    <section style={{ height: '100%' }}>
      <PageElementPropsForm pageElementId={pageElementId} />
    </section>
  )
}
