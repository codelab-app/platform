import '../../../../.storybook/preview'
import { withKnobs } from '@storybook/addon-knobs'
import { addDecorator } from '@storybook/react'
import { QueryClient, QueryClientProvider } from 'react-query'

addDecorator(withKnobs)

const queryClient = new QueryClient()

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
]
