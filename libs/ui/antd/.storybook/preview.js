import { withKnobs } from '@storybook/addon-knobs'
import { addDecorator } from '@storybook/react'
import '../../../../.storybook/preview'
import { withApollo } from "./decorators/withApollo"

addDecorator(withKnobs)
addDecorator(withApollo)
