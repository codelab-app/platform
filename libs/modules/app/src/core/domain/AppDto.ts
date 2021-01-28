import { Optional } from 'utility-types'
import { App } from './App'

export type AppDto = Optional<App, 'pages'>
