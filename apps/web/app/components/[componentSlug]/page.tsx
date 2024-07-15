import { PageDetailHeader } from '@codelab/frontend-application-page/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Component Preview | Codelab',
}

const ComponentPreviewView = async () => {
  return <DashboardTemplate Header={<PageDetailHeader />}></DashboardTemplate>
}

export default ComponentPreviewView
