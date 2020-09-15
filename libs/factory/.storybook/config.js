import { withKnobs } from '@storybook/addon-knobs'
import { addDecorator, configure } from '@storybook/react'

addDecorator(withKnobs)
configure(require.context('../src', true, /\.stories\.(j|t)sx?$/), module)
