import { withKnobs } from '@storybook/addon-knobs'
import { addDecorator } from '@storybook/react'
import '../../../../../.storybook/preview'
import { useApollo } from './decorators/useApollo'

addDecorator(withKnobs)
addDecorator(useApollo)
