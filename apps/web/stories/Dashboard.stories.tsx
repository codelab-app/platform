import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const meta: Meta<typeof DashboardTemplate> = {
  component: DashboardTemplate,
}

export default meta

type Story = StoryObj<typeof DashboardTemplate>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <DashboardTemplate />,
}
