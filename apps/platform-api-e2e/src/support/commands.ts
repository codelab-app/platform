// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import {
  auth0Commands,
  registerCommands,
} from '@codelab/testing/cypress/command'

const commands = [...auth0Commands]

registerCommands(commands)
