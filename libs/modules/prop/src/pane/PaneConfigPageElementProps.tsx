import { PageElementPropsForm } from '@codelab/modules/prop'
import React from 'react'

export const PaneConfigPageElementProps = ({
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
