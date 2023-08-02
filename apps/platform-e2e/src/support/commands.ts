import { antCommands } from '@codelab/testing/cypress/antd'
import { codelabUICommands } from '@codelab/testing/cypress/codelab'
import {
  databaseCommands,
  graphQLCommands,
  registerCommands,
  userCommands,
} from '@codelab/testing/cypress/command'
import { nextjsAuth0Commands } from '@codelab/testing/cypress/nextjs-auth0'
import { builderCommands } from './builder'
import { UICommands } from './entities'

registerCommands([
  ...graphQLCommands,
  ...userCommands,
  ...antCommands,
  ...codelabUICommands,
  ...databaseCommands,
  ...UICommands,
  ...nextjsAuth0Commands,
  ...builderCommands,
  ...textEditorCommands,
])
