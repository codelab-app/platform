import { Dashboard } from '@codelab/frontend-presentation-view/templates'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Dashboard> = {
  component: Dashboard,
}

export default meta

type Story = StoryObj<typeof Dashboard>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <Dashboard />,
}
