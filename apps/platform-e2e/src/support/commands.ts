import { antCommands } from '@codelab/testing/cypress/antd'
import {
  auth0Commands,
  registerCommands,
} from '@codelab/testing/cypress/command'
import { nextjsAuth0Commands } from '@codelab/testing/cypress/nextjs-auth0'
import { builderCommands } from './builder'
import { databaseCommands } from './database'
import { UICommands } from './entities'
import { helpersCommands } from './helpers'

const commands = [
  ...helpersCommands,
  ...antCommands,
  ...databaseCommands,
  ...UICommands,
  ...auth0Commands,
  ...nextjsAuth0Commands,
  ...builderCommands,
  ...textEditorCommands,
]

registerCommands(commands)
